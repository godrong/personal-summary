/**
 * http 请求入口
 * TurboC: 重写
 * ================================================================ */
import espromise from 'es6-promise'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import globalConf from '@/utils/globalConf'
import util from '@/utils/webbas/util'
espromise.polyfill()
// 默认配置
const DEFAULT_OPTIONS = {
	baseURL: "",
	timeout: 60000,
	headers: {
		timestamp: new Date().getTime(),

		// #设置Content-Type
		"Content-Type": "application/json;chareset=UTF-8",
	},
 
}
const instance = axios.create(DEFAULT_OPTIONS)
// 代理配置
const proxySwitch = () => {
	return (process.env.NODE_ENV !== 'production')
}
// 响应头是否已加密
function checkEncrypted(response) {
	const headers = response.headers
	return headers['CONTENT-ENCRYPTED'] === '1' || headers['content-encrypted'] === '1'
}
// 特殊字符过滤器
function filterSpecial(param) {
	//let containSpecial = new RegExp("[`<>'']")
	let containSpecial = new RegExp("[`<>]")
	let str = ''
	for (let i = 0; i < param.length; i++) {
		str = str + param.substr(i, 1).replace(containSpecial, '')
	}
	return JSON.parse(str)
}

// http request 拦截器
instance.interceptors.request.use(function(config) {
	let tokenListLength = JSON.parse(sessionStorage.getItem('tokenList')) || []
	//let requestStatus = false
	// 记录cookie时效
	sessionStorage.cookieTime = JSON.stringify(new Date().getTime())
	// 代理
	if (!proxySwitch()) {
		for (let i = 0; i < globalConf.proxyList.length; i++) {
			config.url = config.url.replace(globalConf.proxyList[i], '')
		}
	}
	// 是否在数据加密白名单中
	let whiteOn = false
	let securityObject = sessionStorage.getItem('securityObject')
	if (securityObject) {
		securityObject = JSON.parse(securityObject)
		for (let i=0; securityObject.hasOwnProperty('whiteList') && i<securityObject.whiteList.length; i++) {
			if (config.url.indexOf(securityObject.whiteList[i]) > -1) {
				whiteOn = true
				break
			}
		}
	}
	// data数据加密处理
	if (config.method === 'post' && typeof (config.data) !== 'undefined') {
		config.data = filterSpecial(JSON.stringify(config.data))
		if (!whiteOn && globalConf.switchAES) {
			if (securityObject && securityObject.hasOwnProperty('on') && securityObject.on === 1 && securityObject.hasOwnProperty('aesKeyValue')) {
				config.data = util.Encrypt(config.data, securityObject.aesKeyValue)
			}
		}
	}
	// url数据加密处理
	let paraIndex = config.url.indexOf('?')
	let urlLen = config.url.length
	if (paraIndex > 0 && !whiteOn && globalConf.switchAES) {
		let paraStr = config.url.substr(paraIndex+1, urlLen)
		if (securityObject && securityObject.hasOwnProperty('on') && securityObject.on === 1 && securityObject.hasOwnProperty('aesKeyValue')) {
			paraStr = util.Encrypt(paraStr, securityObject.aesKeyValue)
		}
		config.url = config.url.substr(0, paraIndex) + '?' + paraStr
	}
	// crsf token
	let tmpToken = getToken()
	if (tmpToken) {
		config.headers = Object.assign(config.headers, { "x-auth-header-token": tmpToken })
	}
	//return requestStatus ? { message: '重复登录' } : config
	return config
}, err => {
	if (err && err.config) {
		switch (err.config.status) {
		case 400: err.message = '请求错误(400)'; break
		case 401: err.message = '未授权，请重新登录(401)'; break
		case 403: err.message = '拒绝访问(403)'; break
		case 404: err.message = '请求出错(404)'; break
		case 408: err.message = '请求超时(408)'; break
		case 500: err.message = '服务器错误(500)'; break
		case 501: err.message = '服务未实现(501)'; break
		case 502: err.message = '网络错误(502)'; break
		case 503: err.message = '服务不可用(503)'; break
		case 504: err.message = '网络超时(504)'; break
		case 505: err.message = 'HTTP版本不受支持(505)'; break
		default: err.message = `连接出错(${err.config.status})!`
		}
	} else {
		err.message = '连接服务器失败!'
	}
	return Promise.reject(err)
})

// http response 拦截器
instance.interceptors.response.use(
	response => {
		// data数据解密
		if (checkEncrypted(response) && response.hasOwnProperty('data')) {
			let securityObject = sessionStorage.getItem('securityObject')
			if (securityObject) {
				securityObject = JSON.parse(securityObject)
				if (securityObject.hasOwnProperty('on') && securityObject.on === 1 && securityObject.hasOwnProperty('aesKeyValue')) {
					response.data = util.Decrypt(response.data, securityObject.aesKeyValue)
					response.data = JSON.parse(response.data)
				}
			}
		}
		// 登录后错误信息
		if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('status') && response.data.status.toString() === '401') {
			//清除session后进入login无法获取securityObject，故暂时注释
			//sessionStorage.clear()
			const strArr = window.location.href.split('?')
			const sso = qs.parse(strArr[1]).sso
			// 单点登录接口报401时，跳转404页面
			if (sso && sso === '1') {
				router.push({ path: '/404' })
			} else {
				router.push({ path: '/login' })
			}
		}
		// 保存token
		let hasProperty = response.headers.hasOwnProperty('x-auth-header-token') || response.headers.hasOwnProperty('X-AUTH-HEADER-TOKEN')
		if (hasProperty) {
			let hasTokenStatus = response.headers.hasOwnProperty('X-AUTH-HEADER-TOKEN-STATUS') || response.headers.hasOwnProperty('x-auth-header-token-status')
			if (hasTokenStatus) {
				let value = response.headers["X-AUTH-HEADER-TOKEN-STATUS"] || response.headers["x-auth-header-token-status"]
				if (value === '1') {
					clearTokenList()
				}
			}
			/*if (response.request.responseURL && response.request.responseURL.indexOf("/login/verify") > 0) {
                clearTokenList()
            }*/
			let respHeader = response.headers["x-auth-header-token"] || response.headers["X-AUTH-HEADER-TOKEN"]
			if (respHeader.length) {
				setToken(respHeader.split('_'))
			}
		}
		return response
	},
	error => {
		return Promise.reject(error)
	}
)
// 封装get方法
export const get = (url, params = null) => {
	if (params !== null) {
		params = Object.keys(params).map(function(key) {
			return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
		}).join("&")
		url = url + '?' + params
	}
	return new Promise((resolve, reject) => {
		axios.get(url)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 封装get方法
export const fetch = (url, params = null) => {
	if (params !== null) {
		params = Object.keys(params).map(function(key) {
			return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
		}).join("&")
		url = url + '?' + params
	}
	return new Promise((resolve, reject) => {
		axios.get(url)
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
// 封装post请求
export const post = (url, data) => {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data)
			}, err => {
				reject(err)
			})
	})
}
// 封装asyncPost的请求(post的同步请求，请求过程是阻塞的)
export const asyncPost = (url, data) => {
	let xhr = new XMLHttpRequest()
	let result
	xhr.open('POST', url, false)
	// 添加http头，发送信息至服务器时内容编码类型
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
			result = xhr.responseText
		}
	}
	xhr.send(data)
	return result
}
// 临时
export const onlyPost = (url, data) => {
	return new Promise((resolve, reject) => {
		axios.post(url, data, {
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
			},
		})
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
	})
}
// 封装delete请求
export const requestDelete = (url, data) => {
	return new Promise((resolve, reject) => {
		axios.delete(url, data)
			.then(response => {
				resolve(response.data)
			}, err => {
				reject(err)
			})
	})
}
// 封装导出方法
export const exportGet = (exportUrl) => {
	let whiteOn = false
	let securityObject = sessionStorage.getItem('securityObject')
	if (securityObject) {
		securityObject = JSON.parse(securityObject)
		for (let i=0; securityObject.hasOwnProperty('whiteList') && i<securityObject.whiteList.length; i++) {
			if (exportUrl.indexOf(securityObject.whiteList[i]) > -1) {
				whiteOn = true
				break
			}
		}
	}
	// 确保token不被完成消耗
	let tokenArry = JSON.parse(sessionStorage.getItem('tokenList')) || []
	if (tokenArry.length === 1){
		console.warn('网络异常，请重新刷新！')
		return false
	}
	// 拼接token
	let tmpToken = getToken()
	if (tmpToken) {
		exportUrl += '&X-AUTH-HEADER-TOKEN=' + tmpToken
	}
	let paraIndex = exportUrl.indexOf('?')
	let urlLen = exportUrl.length
	if (paraIndex > 0 && !whiteOn && globalConf.switchAES) {
		let paraStr = exportUrl.substr(paraIndex+1, urlLen)
		// 数据加密处理
		if (securityObject) {
			if (securityObject.hasOwnProperty('on') && securityObject.on === 1 && securityObject.hasOwnProperty('aesKeyValue')) {
				paraStr = util.Encrypt(paraStr, securityObject.aesKeyValue)
			}
		}
		exportUrl = exportUrl.substr(0, paraIndex) + '?' + paraStr
	}
	window.location.href =  exportUrl
}
// url中拼接token
export const tokenUrl = (url) => {
	let whiteOn = false
	let securityObject = sessionStorage.getItem('securityObject')
	if (securityObject) {
		securityObject = JSON.parse(securityObject)
		for (let i=0; securityObject.hasOwnProperty('whiteList') && i<securityObject.whiteList.length; i++) {
			if (url.indexOf(securityObject.whiteList[i]) > -1) {
				whiteOn = true
				break
			}
		}
	}
	let tmpToken = getToken()
	let urlToken = ''
	if (tmpToken) {
		urlToken = 'X-AUTH-HEADER-TOKEN=' + tmpToken
	}
	// 数据加密处理
	if (!whiteOn && globalConf.switchAES) {
		if (securityObject) {
			if (securityObject.hasOwnProperty('on') && securityObject.on === 1 && securityObject.hasOwnProperty('aesKeyValue')) {
				urlToken = util.Encrypt(urlToken, securityObject.aesKeyValue)
			}
		}
	}
	if (tmpToken) {
		url = url + '?' + urlToken
	}
	return url
}

// token处理逻辑
function getToken() {
	let tokenList = JSON.parse(sessionStorage.getItem('tokenList')) || []
	if (tokenList.length) {
		let newToken = tokenList.shift()
		sessionStorage.setItem('tokenList', JSON.stringify(tokenList))
		return newToken
	} else {
		return null
	}
}
function setToken(newTokenList) {
	let tokenList = JSON.parse(sessionStorage.getItem('tokenList')) || []
	if (newTokenList) {
		for (let i=0; i<newTokenList.length; i++) {
			tokenList.push(newTokenList[i])
		}
		sessionStorage.setItem('tokenList', JSON.stringify(tokenList))
	}
}
function clearTokenList() {
	sessionStorage.setItem('tokenList', JSON.stringify([]))
}
export default async function(options) {
	const requestOptions = Object.assign({}, options)
	try {
		let allData = await instance.request(requestOptions)
		const {
			data,
			data: { errno, errmsg },
		} = allData

		if (errno) {
			throw new Error(errmsg)
		}
		return data
	} catch (err) {
		throw err
	}
}
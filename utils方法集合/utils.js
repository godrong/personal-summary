/**
 * Created by jiachenpan on 16/11/18.
 */

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
    if (arr instanceof Array) {
        return targetarr.some(_ => arr.indexOf(_) > -1)
    } else {
        return false
    }
}

/**
 * 时间格式化，返回格式 yyyy-MM-dd hh:mm:ss
 * @param time
 * @returns {*}
 */
export const formatTimeSs = (time) => {
    if (!time) {
        return null
    }
    const format = '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else if (typeof time === 'string') {
        if (/^[0-9]+$/.test(time)) {
            date = new Date(parseInt(time))
        } else if (time.indexOf('T') !== -1) {
            date = new Date(time.split('T')[0].replace(/-/g, '/'))
        } else {
            date = new Date(time.replace(/-/g, '/'))
        }
    } else {
        date = new Date(time)
    }

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() + 1 + '月' +
            d.getDate() + '日' +
            d.getHours() + '时' +
            d.getMinutes() + '分'
        )
    }
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

// 清理字符串空格
export function trimString(str) {
    if (str == '' || !str) return str
    const new_str = str.toString()
    return new_str.replace(/^\s*|\s*$/g, '')
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
    return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
    const d = new Date(timeStamp * 1000)
    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else resStr = month + '-' + date + ' ' + hours + ':' + minutes
    return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * 根据身份证号返回出生日期和年龄
 * @param {*} idNo 身份证号
 */
export const getBirthInfoByIdNo = (idNo) => {
    if (!idNo) {
        return {
            birth: '',
            age: ''
        }
    }
    if (idNo.length === 15) {
        const year = `19${idNo.substr(6, 2)}`
        const month = idNo.substr(8, 2)
        const date = idNo.substr(10, 2)

        return countAge(year, month, date)
    } else if (idNo.length === 18) {
        const year = idNo.substr(6, 4)
        const month = idNo.substr(10, 2)
        const date = idNo.substr(12, 2)

        return countAge(year, month, date)
    } else {
        return {
            birth: '',
            age: ''
        }
    }

    function countAge(year, month, date, justYear = true) {
        const birth = `${year}-${month}-${date}`
        const thisyear = (new Date()).getFullYear()
        const thismonth = (new Date()).getMonth() + 1
        const thisdate = (new Date()).getDate()
        let age = thisyear - year

        // 只判断年
        if (justYear) {
            return {
                birth: birth,
                age: age
            }
        }

        if (Number(month) > thismonth) {
            age -= 1
        } else if (Number(month) === thismonth && Number(date) > thisdate) {
            age -= 1
        }

        return {
            birth: birth,
            age: age
        }
    }
}

/**
 * 根据出生日期返回年龄
 * @param {*} birthday 出生日期
 */
export const getAgeByBirth = (birthday) => {
    let strBirthdayArr = birthday.split('-')
    let year = strBirthdayArr[0]
    let month = strBirthdayArr[1]
    let date = strBirthdayArr[2]
    const thisyear = (new Date()).getFullYear()
    const thismonth = (new Date()).getMonth() + 1
    const thisdate = (new Date()).getDate()
    let age = thisyear - year
    if (Number(month) > thismonth) {
        age -= 1
    } else if (Number(month) === thismonth && Number(date) > thisdate) {
        age -= 1
    }
    return age
}

/**
 * 根据时间返回工龄
 * @param {*} dateString 日期字符串
 * @param {*} justYear 只判断年
 */
export const getJobageByDate = (dateString, justYear = true) => {
    if (dateString) {
        const year = dateString.substr(0, 4)
        const month = dateString.substr(5, 2)
        const date = dateString.substr(8, 2)
        const thisyear = (new Date()).getFullYear()
        const thismonth = (new Date()).getMonth() + 1
        const thisdate = (new Date()).getDate()
        let age = thisyear - year

        if (justYear) {
            return `${age}年`
        }

        if (Number(month) > thismonth) {
            age -= 1
        } else if (Number(month) === thismonth && Number(date) > thisdate) {
            age -= 1
        }

        return `${age}年`
    } else {
        return ''
    }
}


// 随机生成64个字符
export const get64String = () => {
    const str = '12345qwertyui67890opasdfghj09876klzxcvbnm54321'
    let res = ''
    for (let i = 0; i < 48; i++) {
        res += str.split('')[Math.floor(Math.random() * str.length)]
    }
    return `${Date.now()}asp${res}`.toUpperCase()
}

/**
 * 优化 try-catch 的错误处理
 * @param {*} asyncFun 异步函数
 * @param {*} params 
 * @returns [err, res] 返回被捕获异常和成功的结果
 */
export const captured = async (asyncFun, params) => {
    try {
        const res = await asyncFun(params)
        return [null, res]
    } catch (err) {
        return [err, null]
    }
}
/**
     * @param {Array} arr1
     * @param {Array} arr2
     * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
     */
export const getIntersection = (arr1, arr2) => {
    const len = Math.min(arr1.length, arr2.length)
    let i = -1
    const res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}


/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
    if (key) return key in obj
    else {
        const keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
}

// 生成单例
export const getSingle = (fn) => {
    let instance
    return function() {
        if (!instance) {
            instance = fn.apply(this, arguments)
        }
        return instance
    }
}

/**
 * 将键值对的对象转换成属性为code/name的数组 , 传入obj , 输出arr
 * @param {*} obj {'1':'aaa','2':'bbb'}
 * @param {*} 输出 [{code:'1',name:'aaa'},{code:'2',name:'bbb'}]
 */
export const keyValueToArr = (obj1) => {
    const _Arr = []
    Object.keys(obj1).forEach((item, index) => {
        _Arr[index] = {}
        _Arr[index].code = item
        _Arr[index].name = obj1[item]
    })
    return _Arr
}

/**
 * 删除单一一条数据 , 根据id 进行删除
 * @param id 删除的那一条
 * @param data 目标数据
 */
export const delSingle = (id, data) => {
    let flag = data.findIndex(v => {
        return v.id === id
    })
    if (flag !== -1) {
        data.splice(flag, 1)
    }
}
/**
     * 修改数据中某一条的一些属性
     * @param id 目标
     * @param data 数据
     * @param 修改的内容,对象的形式,例(将status改为100,type改为2):{status:100,type:2}
     */
export const editSingleDataStatus = (id, data, obj) => {
    const finded = data.findIndex(item => {
        return item.id === id
    })
    if (finded !== -1) {
        Object.assign(data[finded], obj)
    }
}

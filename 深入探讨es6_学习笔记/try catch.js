https://fed.taobao.org/blog/taofed/do71ct/try-catch-runing-problem/?spm=taofed.homepage.header.7.7eab5ac8v4hMGr


使用 try catch 的使用无论是在 try 中的代码还是在 catch 中的代码性能消耗都是一样的。
需要注意的性能消耗在于 try catch 中不要直接塞进去太多的代码（声明太多的变量），
最好是吧所有要执行的代码放在另一个 function 中，通过调用这个 function 来执行。

针对第二点，可以查看 ECMA 中关于 try catch 的解释，在代码进入 try catch 的时候 
js引擎会拷贝当前的词法环境，拷贝的其实就是当前 scope 下的所有的变量。


淘宝系的上报错误异常

window.JSTracker2 = window.JSTracker2 || [];
try{
    //your code
}catch(e){
    JSTracker2.push({
      msg: "xx_api_failed"
    });
}
将变量hold住发送请求
var win = window;
var n = 'jsFeImage_' + _make_rnd(),
  img = win[n] = new Image();
img.onload = img.onerror = function () {
  win[n] = null;
};
img.src = src;

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
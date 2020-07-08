高阶函数是对函数进行操作的函数，接受函数作为参数或者返回函数。

function fn(callback){
  callback && callback();
}
 fn(function() {alert(1)})


 
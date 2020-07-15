高阶函数是对函数进行操作的函数，接受函数作为参数或者返回函数。

function fn(callback){
  callback && callback();
}
 fn(function() {alert(1)})

 // 储存已经计算过一次的函数
function cached (fn) {
   var cache = Object.create(null);
   return ( function cachedFn(str){
        var hit = cache[str]
        return hit || (cache[str] = fn(str))
   })
};

使用方法 :
  var capitalize = cached(function(str){
    return str.charAt(0).toUpperCase +str.slice(1) 
  })
  capitalize('aaa')
  // 再次调用时将会返回缓存的值
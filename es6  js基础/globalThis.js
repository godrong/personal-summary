在 globalThis 之前，获取某个全局对象的唯一方式就是 Function('return this')()，但是这在某些情况下会违反 CSP 规则，所以，es6-shim 使用了类似如下的方式：

var getGlobal = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 

var globals = getGlobal(); 

if (typeof globals.setTimeout !== 'function') { 
  // 此环境中没有 setTimeout 方法！
}
但是有了 globalThis 之后，只需要：

if (typeof globalThis.setTimeout !== 'function') {
  //  此环境中没有 setTimeout 方法！
}

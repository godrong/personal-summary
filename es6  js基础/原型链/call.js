// call 方法 
 1.call 可以调用函数
 2.call 可以改变函数this的指向
 // fn.call(thisArg，arg1，arg2...)
  function  fn() {
      console.log('hhhh')
      console.log(this)
  }
  var o = {
      name :'andy'
  }
  fn.call(o)
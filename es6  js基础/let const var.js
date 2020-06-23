var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); 

//输出为 10   i为全部变量

//改写 
var  a = [];
for (var i =0; i< 10;i++){
    (function (arg){
        a[i] = function () {
            console.log(arg)
        }
    })(i)
}
a[6](); // 6
//es6
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
//用es5描述就是这样的 
"use strict";

var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6](); // 6

//立即执行函数
1.好处： 
不必为函数命名，避免了污染全局变量
立即执行函数内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量
封装变量
2.立即执行函数使用场景
1、你的代码在页面加载完成之后，不得不执行一些设置工作，比如时间处理器，创建对象等等。
2、所有的这些工作只需要执行一次，比如只需要显示一个时间。
3、但是这些代码也需要一些临时的变量，但是初始化过程结束之后，就再也不会被用到，如果将这些变量作为全局变量，不是一个好的注意，我们可以用立即执行函数——去将我们所有的代码包裹在它的局部作用域中，不会让任何变量泄露成全局变量。看如下代码：
3. 实现 
    1. (function(){}())  //最推荐的方式，外面的括号将内部的函数显示的定义为函数表达式
    2. (function(){})()    //完全等同于以上的方式
    3. !function(){}();  // 通过！元素符将函数显示的定义为表达式，然后执行，同理：+，- 也可以
    4. var fn = function(){}();  //通过赋值运算符将函数显示的定义为表达式，然后执行
4.例子
  var currTime = (function(){
      var time = new Date()
      var year = time.getFullYear()
      var month = time.getMonth()
      var date  = time.getDate()
      var min   = time.getMinutes()
      var sec   = time.getSeconds()
      return year + '/' + month + '/' + date + " " +hours + ':' + min + ":" + sec 
  })()


   //const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
  // 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，
  // 因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，
  // 保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），
  // 至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
  const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。
不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，
所以依然可以为其添加新属性。
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};


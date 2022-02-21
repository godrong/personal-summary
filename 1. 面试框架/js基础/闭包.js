// 1.上级作用域  函数的上级作用域在哪里创建的，上级作用域就是谁
var a = 10
function foo(){
    console.log(a)
}

function sum() {
    var a = 20
    foo()
}

sum()
/* 输出
    10
/

// - 函数 foo() 是在全局下创建的，所以 a 的上级作用域就是 window，输出就是 10
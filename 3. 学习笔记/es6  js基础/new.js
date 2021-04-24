function newFunc (constructor){
    var o = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(o, Array.prototype.slice.call(arguments, 1));
    return o;
}
function _new (constructor){
    var o = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(o,Array.prototype.slice.call(arguments, 1))
    return o;
}

function __new (Func,...args) {
    //建一个空对象
    var obj = {}
    // 将对象原型指向构造函数的原型对象
    obj.__proto__ = Func.prototype
    // 将构造函数的原型this绑定到新对象
    let res = Func.apply(obj,args)
    // 根据返回值判断
    return res instanceof Object ? res : obj 
}
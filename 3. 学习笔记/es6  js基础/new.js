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

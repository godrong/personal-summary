let array = []
const arr = ['a', 'b', 'c'];
arr.forEach(function(element, index, array) {
    console.log(element, index, array);
});

var newLength = arr.push('apple')
// arry 的方法
var last = arr.pop()//  
var first = arr.shift()
var newLength = arr.unshift('didi')

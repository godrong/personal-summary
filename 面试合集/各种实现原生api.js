
// 实现instanceof
function instance_of (L,R){
    let prototype = R.prototype 
    while(true){
        if(L===null){
            return false
        }else if(L.__proto__ === prototype){
            return true 
        }
        L = L.__proto__
    }
}

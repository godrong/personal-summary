[] == ! []   ->   [] == false  ->  [] == 0  ->   '' == 0   ->  0 == 0   ->  true

跨站脚本攻击又名XSS（Cross-Site Scripting）。XSS这类安全问题发生的本
质原因在于：浏览器错误的将攻击者提供的用户输入数据当做JavaScript脚本给
执行

##### 手写promise.all 伪代码

```
function doPromiseAll(promises) {
    return new Promise((resolve,reject))=>{
        if(!Array.isArray(promises)){
            throw new TypeError("promise must be an array")
        }
        let result = []
        let count = 0
        promises.forEach((promise,idx)=>{
            promise.then((res)=>{
                result[idx] = res
                count++
                count === promises.length && resolve(result)
            },(err)=>{
                reject(err)
            })
        })
    }
}
```
##### 事件委托机制
    事件委托其实也叫事件代理。
    定义：事件代理就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。(delegation)。
    只要定义一个监听函数，就能处理多个子节点的事件，且以后再添加子节点，监听函数依然有效。

    适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress 。值得注意的是，mouseover 和mouseout 虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。

##### js的继承模式
    https://www.cnblogs.com/ranyonsue/p/11201730.html    
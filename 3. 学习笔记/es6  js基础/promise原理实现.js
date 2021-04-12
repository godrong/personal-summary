1.最简单的实现
基于上面的应用场景发现promise可以有三种状态，分别是pedding 、Fulfilled、 Rejected。

Pending Promise对象实例创建时候的初始状态
Fulfilled 可以理解为成功的状态
Rejected可以理解为失败的状态
1.一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。

2.then方法可以被同一个promise调用多次

3.then方法必须返回一个promise对象

4. 还有一个就是当then传的值不是一个函数的时候，就将值传递给下一个then，也叫做值穿透


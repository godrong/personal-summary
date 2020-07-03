// 改变函数内this的指向  js提供了三种方法 call() apply() bind()
### bind
1. 不会调用原来的函数 
2.返回的是原函数改变this后返回的新函数 

var btns = document.querySelectorAll('button');
for (let i=0;i<btns.length;i++){
  btns[i].onclick = function () {
    this.disabled = true 
    setTimeout(function(){
      this.disabled = false
    }.bind(this),2000)
  }
}



2. 区别总结  
  相同 ： 都可以用来改变this的指向 
  不同：
    1.call和apply会改变调用函数，并且改变函数内部this的指向
    2.call和apply传递的参数不一样，call传递参数arm1，arm2形式，apply必须数组形式[arg]
    3.bind不会调用函数，可以改变函数内部this的指向
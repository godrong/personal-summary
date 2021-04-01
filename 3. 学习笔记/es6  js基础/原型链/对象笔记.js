1.对象的创建  
 var obj = new Object()
 var obj = {}
 //利用构造函数创建对象
 {
    function Star (uname,age) {
        this.uname = uname;
        this.age = age 
    }
    // 很多时候，我们需要手动利用constructor这个属性指回原来的构造函数
    Star.prototype= {
        constructor:Star,
        sing :function () {
            console.log('我会唱歌')
        },
        movie :function () {
            console.log('我会演电影')
        }  
    } 
    var ldh = new Star('刘德华',28)
    ldh.sing()

}
//1.实例成员就是构造函数内部通过this添加的成员  实例成员只能通过实例化的对象去访问 
//2.静态成员 在构造函数身上添加的成员
Star.sex = '男';// 静态成员只能通过构造函数访问 



2.对象身上的__proto__指向我们构造函数的原型对象 
 ldh.__proto__ === Star.prototype //true 
 let rr = new Star()
 rr.__proto__ = Star.prototype  

 3. 构造函数 constructor  
  对象原型（__proto__)和构造函数(prototype)原型对象里面都有一个属性constructor，constructor 我们称之为构造函数，
  它指向构造函数本身。 
4. 原型链的查找规则
  实例对象的__proto__ 始终指向其原型的 prototype 一直往上找到 Object.prototype 然后是 Object.__proto__ === null 
  当查找对象的成员时，遵循就近原则，往原型链向上查找 。
5. 原型对象里面的this指向的是 实例对象
6. 原型对象的应用 -- 扩展内置对象方法 
7. 继承
  function Father (name,age) {
      this.name = name;
      this.age = age;
  }
  function Son (name,age,sex) {
      Father.call(this,name,age)
      this.sex = sex
  }
  Son.prototype = new Father()
  Son.prototype.constructor = Son
  var ldh = new Son('刘德华','88','very sexy')

  构造函数的特点 
  es5 通过构造函数+ 原型实现面向对象编程 ,ES6通过类实现面向对象编程 
  (1)构造函数有原型对象 prototype
  (2)构造函数原型对象 prototype里面有 constructor指向构造函数本身
  (3)构造函数可以通过原型对象添加方法
  (4)构造函数创建的实例对象有_ proto_原型指向构造函数的原型对象
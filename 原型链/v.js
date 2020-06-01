参考 https://blog.csdn.net/cc18868876837/article/details/81211729?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2
https://blog.csdn.net/zengyonglan/article/details/53465505?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5
Object.getPrototypeOf({__proto__: null}) === null
let notice = '我们需要牢记两点： ①__proto__和constructor属性是对象所独有的;
 ② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
  __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，
  一直找，直到__proto__属性的终点null，然后返回undefined，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
   prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。 
   constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。 
   另外 __proto__ 属性是浏览器对es5的实现，而不是es标准。'

function Foo() {...};
let f1 = new Foo();
//表示创建一个构造函数Foo()，并用new关键字实例化该构造函数得到一个实例化对象f1

//new操作符将函数作为构造器进行调用时的过程 
//函数被调用，然后新创建一个对象，并且成了函数的上下文
（也就是此时函数内部的this是指向该新创建的对象，这意味着我们可以在构造器函数内部通过this参数初始化值），最后返回该新对象的引用



*** new 操作符

function Person(name, age){
	this.name = name;
	this.age = age;
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}

1.创建一个空对象obj {}
2.将obj的[[prototype]]属性指向构造函数constrc的原型（ obj.[[prototype]]=constrc.prototype ）
3.将构造函数constrc内部的this绑定到新建的对象obj，执行constrc（也就是跟调用普通函数一样，只是此时函数的this为新创建的对象obj而已，就好像执行obj.constrc()一样）
4.有返回值就 返回引用类型的值  没有就返回新建的对象 （默认 return this）

××× 实现new操作符
function myNew (constrc,...args){
    const obj = {} //1.创建一个空对象
    obj.__proto__ = constrc.prototype //2.将obj的[[prototype]]属性指向构造函数constrc的原型 
    //或者使用自带方法  Object.setPrototypeOf(obj,constrc.prototype)
    return constrc.apply(obj,args) || obj//3.将constrc执行的上下文this绑定到obj上，并执行
}
function Person(name, age){
	this.name = name;
    this.age = age;
    return {}//不建议构造函数有返回值
}
const person1 = myNew(Person,'Tom',20)
console.log(person1)  // Person {name: "Tom", age: 20}





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
 


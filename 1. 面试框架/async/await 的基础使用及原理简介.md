可以看出async函数，返回的是一个Promise对象

Generator函数:generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。下面面是一个Generator函数的简单写法。
```js
function* Generator() {
            yield '11111111';
            yield '22222222'
            return '3333333';
        }
        let aaa = Generator();
```

Generator函数和普通函数一样通过函数名+()去调用，但是调用完之后并不执行。它仅仅是创建了一个generator对象，还没有去执行它。想要运行Generator函数，需要通过遍历器对象的next方法。
commonJS和ES6模块化 
    commonjs是同步的，不适合在浏览器端，es6适用任何环境；
    commonjs输出的是值的拷贝，es6输出的是值的引用；
    commonjs是运行时加载，而es6是编译时输出接口，使得对js的模块进行静态分析成为了可能；
    关于模块顶层的this指向问题，在commonjs顶层，this指向当前模块，而在es6模块中，this指向undefined；
    在es6模块中支持加载commonjs，反过来，commonjs不能require es6模块，在nodejs中，两个模块是分开处理的。
    
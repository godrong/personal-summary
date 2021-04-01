### 1.前言
与实例方法不同，实例方法是将方法挂载到Vue的原型上，而全局API是直接在Vue上挂载方法。
这12个API中有的是我们在日常业务开发中经常会用到的，有的是对Vue内部或外部插件提供的，我们在日常业务开发中几乎用不到。
### 2.API
#### 2.1 Vue.extend

**作用：**

使用vue基础构造器，创建一个子类，参数是一个包含组件选项的对象。
data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数.

---
步骤：

**1.创建一个类Sub**

**2.通过原型继承的方式将该类继承基础Vue类**

**3.给Sub类添加一些属性 && 将父类的某些属性复制到Sub类上**

**4.将Sub类返回**


```js
Vue.extend = function (extendOptions: Object): Function {
    //extendOptions ：用户传入的一个包含组件选项的对象参数；
    extendOptions = extendOptions || {} 
    //Super：指向父类，即基础 Vue类；
    const Super = this 
    //SuperId：父类的cid属性，无论是基础 Vue类还是从基础Vue类继承而来的类，都有一个cid属性，作为该类的唯一标识；
    const SuperId = Super.cid
    //cachedCtors：缓存池，用于缓存创建出来的类；
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    //在缓存池中先尝试获取是否之前已经创建过的该子类，如果之前创建过，则直接返回之前创建的。
    if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
    }
    //在开发环境下校验name字段是否合法
    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
        validateComponentName(name)
    }
    //创建一个类Sub
    const Sub = function VueComponent (options) {
        this._init(options)
    }
    //将父类的原型继承到子类中，并且为子类添加唯一标识cid
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    //将父类的options与子类的options进行合并，将合并结果赋给子类的options属性
    Sub.options = mergeOptions(
        Super.options,
        extendOptions
    )
    //将父类保存到子类的super属性中，以确保在子类中能够拿到父类
    Sub['super'] = Super
    //如果选项中存在props属性，则初始化它
    if (Sub.options.props) {
        initProps(Sub)
    }
    if (Sub.options.computed) {
        initComputed(Sub)
    }
    //将父类中的一些属性复制到子类中
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
        Sub.options.components[name] = Sub
    }
    //给子类新增三个独有的属性
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // 将创建好的子类Sub返回
    cachedCtors[SuperId] = Sub
    return Sub
}c
```


##### 高级函数 -- cached 缓存上次函数计算的结果

```js
/**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }
```
##### this._init()

- 用Vue.prototype._init()方法。完成一系列初始化（原型上添加方法和属性）;
- 执行Vue.prototype.$mount;
- vm._render()获取描述当前实例的VNode;
- vm._update(VNode)，调用 vm.__patch__转换成真正的 DOM 节点.
![image](https://upload-images.jianshu.io/upload_images/5712687-232c2d1d73ab5e9b.png)

#### 4.2 Vue.nextTick

---

 useage：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
 

---

 nextTick 的定义位于源码的src/core/util/next-tick.js中，其大概可分为两大部分：

1.能力检测

2.根据能力检测以不同方式执行回调队列

#####  能力检测
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务。

这一部分的源码如下：
```js
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

/* 对于宏任务(macro task) */
// 检测是否支持原生 setImmediate(高版本 IE 和 Edge 支持)
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    macroTimerFunc = () => {
        setImmediate(flushCallbacks)
    }
}
// 检测是否支持原生的 MessageChannel
else if (typeof MessageChannel !== 'undefined' && (
    isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = flushCallbacks
    macroTimerFunc = () => {
        port.postMessage(1)
    }
}
// 都不支持的情况下，使用setTimeout
else {
    macroTimerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

/* 对于微任务(micro task) */
// 检测浏览器是否原生支持 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    microTimerFunc = () => {
        p.then(flushCallbacks)
    }
}
// 不支持的话直接指向 macro task 的实现。
else {
    // fallback to macro
    microTimerFunc = macroTimerFunc
}

```
##### 执行回调队列
接下来就进入了核心函数nextTick中，如下：

```js
// 用来存储所有需要执行的回调函数
const callbacks = []  
// 用来标志是否正在执行回调函数  异步锁
let pending = false   

// 执行队列中的每一个回调
function flushCallbacks () {
    pending = false     // 重置异步锁
    // 防止出现nextTick中包含nextTick时出现问题，在执行回调函数队列前，提前复制备份并清空回调函数队列
    const copies = callbacks.slice(0)
    callbacks.length = 0
    // 执行回调函数队列
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

export function nextTick (cb?: Function, ctx?: Object) {
    let _resolve
    // 将回调函数推入回调队列
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    // 如果异步锁未锁上，锁上异步锁，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
    if (!pending) {
        pending = true
        if (useMacroTask) {
            macroTimerFunc()
        } else {
            microTimerFunc()
        }
    }
    // 如果没有提供回调，并且支持Promise，返回一个Promise
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}
```
 ##### js运行机制
  **js运行是单线程的，它是基于事件循环的。**
 - 1.所有的同步任务都在主线程上执行，形成一个执行栈。
 - 2.主线程之外，会存在一个任务队列，只要异步任务有了结果，就在任务队列中放置一个事件。
 - 3.当执行栈中的所有同步任务执行完后，就会读取任务队列。那些异步对应的任务，会结束等待状态，进入执行栈。

 这里主线程的执行过程就是一个tick，而所有的异步结果都是通过任务队列来调度。Event Loop 分为宏任务和微任务，无论是执行宏任务还是微任务，完成后都会进入到一下tick，并在两个tick之间进行UI渲染。

由于Vue DOM更新是异步执行的，即修改数据时，视图不会立即更新，而是会监听数据变化，并缓存在同一事件循环中，等同一数据循环中的所有数据变化完成之后，再统一进行视图更新。为了确保得到更新后的DOM，所以设置了 Vue.nextTick()方法。

#### 2.3 Vue.set 和 Vue.delete

##### 用法：

Vue.set向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')

Vue.delete删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。

注意：对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
##### 内部原理

  由于2.x数据变化侦测的缺陷（Object.defineProperty），对于object型数据，当我们向object数据里添加一对新的key/value或删除一对已有的key/value时，Vue是无法观测到的；而对于Array型数据，当我们通过数组下标修改数组中的数据时，Vue也是是无法观测到的；
##### 实现步骤

- 判断target是否undefined, null或原始类型
- 判断属性为数组或对象，执行赋值和响应式
- 判断是不是Vue实例以及是否为根数据对象，报出警告return
- 判断_ob_属性是否为true，存在才需要添加响应式

```js
export function set (target, key, val){
    //数值校验
    if (process.env.NODE_ENV !== 'production' &&
        (isUndef(target) || isPrimitive(target))
       ) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
    }
    //接着判断如果传入的target是数组并且传入的key是有效索引的话，那么就取当前数组长度与key这两者的最大值作为数组的新长度，
    // 然后使用数组的splice方法将传入的索引key对应的val值添加进数组。
    // 数组的splice方法已经被我们创建的拦截器重写了，也就是说，当使用splice方法向数组内添加元素时，该元素会自动被变成响应式的
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    //接下来获取到traget的__ob__属性，我们说过，该属性是否为true标志着target是否为响应式对象，
    // 接着判断如果tragte是 Vue 实例，或者是 Vue 实例的根数据对象，则抛出警告并退出程序，如下：
    const ob = (target: any).__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    //接着判断如果ob属性为false，那么表明target不是一个响应式对象，
    // 那么我们只需简单给它添加上新的属性，不用将新属性转化成响应式，
    if (!ob) {
        target[key] = val
        return val
    }
    // 最后，如果target是对象，并且是响应式，那么就调用defineReactive方法将新属性值添加到target上，defineReactive方会将新属性添加完之后并将其转化成响应式，最后通知依赖更新
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
```

![image](https://vue-js.com/learn-vue/assets/img/1.ec40be4a.jpg)


delete方法是用来解决 Vue 不能检测到属性被删除的限制，该方法的定义位于源码的src/core.observer/index.js中，如下：

```js
export function del (target, key) {
    //首先判断在非生产环境下如果传入的target不存在，或者target是原始值，则抛出警告
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  //接着判断如果传入的target是数组并且传入的key是有效索引的话，就使用数组的splice方法将索引key对应的值删掉
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  //接下来获取到traget的__ob__属性，我们说过，该属性是否为true标志着target是否为响应式对象，接着判断如果tragte是 Vue 实例，或者是 Vue 实例的根数据对象，则抛出警告并退出程序，如下：
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  //，如果key本来就不存在于target中，那就不用删除
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}
```


#### 2.4  Vue.directive、Vue.filter和Vue.component   指令、过滤器、 注册或获取全局组件
其实在源码中这三个API的实现是写在一起的，位于源码的src/core/global-api/index,js和src/core/global-api/assets,js中。
  ##### Vue.directive 
   - 原理
   用来注册或获取全局指令的，接收两个参数：指令id和指令的定义。这里需要注意一点的是：注册指令是将定义好的指令存放在某个位置，获取指令是根据指令id从存放指令的位置来读取指令。
    ##### Vue.filter 
    注册或获取全局过滤器。  
  ##### Vue.component 
    注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
```js
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]

Vue.options = Object.create(null)
ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
})

ASSET_TYPES.forEach(type => {
    Vue[type] = function (id,definition) {
        //这两种功能的切换取决于是否传入了definition参数。如果没有传入definition参数，则表示为获取(指令/过滤器/组件)，那么就从存放(指令/过滤器/组件)的地方根据(指令/过滤器/组件)id来读取(指令/过滤器/组件)并返回
        if (!definition) {
            return this.options[type + 's'][id]
        } else {
            //如果传入了definition参数，则表示为注册(指令/过滤器/组件)

            //如果是注册组件，那么在非生产环境下首先会校验组件的name值是否合法
            if (process.env.NODE_ENV !== 'production' && type === 'component') {
                validateComponentName(id)   
            }
            //判断传入的definition参数是否是一个对象，如果是对象，则使用Vue.extend方法将其变为Vue的子类，同时如果definition对象中不存在name属性时，则使用组件id作为组件的name属性。如下：
            if (type === 'component' && isPlainObject(definition)) {
                definition.name = definition.name || id
                definition = this.options._base.extend(definition)
            }
            //如果是指令类型，判断definition参数是否是一个函数，如果是函数，则默认监听bind和update两个事件，即将definition函数分别赋给bind和update两个属性。
            if (type === 'directive' && typeof definition === 'function') {
                definition = { bind: definition, update: definition }
            }
            //自定义的指令对象
            this.options[type + 's'][id] = definition
            return definition
        }
    }
})
```
 #### 2.5 Vue.use 
 ```js
 Vue.use( plugin )
 ```
  - 作用 :

  安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。
- 原理分析
从用法回顾中可以知道，该API是用来安装Vue.js插件的。并且我们知道了，该API内部会调用插件提供的install 方法，同时将Vue 作为参数传入。另外，由于插件只会被安装一次，所以该API内部还应该防止 install 方法被同一个插件多次调用。下面我们就来看一下该API的内部实现原理。
```js
Vue.use = function (plugin) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
        return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
}
```
 #### 2.6 Vue.mixin
  ```js
 Vue.mixin( mixin )
 ```
  - 作用 :

  全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

- 原理分析
从用法回顾中可以知道，该API是用来向全局注册一个混入，即可以修改Vue.options属性，并且会影响之后的所有Vue实例，这个API虽然在日常的业务开发中几乎用不到，但是在编写Vue插件时用处非常大。
```js
Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
}
```

可以看到，该API的实现非常简单。因为上文中我们说了，该API就是通过修改Vue.options属性进而影响之后的所有Vue实例。所以我们只需将传入的mixin对象与this.options合并即可，然后将合并后的新对象作为this.options传给之后的所有Vue实例，从而达到改变其原有特性的效果。
 #### 2.7 Vue.compile
  ```js
 Vue.compile( template )
 ```
  - 作用 :

  在 render 函数中编译模板字符串。只在独立构建时有效.
- 原理分析
从用法回顾中可以知道，该API是用来编译模板字符串的，我们在日常业务开发中几乎用不到，它内部是调用了compileToFunctions方法.
```js
Vue.compile = compileToFunctions;


```
 #### 2.8 Vue.observable
  ```js
Vue.observable( object )
 ```
  - 作用 :

  让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：
- 原理分析
从用法回顾中可以知道，该API是用来将一个普通对象转化成响应式对象。在日常业务开发中也几乎用不到，它内部是调用了observe方法，关于该方法在数据变化侦测篇已经做了非常详细的介绍，此处不再重复。
```js

```
 #### 2.9 Vue.version
  ```js
Vue.version
 ```
  - 作用 :
API是用来标识当前构建的Vue.js的版本号，对于日常业务开发几乎用不到，但是对于插件编写非常有用，可以根据Vue版本的不同从而做一些不同的事情。
 
```js
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```



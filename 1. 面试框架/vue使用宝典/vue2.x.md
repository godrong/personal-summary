### 组件的缓存
  keep-alive 包裹「动态组件」时，会缓存不活动的组件实例，而不是销毁它们。它是一个抽象的组件，它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。
    方案一： 使用内置组件 <component>。
    <keep-alive>
        <component :is="view"></component>
    </keep-alive>
    方案二： 当出现条件判断时的子组件
    <keep-alive>
        <comp-a v-if="a > 1"></comp-a>
        <comp-b v-else></comp-b>
    </keep-alive>
    方案三： 结合路由使用时
    <keep-alive>
        <router-view></router-view>
    </keep-alive>

    注意：    1. 只有在包含动态组件时，才会产生效果，
             2. <keep-alive> 只能用在只有一个子组件的情况。如果你在其中有 v-for 则不会产生效果。


vite改进
Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。

依赖 大多为纯 JavaScript 并在开发时不会变动。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会以某些方式（例如 ESM 或者 CommonJS）被拆分到大量小模块中。

Vite 将会使用 esbuild 预构建依赖。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

源码 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载。（例如基于路由拆分的代码模块）。

Vite 以 原生 ESM 方式服务源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入的代码，即只在当前屏幕上实际使用时才会被处理。

vite缺点1.生态，生态，生态不如webpack
wepback牛逼之处在于loader和plugin非常丰富,不过我认为生态只是时间问题，现在的vite,更像是当时刚出来的M1芯片Mac，我当时非常看好M1的Mac，毫不犹豫买了，现在也没什么问题

vite缺点2.prod环境的构建，目前用的Rollup
原因在于esbuild对于css和代码分割不是很友好

vite缺点3.还没有被大规模使用,很多问题或者诉求没有真正暴露出来
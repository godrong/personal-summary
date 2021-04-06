
flex   http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
   09年 得到了所有浏览器的支持， 弹性布局。
   任何容器都可以指定为flex布局，行内元素也可以。
   !设为flex布局以后，子元素的float、clear和vertical-align属性将失效。
    .box {
      flex-direction: row | row-reverse | column | column-reverse;
    } 
    .box{
      flex-wrap: nowrap | wrap | wrap-reverse;
    }
    justify-content align-items

    item的属性：
    order: <integer>;
    flex-grow: <number>; /* default 0 */
    flex-shrink: <number>; /* default 1 */
    flex-basis: <length> | auto; /* default auto */
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
居中布局
预加载和懒加载 
event loop
   <!-- event loop 是一种程序结构，用于等待和发送消息和事件。 -->
微任务 和 宏任务
   宏任务（macro） task  
   script I/O
   setTimeout setInterval  postMessage  MessageChannel setImmediate 

   微任务 （micro） task
    Promise.then Object.observe MutaionObserver process.nextTick()

    宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
    
闭包 
eventbus

后端一次性返回大量数据？
1.懒加载+分页 
2.虚拟翻滚技能(节流)

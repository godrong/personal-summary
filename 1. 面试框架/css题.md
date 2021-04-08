
1.flex   http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
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


2. 居中布局
    .box{
      position: relative;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
    }
    .box{
      display: flex;
      justify-content: center;
      align-items: center;
    } 

// 实现instanceof
function instance_of (L,R){
    let prototype = R.prototype // 目标的原型对象
    while(true){
        if(L===null){
            return false
        }else if(L.__proto__ === prototype){ 
            return true 
        }
        L = L.__proto__ //取当前对象的原型对象 再一次循环判断
    }
}
function flatten(arr) {
    return arr.reduce((result,item)=>{
        return result.concat(Array.isArray(item) ? flatten(item) :item)
    },[])
}
flatten([1, [2, 3, [4, 5]]])
// 扁平化数组转tree
function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
  
      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }
  
      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }
  
      const treeItem =  itemMap[id];
  
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
  
    }
    return result;
  }
  

async await 原理 
把异步代码同步化
1. generator 函数
function *generator (){
    yield 1;
    yield 2;
    yield 3;
}


css三角形

    width: 0;
    height: 0;
    border-width: 0 40px 40px;
    border-style: solid;
    border-color: transparent transparent red;



    冒泡排序、 
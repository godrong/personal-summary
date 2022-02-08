// 1. 冒泡算法

function bubbleSort(arr) {
    var len = arr.length;
    for(var i=0;i<len -1; i++) {
        for (var j=0; j<len-1-i;j++){
            if(arr[j]>arr[j+1]) // 升序 ，长者在前，两两交换
            {
               var temp = arr[j];
               arr[j] = arr[j+1];
               arr[j+1] = temp;
            //    swap(arr[j],arr[j+1])
            }
        }
    }
    return arr;
}

// 2. 快速排序
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    // [arr[i],arr[j]] = [arr[j],arr[i]]
}
function quickSort (arr,left,right) {
    var len = arr.length,partitionIdx,
    left = typeof left != 'number' ? 0 : left,
    right = typeof right != 'number' ? len-1 : right;
    if( left < right) {
        partitionIdx = partition(arr,left,right);
        quickSort(arr,left,partitionIdx-1);
        quickSort(arr,partitionIdx+1,right);
    }
    return arr;
}
function partition (arr,left,right) {// 分区操作
    var pivot  = left, //基准点 可以设最左或者最右
        index = pivot + 1;
    for(var i = index; i <= right; i++) {
        if(arr[i] <arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }    
}
//3. 插入排序
function insertionSort(arr) {
    var len = arr.length;
    var orderlyTop,current;
    for (var i=1; i< len; i++) {// 外层循环 决定待插入值
        orderlyTop = i - 1; // 有序区上界
        current = arr[i]; // 待插入值 
        while(orderlyTop >= 0 && arr[orderlyTop] > current) { 
            //内层循环 在有序区中为待插入值腾出位置 只要比待插入值大 就腾出位置
            arr[orderlyTop + 1] = arr[orderlyTop]; 
            orderlyTop--;// continue loop 
        }
        arr[orderlyTop+1] = current; // insert element
    }
    return arr; 
}
// 4. 希尔排序
function shellSort(arr) {
    var len = arr.length,
    temp,
    gap = 1;
    while(gap < len/3) {
        gap = gap*3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) { //外层循环 减小间隙
        for (var i = gap; i< len; i++){
            temp = arr[i];
            for( var j = i-gap; j>=0 && arr[j] > temp; j-=gap) {// 内层循环 在有序区中为待插入值腾出位置 只要比待插入值大 就腾出位置
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;//插入值
        }
    }
}
// 2.2.3 习题
bool Del_Min(sqList &L, ElemType &value) {
    if(L.length == 0)
        return false;
    value = L.data[0];
    int pos = 0;
    for(int i =1; i<L.length; i++) 
        if(L.data[i]<value) {
            value = L.data[i];
            pos = i
        }
    L.data[pos] = L.data[L.length-1];
    L.length--
    return true         
}

void Reverse(sqList  &L) {
    ElemType temp;
    for(i=0;i<L.length/2;i++){
        temp = L.data[i]
        L.data[i] = L.data[L.length-i-1];
        L.data[L.length-i-1] = temp;
    }
}

// 2.7  合并顺序表
bool Merge(SeqList A,SeqList B,SeqList &C) {
    if(A.length+B.length > C.maxSize)
        return false;
    int i=0;j=0;k=0;
    while(i<A.length&&j<B.length){
        if(A.data[i]<=B.data[j]){
            C.data[k++] = A.data[i++];
        }
        else 
            C.data[k++] = B.data[j++];
    }
    while(i<A.length) 
        C.data[k++] = A.data[i++];
    while(j<B.length)
        C.data[k++] = B.data[j++];
    C.length = k;
    return false;         
}
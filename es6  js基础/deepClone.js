function cloneDeep(source, hash = new WeakMap()) {

    if (!isObject(source)) return source; 
    if (hash.has(source)) return hash.get(source); // 查哈希表
      
    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target); // 哈希表设值
    
    let symKeys = Object.getOwnPropertySymbols(source); // 查找
    if (symKeys.length) { // 查找成功   
        symKeys.forEach(symKey => {
            if (isObject(source[symKey])) {
                target[symKey] = cloneDeep(source[symKey], hash); // 传入哈希表
            } else {
                target[symKey] = source[symKey];
            }    
        });
    }
    
    for(let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = cloneDeep(source[key], hash); 
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
function demo (...args){
    let total = 0
    args.forEach((item)=>{
        total += item
    })
    console.log(total) // 10+20+30
}
demo(10,20,30)


let students =  ['wangring','lisan','liqin']
let [s1,...s2] = students 
console.log(s1) //"wangring"
console.log(s2) //Array ['lisan','liqin']
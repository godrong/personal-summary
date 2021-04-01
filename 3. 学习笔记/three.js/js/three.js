function Monkey (maxBanana,hasBanana,_pos,step,remain) {
    this.maxBanana = maxBanana;
    this.hasBanana =hasBanana;
    this._pos =_pos;
    this.step =step;
    this.remain =remain;
}
// 很多时候，我们需要手动利用constructor这个属性指回原来的构造函数
Monkey.prototype= {
    constructor:Monkey,
    left:function() {
        this._pos++,
        this.remain--,
        this.step--
    },
    right:function() {
        this._pos--,
        this.remain--,
        this.step++
    },
    getRemain:function() {
        console.log(this.remain)
        return this.remain 
    }
} 
var swk = new Monkey(50,50,0,0,100)
swk.left()
swk.getRemain()

// if(remain>50) { // 分多次搬运

// }
// else if (remain <=50) {
//     for(let i=0;i++;i<remain){
//         monkey.right
//     }
    
// }
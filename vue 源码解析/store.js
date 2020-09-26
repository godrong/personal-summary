//store 单例模式 
var store = {
    debug: true,
    state: {
      message: 'Hello!'
    },
    setMessageAction (newValue) {
      if (this.debug) console.log('setMessageAction triggered with', newValue)
      this.state.message = newValue
    },
    clearMessageAction () {
      if (this.debug) console.log('clearMessageAction triggered')
      this.state.message = ''
    }
  }
  //挂载到vue中
  var vm = new Vue ({
      data:store,
  })
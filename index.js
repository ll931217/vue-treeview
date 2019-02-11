const TreeView = {
  install(Vue, options) {
    Vue.mixin({
      mounted() {
        console.log('Mounted!')
        if (options.called) {
          console.log('Called!')
        }
      }
    })
  }
}

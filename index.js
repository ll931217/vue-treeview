import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TreeView from './treeview.vue'

library.add(fas)
library.add(fab)
library.add(far)

const Tree = {
  install(Vue) {
    Vue.component('tree-view', TreeView)
    Vue.component('fa', FontAwesomeIcon)
  }
}

export default Tree

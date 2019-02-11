import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusSquare,
  faMinusSquare,
  faTruckLoading
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TreeView from './treeview.vue'

library.add(faPlusSquare)
library.add(faMinusSquare)
library.add(faTruckLoading)

const Tree = {
  install(Vue) {
    Vue.component('tree-view', TreeView)
    Vue.component('fa', FontAwesomeIcon)
  }
}

export default Tree

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusSquare,
  faMinusSquare,
  faPlus,
  faMinus,
  faTruckLoading
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TreeView from './treeview.vue'

library.add(faPlusSquare)
library.add(faMinusSquare)
library.add(faPlus)
library.add(faMinus)
library.add(faTruckLoading)

const Tree = {
  install(Vue) {
    Vue.component('treeview', TreeView)
    Vue.component('fa', FontAwesomeIcon)
  }
}

export default Tree

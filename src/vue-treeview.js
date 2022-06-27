import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TreeView from './components/treeview.vue'

library.add(fab)
library.add(fas)
library.add(far)

export default {
  install: (app, options) => {
    app.component('tree-view', TreeView)
    app.component('fa', FontAwesomeIcon)
  }
}
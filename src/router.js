import { createWebHistory, createRouter } from 'vue-router'

import Default from './views/Default.vue'
import Rip from './views/Rip.vue'
import Machenzie from './views/Machenzie.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: Default
  },
  {
    path: '/d-ger-boxer-rip',
    name: 'd-ger-boxer-rip',
    component: Rip
  },
  {
    path: '/d-ger-boxer-machenzie',
    name: 'd-ger-boxer-machenzie',
    component: Machenzie
  },
  {
    path: '/templink',
    name: 'templink',
    component: () => import('./views/Templink.vue')
  }
]

export default new createRouter({
  routes,
  history: createWebHistory(),
})

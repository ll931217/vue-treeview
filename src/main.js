import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueTreeview from './vue-treeview'

const app = createApp(App)

app.use(VueTreeview)
app.use(router)

app.mount('#app')

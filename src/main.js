import Vue from 'vue'
import App from './App.vue'

import vueNewsScroll from './index.js'
Vue.use(vueNewsScroll)
new Vue({
  el: '#app',
  render: h => h(App)
})

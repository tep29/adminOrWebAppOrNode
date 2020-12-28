import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// admin
Vue.config.productionTip = false

import http from './http'

Vue.prototype.$http = http


Vue.mixin({
  computed: {
    mixinUploadUrl() {
      return http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    mixinGetAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})


console.log(process.env)
console.log(process.env.NODE_ENV)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

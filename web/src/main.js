import Vue from 'vue'
import App from './App.vue'
// app
Vue.config.productionTip = false



import './assets/scss/style.scss'


import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.min.css';

import './assets/iconfont/iconfont.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import Card from './components/Card.vue'
Vue.component('s-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('s-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/web/api"
  // baseURL: "http://localhost:3000/web/api"
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

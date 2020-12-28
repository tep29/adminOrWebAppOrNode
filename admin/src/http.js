import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }

    return config
}, error => {
    return Promise.reject(error)
})

// 拦截器
http.interceptors.response.use(response => {

    return response
}, error => {
    if (error.response.data.message) {
        Vue.prototype.$message.error({
            title: "error",
            message: error.response.data.message
        })
      
        if(error.response.status === 401) {
            router.push('/login')
        }
    }


    return Promise.reject(error)
})

export default http
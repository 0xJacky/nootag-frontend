import axios from 'axios'
import querystring from 'querystring'
import store from '../store'

// 创建 axios 实例
let http = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 50000,
    transformRequest: [function (data, headers) {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            return querystring.stringify(data)
        } else if (headers['Content-Type'] === 'multipart/form-data;charset=UTF-8') {
            return data
        } else {
            headers['Content-Type'] = 'application/json'
        }
        return data
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// http request 拦截器
http.interceptors.request.use(
    config => {
        config.headers.Accept = `application/prs.ibeta-api.v1+json`
        if (store.state.auth) {
            config.headers.Authorization = `Bearer ${store.state.auth.access_token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// response 拦截器
http.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        switch (error.response.status) {
            case 401:
            case 403:
                store.dispatch('logout')
                break
        }
        return Promise.reject(error.response.data)
    }
)
export default http

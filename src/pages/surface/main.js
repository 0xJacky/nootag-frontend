import Vue from 'vue'
import App from './App'
import store from '@/lib/store'
import api from './api'
import './lazy'
import '@/assets/css/dark.less'
import '@/assets/css/style.less'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import utils from '@/lib/utils'

Vue.prototype.$api = api
Vue.use(utils)

NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

new Vue({
    render: h => h(App),
    router: router,
    store
}).$mount('#app')

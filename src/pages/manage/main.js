import Vue from 'vue'
import App from './App'
import store from '@/lib/store'
import api from '~/manage/api'
import './lazy'
import '@/assets/css/dark.less'
import '@/assets/css/style.less'
import '@/assets/css/manage.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import utils from '@/lib/utils'
import router from './router'

Vue.use(utils)

Vue.prototype.$api = api

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

import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('./layouts/BaseLayout'),
            redirect: '/landing',
            children: [
                {
                    path: '/landing',
                    component: () => import('./views/other/Landing'),
                    name: '首页'
                },
                {
                    path: '/post/:search',
                    component: () => import('./views/other/Post'),
                    name: '文章'
                },
                {
                    path: '/about',
                    component: () => import('./views/page/About'),
                    name: '关于'
                },
            ]
        },
        {
            path: '/404',
            name: '404页面',
            component: () => import('./views/other/Error')
        },
        {
            path: '*',
            name: '未找到页面',
            redirect: '/404'
        }
    ]
})

Vue.use(VueAnalytics, {
    id: 'UA-144975497-1',
    debug: {
        sendHitTask: process.env.NODE_ENV === 'production'
    },
    router
})

export default router

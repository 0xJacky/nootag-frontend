import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('./layouts/BaseLayout'),
            children: [
                {
                    path: '/home',
                    // component: Home,
                    name: '首页'
                },
                {
                    path: '/topic/:id',
                    component: () => import('./views/topic/Topic'),
                    name: '分类'
                },
                {
                    path: '/post/:search',
                    component: () => import('./views/other/Post'),
                    name: '文章'
                },
                {
                    path: '/apple',
                    component: () => import('./views/firmware/Main'),
                    name: '固件下载中心'
                },
                {
                    path: '/donate',
                    component: () => import('./views/page/Donate'),
                    name: '捐助'
                },
                {
                    path: '/about',
                    component: () => import('./views/page/About'),
                    name: '关于'
                },
                {
                    path: '/install/:url',
                    component: () => import('./views/Install'),
                    name: '安装描述文件'
                }
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

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/lib/store'
import axios from 'axios'

const BaseRouterView = () => import('./layouts/BaseRouterView')

Vue.use(Router)

export const routes = [
    {
        path: '/',
        component: () => import('./layouts/BaseLayout'),
        redirect: 'dashboard',
        name: '首页',
        children: [
            {
                path: 'dashboard',
                component: () => import('./views/dashboard/Dashboard'),
                name: 'DashBoard',
                icon: 'home',
                meta: {hiddenHeaderContent: true}
            },
            {
                path: 'user',
                name: '用户管理',
                icon: 'user',
                component: () => import('./views/user/List')
            },
            {
                path: 'post',
                component: BaseRouterView,
                name: '文章管理',
                icon: 'form',
                redirect: '/post/list',
                children: [
                    {
                        path: 'add',
                        component: () => import('./views/post/Edit'),
                        name: '写文章'
                    },
                    {
                        path: 'list',
                        component: () => import('./views/post/ListPost'),
                        name: '所有文章'
                    },
                    {
                        path: 'category',
                        component: () => import('./views/post/Category'),
                        name: '文章分类'
                    },
                    {
                        path: ':id',
                        component: () => import('./views/post/Edit'),
                        name: '编辑文章',
                        hidden: true
                    }
                ]
            },
            {
                path: 'media',
                name: '媒体管理',
                component: () => import('./views/media/Gallery'),
                icon: 'cloud'
            },
            {
                path: 'about',
                component: () => import('./views/other/About'),
                name: '关于',
                icon: 'info-circle'
            }
        ]
    },
    {
        path: '/login',
        name: '用户登录',
        component: () => import('./views/other/Login'),
        meta: {noAuth: true}
    },
    {
        path: '/403',
        name: '403 Forbidden',
        component: () => import('./views/other/Error'),
        meta: {noAuth: true, status_code: 403, error: 'Forbidden'}
    },
    {
        path: '/404',
        name: '404 Not Found',
        component: () => import('./views/other/Error'),
        meta: {noAuth: true, status_code: 404, error: 'Not Found'}
    },
    {
        path: '*',
        name: '未找到页面',
        redirect: '/404',
        meta: {noAuth: true}
    }
]

const router = new Router({routes})

router.beforeEach((to, from, next) => {
    document.title = 'nootag 无派科技 | ' + to.name

    if (process.env.NODE_ENV === 'production') {
        axios.get('/version.json?' + Date.now()).then(r => {
            if (!(process.env.VUE_APP_VERSION === r.data.version
                && Number(process.env.VUE_APP_BUILD_ID) === r.data.build_id)) {
                Vue.prototype.$info({
                    title: '系统信息',
                    content: '检测到版本更新，将会自动刷新本页',
                    onOk() {
                        location.reload()
                    },
                    okText: '好的'
                })
            }
        })
    }

    if (to.meta.noAuth || store.getters.isLogin) {
        next()
    } else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
})

export default router

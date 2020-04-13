<template>
    <div class="header">
        <logo/>
        <div class="user-wrapper" v-if="$store.getters.isLogin">
            <notice-icon />
            <user-avatar-popover />
        </div>
        <div class="user-wrapper" v-else>
            <a-button type="primary" @click="login" ghost>登录</a-button>
        </div>
        <a-menu v-model="current" mode="horizontal">
            <a-menu-item key="/" @click="$router.push('/').catch(()=>{})">
                <a-icon type="home" />
                首页
            </a-menu-item>
            <a-menu-item key="/donate" @click="$router.push('/donate').catch(()=>{})">
                <a-icon type="red-envelope"/>
                捐助
            </a-menu-item>
            <a-menu-item key="/about" @click="$router.push('/about').catch(()=>{})">
                <a-icon type="heart"/>
                关于
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    import UserAvatarPopover from '@/components/UserAvatarPopover'
    import NoticeIcon from '@/components/NoticeIcon/NoticeIcon'
    import Logo from '@/components/Logo/Logo'

    export default {
        name: 'HeaderComponent',
        components: {
            Logo,
            UserAvatarPopover,
            NoticeIcon
        },
        computed: {
            current: {
                get() {
                    return [this.$route.path]
                },
                set(val) {
                    return val
                }
            }
        },
        methods: {
            login() {
                window.location.replace('/user.html#/login')
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        height: 64px;
        padding: 0 200px;
        background: #fff;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid #e8e8e8;
        @media (prefers-color-scheme: dark) {
            background: #28292c;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            border-bottom: unset;
        }
        position: fixed;
        width: 100%;
    }

    .logo {
        position: fixed;
        left: 20px;
    }

    .user-wrapper {
        position: fixed;
        right: 20px;
    }

    .ant-menu-horizontal {
        line-height: 62px;
        border-bottom: none;
    }
</style>

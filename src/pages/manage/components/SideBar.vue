<template>
    <div class="sidebar">
        <logo/>
        <a-menu
            mode="inline"
            :openKeys="openKeys"
            @openChange="onOpenChange"
        >
            <template v-for="sidebar in visible(sidebars)">
                <a-menu-item :key="sidebar.path" v-if="!sidebar.children"
                             @click="$router.push('/'+sidebar.path).catch(() => {})">
                    <a-icon :type="sidebar.icon"/>
                    <span>{{ sidebar.name }}</span>
                </a-menu-item>

                <a-sub-menu v-else :key="sidebar.path">
                    <span slot="title"><a-icon :type="sidebar.icon"/><span>{{ sidebar.name }}</span></span>
                    <a-menu-item v-for="child in visible(sidebar.children)" :key="child.name">
                        <router-link :to="'/'+sidebar.path+'/'+child.path">
                            {{ child.name }}
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>

<script>
    import {routes} from '../router'
    import Logo from '@/components/Logo/Logo'

    const sidebars = routes[0]['children']
    const rootSubmenuKeys = []

    sidebars.forEach(function (element) {
        rootSubmenuKeys.push(element)
    })

    export default {
        name: 'SideBar',
        components: {Logo},
        data() {
            return {
                rootSubmenuKeys,
                openKeys: [],
                sidebars,
            }
        },
        methods: {
            onOpenChange(openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : []
                }
            },
            visible(sidebars) {
                return sidebars.filter(c => {
                    return !c.hidden
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .ant-layout-sider-collapsed .logo {
        width: 48px;
        overflow: hidden;
    }

    .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
        border-right: unset;
    }

</style>

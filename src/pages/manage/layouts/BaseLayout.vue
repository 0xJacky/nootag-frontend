<template>
    <a-locale-provider :locale="zh_CN">
        <a-layout style="min-height: 100%;">
            <a-drawer
                v-if="clientWidth<512"
                placement="left"
                :closable="false"
                :visible="collapsed"
                @close="collapsed=false"
            >
                <side-bar/>
            </a-drawer>

            <a-layout-sider
                v-else
                theme="light"
                :collapsible="true"
                v-model="collapsed"
                :style="{zIndex: 10}"
            >
                <side-bar/>
            </a-layout-sider>

            <a-layout>
                <a-layout-header :style="{position: 'fixed', zIndex: 10, width:'100%'}">
                    <header-component @clickUnFold="collapsed=true"/>
                </a-layout-header>

                <a-layout-content>
                    <page-header :title="$route.name"/>
                    <div class="router-view">
                        <router-view/>
                    </div>
                </a-layout-content>

                <a-layout-footer>
                    <footer-component/>
                </a-layout-footer>
            </a-layout>

        </a-layout>
    </a-locale-provider>
</template>

<script>
    import HeaderComponent from '~/manage/components/HeaderComponent'
    import SideBar from '~/manage/components/SideBar'
    import FooterComponent from '~/manage/components/FooterComponent'
    import PageHeader from '~/manage/components/PageHeader/PageHeader'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

    export default {
        name: 'BaseLayout',
        data() {
            return {
                collapsed: this.collapse(),
                zh_CN,
                clientWidth: document.body.clientWidth
            }
        },
        mounted() {
            window.onresize = () => {
                this.collapsed = this.collapse()
                this.clientWidth = this.getClientWidth()
            }
        },
        components: {
            SideBar,
            HeaderComponent,
            PageHeader,
            FooterComponent
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .ant-layout-content {
        margin: 64px 0;
        min-height: auto;

        .router-view {
            padding: 20px;
            @media (max-width: 512px) {
                padding: 20px 0;
            }
            position: relative;
        }
    }
</style>

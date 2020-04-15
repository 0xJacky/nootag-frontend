<template>
    <a-config-provider :locale="zh_CN">
        <a-layout style="min-height: 100%;">
            <a-layout-content>
                <a-row>
                    <a-col :xs="24" class="col">
                        <router-view/>
                    </a-col>
                </a-row>
            </a-layout-content>

            <a-layout-footer>
                <footer-component/>
            </a-layout-footer>
        </a-layout>
    </a-config-provider>
</template>

<script>
    import FooterComponent from '~/surface/components/FooterComponent'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

    export default {
        name: 'BaseLayout',
        components: {
            FooterComponent
        },
        data() {
            return {
                zh_CN
            }
        }
    }
</script>

<style lang="less">

</style>

<style lang="less" scoped>
    .ant-layout {
        background-color: #fafafa;
        @media (prefers-color-scheme: dark) {
            background-color: #1e1f20;
        }
    }

    .ant-layout-header {
        padding: 0;
    }

    .ant-layout-content {
        margin: 100px 0;
        min-height: auto;
    }

    .ant-row {
        margin: 0 auto;
    }

</style>

<template>
    <a-card>
        <h2>
            nootag 无派科技管理系统<br>
        </h2>
        <p>Version: {{ version }}-{{ build_id }}</p>
        <p>Designer: <a href="https://jackyu.cn/" target="_blank">@0xJacky</a></p>
        <h3>技术栈</h3>
        <p>Vue</p>
        <p>Vuex</p>
        <p>Laravel</p>
        <p>Ant Design Vue</p>
        <p>Std design v0.1</p>
        <p>WebSocket</p>
        <p>© 2017 - {{ this_year }} 0xJacky </p>
    </a-card>
</template>

<script>
    export default {
        name: 'About',
        data() {
            const date = new Date()
            return {
                this_year: date.getFullYear(),
                version: process.env.VUE_APP_VERSION,
                build_id: process.env.VUE_APP_BUILD_ID ? process.env.VUE_APP_BUILD_ID : 'dev'
            }
        }
    }
</script>

<style scoped>

</style>

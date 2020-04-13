<template>
    <div class="logo">
        <a-avatar
            :src="logo"
            alt="avatar"
            :size="48"
        />
        <div class="text">尝鲜派</div>
        <div class="clear"></div>
    </div>
</template>

<script>
    export default {
        name: 'Logo',
        data() {
            return {
                logo: require('@/assets/img/logo.png')
            }
        }
    }
</script>

<style lang="less" scoped>
    .logo {
        margin: 8px 18px;
        border-bottom: 1px solid #e8e8e8;
        transition: all 0.3s;
        height: 56px;
        overflow: hidden;
        display: inline-block;

        .ant-avatar {
            float: left;
            margin: 0 10px 0 0;
        }

        .text {
            float: left;
            font-weight: 300;
            font-size: 24px;
            line-height: 48px;
            height: 48px;
            display: inline-block;
        }
    }
</style>

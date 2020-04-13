<template>
    <post-page :post="post" />
</template>

<script>
    import PostPage from '~/surface/components/PostPage/PostPage'

    export default {
        name: 'About',
        components: {
            PostPage
        },
        data() {
            return {
                post: {}
            }
        },
        created() {
            this.$api.surface.about().then(r => {
                this.post = r
            })
        }
    }
</script>

<style lang="less" scoped>

</style>

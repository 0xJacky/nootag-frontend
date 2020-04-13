<template>
    <post-page :post="post"/>
</template>

<script>
    import PostPage from '~/surface/components/PostPage/PostPage'

    export default {
        name: 'Post',
        components: {
            PostPage
        },
        data() {
            return {
                post: {}
            }
        },
        created() {
            this.scrollPosition.goTop()
            this.get()
        },
        watch: {
            '$route'() {
                this.get()
            }
        },
        methods: {
            get() {
                this.$api.post.get(this.$route.params.search).then(r => {
                    this.post = r
                }).catch(() => {
                    this.$router.push('/404')
                })
            }
        }
    }
</script>

<style scoped>

</style>

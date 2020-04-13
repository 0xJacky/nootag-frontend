<template>
    <a-row>
        <a-col :xs="0" :sm="1">
            <user-avatar :url="$store.state.user.avatar"/>
        </a-col>
        <a-col :xs="24" :sm="20">
            <a-textarea :placeholder="placeholder" v-model="content"/>
        </a-col>
        <a-col :xs="24" :sm="1" :offset="1">
            <a-button @click="store">发布评论</a-button>
        </a-col>
    </a-row>
</template>

<script>
    import UserAvatar from '@/components/UserAvatar'

    const placeholder = '请遵守互联网的相关政策和法规，严禁发布色情、反动、暴力的言论。'

    export default {
        name: 'CommentEditor',
        components: {UserAvatar},
        props: {
            comment: Object,
            post_id: Number
        },
        data() {
            return {
                placeholder: placeholder,
                content: null,
                form: null
            }
        },
        created() {
            this.buildPlaceholder()
        },
        watch: {
            comment() {
                this.buildPlaceholder()
            }
        },
        methods: {
            buildPlaceholder() {
                this.placeholder = this.comment ? '回复 @' + this.comment.author + ':' : placeholder
            },
            store() {
                if (!this.content) {
                    this.$message.error('评论不能为空噢')
                    return;
                }
                this.form = {
                    post_id: this.post_id,
                    content: this.content
                }
                if (this.comment) {
                    this.form['parent_id'] = this.comment.id
                    this.form['root_id'] = this.comment.root_id ? this.comment.root_id : this.comment.id
                }
                this.$api.comment.store(this.form).then(() => {
                    this.$emit('saved')
                    this.$message.success('发布成功')
                    this.content = null
                })
            }
        }
    }
</script>

<style scoped>

</style>

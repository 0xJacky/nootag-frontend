<template>
    <a-row class="post-page">
        <a-col>
            <a-card :bordered="false">
                <h1 class="title" v-if="post.title">{{ post.title }}</h1>
                <vue-markdown class="post-content" :source="post.content" v-if="post.content"/>
                <slot name="post"/>
                <favour type="post" :post="post" v-if="showFavour"/>
            </a-card>

            <a-card :bordered="false" v-if="post.allow_comment===1">
                <h2>{{ post.comments_amount }} 评论</h2>
                <comment-editor :post_id="post.id" @saved="savedComment"/>
                <a-tabs defaultActiveKey="hot" v-model="sort" @change="r => {get_comment(1, r)}">
                    <a-tab-pane tab="按热度排序" key="hot" />
                    <a-tab-pane tab="按时间排序" key="time"/>
                </a-tabs>
                <comment :comment="comment" v-for="comment in post.comments" :key="comment.id" :sort="sort"
                         @savedComment="savedComment"/>
                <std-pagination :pagination="pagination" @changePage="get_comment"/>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
    import VueMarkdown from '~/surface/plugins/VueMarkdown'
    import Favour from '~/surface/components/Favour/Favour'
    import Comment from '~/surface/components/Comment/Comment'
    import CommentEditor from '~/surface/components/Comment/CommentEditor'
    import StdPagination from '~/manage/components/StdDataDisplay/StdPagination'

    export default {
        name: 'PostPage',
        components: {StdPagination, CommentEditor, Comment, Favour, VueMarkdown},
        props: {
            post: {
                type: Object,
                default() {
                    return {}
                }
            },
            showFavour: {
                type: Boolean,
                default: true
            },
        },
        model: {
            prop: 'post',
            event: 'changePost'
        },
        data() {
            return {
                pagination: this.post.pagination ? this.post.pagination : {},
                sort: 'hot'
            }
        },
        methods: {
            get_comment(page = 1, sort = 'hot') {
                this.$api.comment.get_root(this.post.id, page, sort).then(r => {
                    this.post.comments = r.comments
                    this.pagination = r.pagination
                })
            },
            savedComment() {
                this.get_comment(1, 'time')
                this.post.comments_amount++
            }
        }
    }
</script>

<style lang="less">
    @import "post-content";

    .post-page .title {
        padding: 10px 0;
        font-weight: 300;
    }
</style>

<style lang="less" scoped>
    .ant-card {
        margin: 0 0 40px 0;
        box-shadow: 0 0 30px rgba(200, 200, 200, 0.25);

        h2 {
            font-weight: 300;
            padding: 0 0 10px 0;
        }
    }
</style>

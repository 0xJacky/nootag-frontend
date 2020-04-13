<template>
    <a-comment class="comment">
        <a slot="author">{{ comment.author }}</a>
        <user-avatar :url="comment.avatar" slot="avatar"/>
        <div slot="content">
            <p><span v-if="comment.at && comment.root_id !== comment.parent_id">@{{ comment.at }}:</span>{{
                comment.content }}</p>
        </div>
        <comment-editor v-if="showEditor" :comment="replyComment"
                        :post_id="comment.post_id"
                        @saved="()=>{if(isChild){$emit('savedComment')}else{this.showEditor=false;get_children(comment.root_id ? comment.root_id : comment.id, 1, 'time')}}"/>
        <template slot="actions">
            <favour type="comment" :post="comment"/>
            <span @click="handleEditorShow(comment)">回复</span>
        </template>
        <span slot="datetime">
            {{ moment(comment.created_at).fromNow() }}
            <template v-if="show_id">{{ '#'+comment.id }}</template>
        </span>
        <comment :comment="child" v-for="child in comment.children" :key="child.id" :is-child="true" :show_id="show_id"
                 @showEditor="handleEditorShow" :sort="sort" @savedComment="get_children(comment.id, 1, 'time')"/>
        <span v-if="!isChild&&comment.comments_count>3&&moreLink" class="more-link">
            共<strong>{{ comment.comments_count }}</strong>条评论, <span class="action" @click="get_children(comment.id)">查看全部</span>
        </span>
        <std-pagination :pagination="pagination" @changePage="page => {get_children(comment.id, page)}" size="small"/>
    </a-comment>
</template>

<script>
    import moment from 'moment'
    import Favour from '~/surface/components/Favour/Favour'
    import UserAvatar from '@/components/UserAvatar'
    import StdPagination from '~/manage/components/StdDataDisplay/StdPagination'
    import CommentEditor from '~/surface/components/Comment/CommentEditor'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'Comment',
        components: {CommentEditor, StdPagination, UserAvatar, Favour},
        props: {
            comment: {
                type: Object,
                default() {
                    return {}
                }
            },
            isChild: Boolean,
            show_id: {
                type: Boolean,
                default: false
            },
            sort: {
                validator: function (value) {
                    return ['hot', 'time'].indexOf(value) !== -1
                },
                default: 'hot'
            }
        },
        model: {
            prop: 'comment',
            event: 'changeComment'
        },
        data() {
            return {
                moment,
                pagination: {},
                showEditor: false,
                replyComment: null,
                moreLink: true
            }
        },
        created() {
            this.pagination = this.comment.pagination ? this.comment.pagination : {}
        },
        watch: {
            comment() {
                this.pagination = this.comment.pagination ? this.comment.pagination : {}
            }
        },
        methods: {
            get_children(id, page = 1, sort = this.sort) {
                this.showEditor = false
                this.moreLink = false
                this.$api.comment.get_children(id, page, sort).then(r => {
                    this.comment.children = r.comments
                })
            },
            handleEditorShow(comment) {
                this.replyComment = comment
                this.showEditor = true
            }
        }
    }
</script>

<style lang="less">
    .comment .pagination {
        float: left;
    }
</style>

<style lang="less" scoped>
    .more-link {
        font-size: 13px;

        .action {
            cursor: pointer;
            color: #1890ff;
        }
    }

</style>

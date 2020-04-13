<template>
    <div class="comment">
        <a-modal
            title="发布评论"
            :visible="visible"
            :closable="true"
            :centered="true"
            :footer="null"
            :z-index="2100"
            @cancel="visible=false"
        >
            <CommonEditor
                :id="id"
                module="comment"
                :in-comment="true"
                ref="ce"
                :replyto="user_id"
                :parent="comment_id"
                :in-gallery="!!gallery_id"
                :in-feedback="!!feedback_id"
                :in-post="!!post_id"
                @get_list="get_list"
            />
        </a-modal>
        <a-modal
            :visible="previewVisible"
            :z-index="2101"
            :footer="null"
            @cancel="previewVisible=false"
        >
            <img
                style="width: 100%"
                :src="previewImage"
            >
        </a-modal>

        <CommonEditor
            :id="id"
            ref="ce"
            module="comment"
            :in-gallery="gallery_id ? true: false"
            :in-feedback="feedback_id ? true:false"
            :in-post="post_id ? true:false"
            :autoload="autoload"
            @get_list="get_list"
        />

        <p
            v-if="Object(comments).length == 0 && !loading"
            style="text-align: center"
        >
            评论区空空如也
        </p>

        <comment-block
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
        />

        <a-pagination
            v-if="total_page > 1"
            :default-current="1"
            :default-page-size="5"
            :total="total"
            :current="page"
            size="small"
            class="pagination"
            @change="get_list"
        />

    </div>
</template>

<script>
    import moment from 'moment'
    import CommonEditor from '../CommonEditor'
    import CommentBlock from './CommentItem'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'Comment_',
        components: {
            CommentBlock,
            CommonEditor
        },
        props: {
            id: Number,
            autoLoad: {
                type: Boolean,
                default: true
            },
            module: {
                validator: function (value) {
                    return ['post', 'comment'].indexOf(value) !== -1
                }
            }
        },
        data() {
            return {
                moment,
                comments: [],
                pagination: {},
                visible: false,
                previewImage: '',
                previewVisible: false
            }
        },
        created() {
            if (this.autoLoad) {
                this.get_list()
            }
        },
        methods: {
            get_list(page = 1) {
                this.loading = true
                this.visible = false
            },
            preview_img(url) {
                this.previewImage = url
                this.previewVisible = true
            },
            do_comment(commentId = '', userId = '') {
                if (!this.$store.getters.isLogin) {
                    this.$message.info('请先登录噢')
                }
                this.visible = true
                this.comment_id = commentId
                this.user_id = userId
            }
        }
    }
</script>

<style lang="less" scoped>
    .save {
        text-align: right;
    }

    .ant-divider-horizontal {
        margin: 12px 0;
    }

</style>

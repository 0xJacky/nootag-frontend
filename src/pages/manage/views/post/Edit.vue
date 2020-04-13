<template>
    <div>
        <a-row>
            <a-col>
                <a-card :title="!!$route.params.id ? '修改文章 ID: ' + $route.params.id : '写文章'" class="article_editor"
                        style="margin: 0 0 30px 0">
                    <std-editor
                        v-model="post"
                        :upload_api="upload_api"
                        :upload_api_delete="upload_api_delete"
                        @save="save"
                    />
                </a-card>
            </a-col>
        </a-row>

        <a-row>
            <a-col :sm="24" :md="16" :lg="18">
                <a-card title="设置" class="post-settings">
                    <std-data-entry
                        :data-list="modify" :data-source="post" :error="error"
                        style="max-width: 300px" ref="std_data_entry"
                    />
                </a-card>
            </a-col>

            <a-col :sm="24" :md="8" :lg="6">
                <a-card title="统计" v-if="post.id">
                    <p v-for="(v,k) in readonly" :key="k">{{ v + ': ' + post[k] }}</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import StdDataEntry from '~/manage/components/StdDataEntry/StdDataEntry'
    import category_columns from '~/manage/views/post/category_columns'
    import category from '~/manage/api/category'
    import topic from '~/manage/api/topic'
    import topic_columns from '~/manage/views/topic/topic_columns'
    import post from '~/manage/api/post'
    import StdEditor from '~/manage/components/StdEditor/StdEditor'

    const readonly = {
        author: '作者',
        comments_amount: '评论数',
        visits: '浏览量',
        likes: '点赞',
        dislikes: '点踩'
    }

    const modify = [{
        dataIndex: 'post_name',
        title: '文章别名',
        edit: {
            type: 'input'
        }
    }, {
        dataIndex: 'category_id',
        title: '分类',
        edit: {
            type: 'selector',
            api: category,
            columns: category_columns,
            data_key: 'data',
            pagination_method: 'b'
        }
    }, {
        dataIndex: 'topic_id',
        title: '话题',
        edit: {
            type: 'selector',
            api: topic,
            columns: topic_columns,
            data_key: 'data',
            pagination_method: 'b'
        }
    }, {
        dataIndex: 'banner',
        title: '文章头图 Banner',
        edit: {
            type: 'upload',
            api: post.upload_banner
        }
    }, {
        dataIndex: 'post_status',
        title: '文章状态',
        edit: {
            type: 'select'
        },
        mask: {
            0: '草稿',
            1: '审核',
            2: '正常'
        }
    }, {
        dataIndex: 'post_type',
        title: '文章类型',
        edit: {
            type: 'select'
        },
        mask: {
            post: '官方文章',
            contribution: '用户投稿'
        }
    }, {
        dataIndex: 'allow_comment',
        title: '评论状态',
        edit: {
            type: 'select'
        },
        mask: {
            0: '禁止',
            1: '允许'
        }
    }, {
        dataIndex: 'push',
        title: '推送',
        edit: {
            type: 'select'
        },
        mask: {
            0: '否',
            1: '是'
        }
    }]

    export default {
        name: 'Edit',
        components: {
            StdEditor,
            StdDataEntry
        },
        data() {
            return {
                loading: false,
                categories: {},
                modify,
                readonly,
                post: {
                    id: null
                },
                upload_api: this.$api.post.upload_images,
                upload_api_delete: this.$api.post.delete_image,
                error: {}
            }
        },
        created() {
            this.get()
        },
        watch: {
            '$route'() {
                this.get()
            }
        },
        methods: {
            get() {
                if (this.$route.params.id) {
                    this.$api.post.get(this.$route.params.id).then(r => {
                        this.post = r
                    }).catch(() => {
                        this.$message.error('服务器错误')
                    })
                } else {
                    this.post = {}
                }
            },
            save() {
                this.$api.post.save(this.post.id, this.post).then(r => {
                    this.post = r
                    const t = this.$refs.std_data_entry.$refs.std_upload_banner[0]
                    if (t) {
                        t.upload()
                    }
                    this.$message.success('保存成功')
                }).catch(r => {
                    this.$message.error('无法保存')
                    this.error = r.errors
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .post-settings {
        margin: 0 15px 10px 0;
        @media (max-width: 768px) {
            margin: 0 0 20px 0;
        }
    }

</style>

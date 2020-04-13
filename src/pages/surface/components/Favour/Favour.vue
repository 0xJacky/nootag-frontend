<template>
    <span class="favour center" v-if="post.id">
        <span class="action">
          <a-tooltip title="赞">
            <a-icon type="like" :theme="post.favour_status === 1 ? 'filled' : 'outlined'" @click="store(post.id, 1)"
            />
          </a-tooltip>
          <span class="count">
            {{ post.likes }}
          </span>
        </span>
        <span class="action">
          <a-tooltip title="踩">
            <a-icon type="dislike" :theme="post.favour_status === 0 ? 'filled' : 'outlined'" @click="store(post.id, 0)"
            />
          </a-tooltip>
          <span class="count">
            {{ post.dislikes }}
          </span>
        </span>
        <span class="action" v-if="$slots['comments_count']">
            <a-icon type="message"/>
            <span class="count">
                <slot name="comments_count"/>
            </span>
        </span>
    </span>
</template>

<script>
    export default {
        name: 'Favour',
        props: {
            post: {
                type: Object,
                default() {
                    return {}
                }
            },
            type: {
                validator: function (value) {
                    return ['post', 'comment'].indexOf(value) !== -1
                }
            },
            current_favour_status: Object
        },
        model: {
            prop: 'post',
            event: 'changePost'
        },

        methods: {
            store(id, is_like) {
                if (!this.$store.getters.isLogin) {
                    this.$message.info('请先登录噢')
                }
                if (this.post.favour_status !== null && this.post.favour_status === is_like) {
                    this.destroy(id)
                } else {
                    let data = {}
                    if (this.type === 'post') {
                        data['post_id'] = id
                    } else {
                        data['comment_id'] = id
                    }
                    data['is_like'] = is_like
                    this.$nextTick(() => {
                        this.$api.favour.store(data).then(r => {
                            this.post.favour_status = is_like
                            for (const k in r) {
                                this.post[k] = r[k]
                            }
                            this.$message.success('操作成功')
                        }).catch(() => {
                            this.$message.error('服务器错误')
                        })
                    })
                }
            },
            destroy(id) {
                let data = {}
                if (this.type === 'post') {
                    data['post_id'] = id
                } else {
                    data['comment_id'] = id
                }
                this.$nextTick(() => {
                    this.$api.favour.destroy(data).then(r => {
                        this.post.favour_status = null
                        for (const k in r) {
                            this.post[k] = r[k]
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .favour {
        .action {
            padding: 10px 10px 0 0;
            cursor: pointer;

            .count {
                padding-left: 3px;
            }
        }
    }
</style>

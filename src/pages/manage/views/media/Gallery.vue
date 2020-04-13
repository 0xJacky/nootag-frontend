<template>
    <div>
        <a-card title="媒体管理" :bordered="false">
            <std-data-entry :data-list="query" v-model="params" layout="inline">
                <a-button type="primary" slot="action" @click="get_list">查询</a-button>
            </std-data-entry>
        </a-card>
        <a-row>
            <a-col
                class="img-col"
                :xs="4" :sm="4" :md="3" :lg="3" :xl="2"
                v-for="media in medias" :key="media.id">
                <div class="img-container">
                    <a href="javascript:;" @click="get(media.id)">
                        <img class="image" :src="media.url" v-if="media.mime_type.indexOf('image')!==-1"/>
                        <a-icon type="file" class="attachment center" v-else/>
                    </a>
                </div>
            </a-col>
        </a-row>
        <std-pagination :pagination="pagination" @changePage="changePage"/>
        <a-modal
            title="查看媒体"
            :visible="visible"
            ok-text="好的"
            cancel-text="取消"
            :mask="false"
            @cancel="visible=false"
        >
            <img class="img-view" :src="media.url" v-if="media.mime_type && media.mime_type.indexOf('image')!==-1"/>
            <a-icon type="file" class="attachment-view center" v-else/>
            <a-divider/>
            <p>文件名: {{ media.name }}</p>
            <p>文件大小: {{ bytesToSize(media.size) }}</p>
            <p>文件类型: {{ media.mime_type }}</p>
            <p>上传时间: {{ media.created_at }}</p>
            <p>上传者:
                <router-link :to="'/user/'+media.user_id + '/edit'">{{ media.user }}</router-link>
            </p>
            <p>管理:
                <a-popconfirm
                    title="你确定要删除?"
                    @confirm="destroy(media.id)" okText="是的"
                    cancelText="再想想"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
            </p>
        </a-modal>
    </div>
</template>

<script>
    import StdDataEntry from '~/manage/components/StdDataEntry/StdDataEntry'
    import user from '~/manage/api/user'
    import user_columns from '~/manage/views/user/user_colums'
    import StdPagination from '~/manage/components/StdDataDisplay/StdPagination'

    const query = [{
        title: '用户 ID',
        dataIndex: 'user_id',
        edit: {
            type: 'selector',
            api: user,
            columns: user_columns,
            pagination_method: 'a',
            data_key: 'users'
        }
    }, {
        title: '文件类型',
        dataIndex: 'mime_type',
        mask: {
            image: '图片',
            application: '附件'
        },
        edit: {
            type: 'select',

        }
    }]

    export default {
        name: 'Gallery',
        components: {StdPagination, StdDataEntry},
        data() {
            return {
                params: {},
                query,
                medias: [],
                pagination: {},
                visible: false,
                media: {},
                page: 1
            }
        },
        created() {
            this.get_list()
        },
        methods: {
            changePage(page) {
                this.params['page'] = page
                this.page = page
                this.$nextTick(() => {
                    this.get_list()
                })
            },
            get_list() {
                this.$api.media.get_list(this.params).then(r => {
                    this.medias = r.data
                    this.pagination = {
                        total: r.total,
                        per_page: r.per_page,
                        current_page: r.current_page,
                        total_pages: r.last_page
                    }
                })
            },
            get(id) {
                this.$api.media.get(id).then(r => {
                    this.visible = true
                    this.media = r
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            },
            destroy(id) {
                this.$api.media.destroy(id).then(() => {
                    this.visible = false
                    this.$message.success('删除成功')
                    this.get_list()
                }).catch(() => {
                    this.$message.error('删除失败')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .std-data-entry {
        float: left;
    }

    .ant-card {
        margin-bottom: 15px;
    }

    .img-col {
        box-shadow: inset 0 0 15px rgba(0, 0, 0, .1), inset 0 0 0 1px rgba(0, 0, 0, .05);
        padding: 3px;
        margin: 5px;

        .img-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;

            .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .attachment {
                position: absolute;
                bottom: 50%;
                transform: translate(50%, 50%);
                right: 50%;
                font-size: 30px;
            }
        }
    }

    .img-view {
        display: flex;
        margin: 0 auto;
        max-width: 400px;
    }

    .attachment-view {
        font-size: 100px;
    }


</style>

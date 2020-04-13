<template>
    <div>
        <a-card title="说明">
            <h3>权限说明</h3>
            <p>10 捐助管理 | 设置 | 网站反馈</p>
            <p>8 完全的用户管理</p>
            <p>6 编辑用户 | 文章管理 | 话题管理 | 评论管理</p>
            <p>4 卡片管理</p>
            <p>2 可访问管理系统 | Dashboard</p>
            <p>1 系统保留</p>
            <p>0 普通用户</p>
            <a href="javascript:;" @click="cache">刷新缓存</a>
        </a-card>

        <std-curd
            :api="api"
            :columns="columns"
            :disable_search="true"
        />
    </div>
</template>

<script>
    import StdCurd from '~/manage/components/StdDataDisplay/StdCurd'
    import group_columns from './group_columns'

    export default {
        name: 'Group',
        components: {
            StdCurd
        },
        data() {
            return {
                api: this.$api.user_group,
                columns: group_columns,
            }
        },
        methods: {
            cache() {
                this.$api.user_group.cache().then(r => {
                    this.$message.success('缓存于: ' + r.cached_at)
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            }
        }
    }
</script>

<style scoped>
    .ant-card {
        margin: 0 0 30px 0;
    }
</style>

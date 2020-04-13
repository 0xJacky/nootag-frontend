<template>
    <a-list>
        <a-list-item v-for="n in data" :key="n.id">
            <a-list-item-meta
                v-if="n.type==='App\\Notifications\\CommentOperated'"
                :title="'您的评论「'+(showDetail ? n.data.content : n.data.content.substring(0, 5)+'...')+'」被'+operations[n.data.action]">
            <span slot="description">
                {{( n.data.mark!=null?n.data.mark:'')+moment(n.created_at).fromNow() }}
                <span v-if="n.read_at">· 已读</span>
                <span v-else>· 未读</span>
            </span>
                <a-avatar icon="message" slot="avatar"/>
            </a-list-item-meta>
            <a-list-item-meta
                v-else-if="n.type==='App\\Notifications\\PostOperated'"
                :title="'您的文章「'+n.data.post_title+'」被'+operations[n.data.action]">
                <span slot="description">
                    {{( n.data.mark!=null?n.data.mark:'')+moment(n.created_at).fromNow() }}
                    <span v-if="n.read_at">· 已读</span>
                    <span v-else>· 未读</span>
                </span>
                <a-avatar icon="form" slot="avatar"/>
            </a-list-item-meta>
            <a-list-item-meta
                v-else-if="n.type==='App\\Notifications\\UserFollowed'"
                :title="n.data.name+' 关注了您'"
            >
                <span slot="description">
                    {{ moment(n.created_at).fromNow() }}
                    <span v-if="n.read_at">· 已读</span>
                    <span v-else>· 未读</span>
                </span>
                <a-avatar :src="n.data.avatar" slot="avatar" v-if="n.data.avatar"/>
                <a-avatar icon="user" slot="avatar" v-else/>
            </a-list-item-meta>
            <a-list-item-meta
                v-else-if="n.type==='App\\Notifications\\ReportDisposed'"
                title="举报处理反馈"
            >
                <span slot="description">
                    您对 {{ n.data.content }} 的举报已被管理员处理, 处理意见: {{ n.data.opinion }}
                    <br />
                    感谢您对社区的贡献, 奖励您 {{ n.data.credits }} 积分。
                    <br />
                    {{ moment(n.created_at).fromNow() }}
                    <span v-if="n.read_at">· 已读</span>
                    <span v-else>· 未读</span>
                </span>
                <a-avatar :src="n.data.avatar" slot="avatar" v-if="n.data.avatar"/>
                <a-avatar icon="user" slot="avatar" v-else/>
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script>
    import moment from 'moment'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'NotificationList',
        props: {
            data: Array,
            showDetail: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                moment,
                operations: {
                    deleted: '删除',
                    restored: '恢复'
                }
            }
        }
    }
</script>

<style scoped>

</style>

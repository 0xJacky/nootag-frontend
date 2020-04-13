<template>
    <a-list>
        <a-list-item v-for="d in data" :key="d.id">
            <a-list-item-meta
                :title="d.user_name + ' ' + favour[d.is_like]+'您的'+typeMask[d.type]+'「'+d.content.substring(0, 5)+'...」'"
                :description="moment(d.created_at).fromNow()">
                <user-avatar :url="d.avatar" slot="avatar"/>
            </a-list-item-meta>
        </a-list-item>
    </a-list>
</template>

<script>
    import moment from 'moment'
    import UserAvatar from '@/components/UserAvatar'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'FavourList',
        components: {UserAvatar},
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
                typeMask: {
                    post: '文章',
                    feedback: '长评论',
                    discuss: '讨论',
                    comment: '评论'
                },
                favour: {
                    0: '点踩了',
                    1: '点赞了'
                }
            }
        }
    }
</script>

<style scoped>

</style>

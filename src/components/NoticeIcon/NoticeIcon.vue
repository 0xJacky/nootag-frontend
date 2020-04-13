<template>
    <a-popover
        v-model="visible"
        trigger="click"
        placement="bottomRight"
        overlayClassName="header-notice-wrapper"
        :getPopupContainer="() => $refs.noticeRef.parentElement"
        :autoAdjustOverflow="true"
        :arrowPointAtCenter="true"
        :overlayStyle="{ width: '300px', top: '50px' }"
    >
        <template slot="content">
            <a-spin :spinning="loading">
                <notification-list :data="notifications"/>
                <div class="center" v-if="notifications.length>0"><a href="/user.html#/notification">查看全部</a></div>
            </a-spin>
        </template>
        <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="notice_amount">
        <a-icon style="font-size: 16px; padding: 4px" type="bell"/>
      </a-badge>
    </span>
    </a-popover>
</template>

<script>
    import notification from '@/components/Notification/api'
    import NotificationList from '@/components/Notification/NotificationList'

    export default {
        name: 'HeaderNotice',
        components: {NotificationList},
        props: {
            notice_amount: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                loading: true,
                visible: false,
                notifications:[]
            }
        },
        methods: {
            fetchNotice() {
                if (!this.visible) {
                    this.get_list()
                }
                this.visible = !this.visible
            },
            get_list() {
                notification.get_list({page: 1}).then(r => {
                    this.loading = false
                    this.notifications = r.data
                })
            }
        }
    }
</script>

<style lang="css">
    .header-notice-wrapper {
        top: 50px !important;
    }
</style>

<style lang="less" scoped>
    .header-notice {
        display: inline-block;
        transition: all 0.3s;

        span {
            vertical-align: initial;
        }
    }

</style>

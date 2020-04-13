<template>
    <a-popover
        trigger="hover"
        placement="bottom"
        arrow-point-at-center
    >
        <template slot="content">
            <div class="user-pop-card">
                <table>
                    <tr>
                        <td>Level</td>
                        <td style="text-align: right">{{ user.level }}</td>
                    </tr>
                    <tr>
                        <td>用户组</td>
                        <td style="text-align: right">{{ user.group }}</td>
                    </tr>
                    <tr>
                        <td>积分</td>
                        <td style="text-align: right">{{ user.credits }}</td>
                    </tr>
                </table>
                <a-divider/>
                <table style="width: 100%">
                    <tr>
                        <td>
                            <a-icon type="user"/>
                            <a href="/user.html"> 用户中心</a>
                        </td>
                        <td style="text-align: right">
                            <a-icon type="message"/>
                            <a href="/user.html#/notification"> 消息中心</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a-icon type="setting"/>
                            <a href="/user.html#/settings"> 个人设置</a>
                        </td>
                        <td style="text-align: right">
                            <a-icon type="star"/>
                            <a href="/user.html#/credit"> 积分历史</a>
                        </td>
                    </tr>
                </table>
                <div style="margin:8px 0 0 0;float: left" v-if="$store.state.user.power>=2">
                    <a href="/manage.html">管理系统</a>
                </div>
                <div style="margin:8px 0 0 0;float: right">
                    <a @click="logout">注销</a>
                </div>
                <div class="clear"></div>
            </div>
        </template>
        <span class="avatar" @mouseover="get_user_info">
      <a-avatar
          v-if="user.avatar"
          :src="user.avatar"
          alt="avatar"
          :size="28"
      />
      <a-avatar
          v-else
          icon="user"
          :size="28"
      />
      <span>{{ user.name }}</span>
    </span>
    </a-popover>
</template>

<script>
    import authorization from '~/user/api/authorizations'

    export default {
        name: 'UserAvatarPopover',
        computed: {
            user: {
                get() {
                    return this.$store.state.user
                }
            },
        },
        methods: {
            get_user_info() {
                this.$api.user.info()
            },
            logout() {
                authorization.logout().then(() => {
                    window.location.replace('/index.html')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-pop-card {
        width: 180px;

        table {
            width: 100%;
        }

        tr {
            line-height: 2;
        }
    }

    .ant-popover-inner-content .ant-divider-horizontal {
        margin: 12px 0;
    }

    .avatar {
        height: 100%;

        .ant-avatar {
            margin: 18px 8px;
        }
    }
</style>

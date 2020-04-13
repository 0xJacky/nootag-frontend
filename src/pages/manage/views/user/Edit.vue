<template>
    <a-row>
        <a-col :sm="24" :md="12" :lg="12" :xl="8">
            <a-card :bordered="false" class="account">
                <div class="account-center-avatarHolder">
                    <div class="avatar">
                        <img :src="user.avatar" v-if="user.avatar"/>
                        <a-avatar icon="user" :size="104" v-else/>
                    </div>
                    <div class="username">
                        {{ user.name }}
                    </div>
                    <div class="level">{{ user.group }} · Level {{ user.level }}</div>
                </div>
                <div class="account-center-detail">
                    <p>
                        <a-icon type="user-add"/>
                        {{ user.created_at }}
                    </p>
                    <p>
                        <a-icon type="login"/>
                        {{ user.last_active }}
                    </p>
                    <p>
                        <a-icon type="mail"/>
                        {{ user.email }} - {{ user.email_verify ? '已验证': '未验证'}}
                        - <a @click="verify('email')" v-if="$store.state.user.power >= 8">标记邮箱为已验证</a>
                    </p>
                    <p>
                        <a-icon type="phone"/>
                        {{ user.phone ? user.phone : '无' }} - {{ user.phone_verify ? '已验证': '未验证'}}
                        - <a @click="verify('phone')" v-if="$store.state.user.power >= 8">标记手机为已验证</a>
                    </p>
                    <p>
                        <a-icon type="pay-circle"/>
                        {{ user.pay_amount }}
                    </p>
                    <p v-show="user.id && $store.state.user.power >=10">
                        <a-icon type="star"/>
                        {{ user.credits }} 积分
                        - <a @click="visible=true">修改</a>
                    </p>
                    <p>
                        <a-icon type="team"/>
                        关注 {{ user.follows }} 个用户
                    </p>
                    <p>
                        <a-icon type="team"/>
                        被 {{ user.fans }} 个用户关注
                    </p>
                    <p>
                        <a-icon type="edit"/>
                        {{ user.description ? user.description : '无' }}
                    </p>
                </div>
            </a-card>
            <a-modal
                title="修改积分"
                :visible="visible"
                ok-text="保存"
                cancel-text="取消"
                :mask="false"
                @ok="change_credit"
                @cancel="visible=false"
            >
                <a-form-item label="改变量">
                    <a-input-number v-model="credit.change"/>
                </a-form-item>
                <a-form-item label="修改原因">
                    <a-textarea v-model="credit.remark"/>
                </a-form-item>
            </a-modal>
        </a-col>
        <a-col :sm="24" :md="12" :lg="12" :xl="16">
            <a-card>
                <std-data-entry :data-list="editable" v-model="user" :error="error" style="max-width: 300px"/>
                <footer-tool-bar>
          <span>
            <a-popconfirm
                v-if="$store.state.user.power >= 6"
                title="你确定要清除头像?"
                @confirm="destroy_avatar(user.id)" okText="是的"
                cancelText="再想想">
            <a-button type="danger" style="margin: 0 20px 0 0" ghost>清除头像</a-button>
          </a-popconfirm>

          <a-button type="primary" @click="save" :loading="loading">提交</a-button>
          </span>

                </footer-tool-bar>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
    import FooterToolBar from '~/manage/components/FooterToolbar/FooterToolBar'
    import group_columns from '~/manage/views/user/group_columns'
    import user_group from '~/manage/api/user_group'
    import StdDataEntry from '~/manage/components/StdDataEntry/StdDataEntry'

    const editable = [{
        title: '昵称',
        dataIndex: 'name',
        edit: {
            type: 'input'
        }
    }, {
        title: '用户组 ID',
        dataIndex: 'user_group_id',
        edit: {
            type: 'selector',
            columns: group_columns,
            api: user_group,
            data_key: 'data',
            pagination_method: 'b'
        }
    }, {
        title: '邮箱',
        dataIndex: 'email',
        edit: {
            type: 'input'
        }
    }, {
        title: '手机',
        dataIndex: 'phone',
        edit: {
            type: 'input'
        }
    }, {
        title: '密码',
        dataIndex: 'password',
        edit: {
            type: 'input',
            placeholder: '留空则不修改'
        }
    }, {
        title: '描述',
        dataIndex: 'description',
        edit: {
            type: 'textarea'
        }
    }, {
        title: '活跃状态',
        dataIndex: 'active',
        mask: {
            0: '禁用',
            1: '正常'
        },
        edit: {
            type: 'slider',
            min: 0,
            max: 1
        }
    }]

    export default {
        name: 'Edit',
        components: {
            StdDataEntry,
            FooterToolBar
        },
        data() {
            return {
                loading: false,
                user: {
                    id: 0,
                    name: '',
                    email: '无',
                    phone: '无',
                    password: '',
                    group: '无用户组',
                    active: 1,
                    description: '无描述',
                    avatar: '',
                    followers: 0,
                    level: 1,
                    pay_amount: 0,
                    created_at: '未注册',
                    last_active: '未活动'
                },
                editable,
                visible: false,
                credit: {},
                error: {}
            }
        },
        created() {
            this.get()
        },
        watch: {
            '$route'() {
                this.user = {}
            }
        },
        methods: {
            get() {
                if (this.$route.params.id) {
                    this.$api.user.user_info(this.$route.params.id).then(r => {
                        this.user = r
                    })
                }
            },
            save() {
                this.loading = true
                this.$api.user.save(this.user.id, this.user).then(r => {
                    this.user = r
                    this.loading = false
                    this.$message.success('更新成功')
                }).catch(r => {
                    this.loading = false
                    this.$message.error('服务器错误')
                    this.error = r.errors
                })
            },
            verify(type) {
                this.$api.user.verify(this.user.id, type).then(r => {
                    this.user[type + '_verify'] = r[type + '_verify']
                    this.$message.success('验证成功')
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            },
            destroy_avatar() {
                this.$api.user.destroy_avatar(this.user.id).then(() => {
                    this.user.avatar = null
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            },
            change_credit() {
                this.$api.user.change_credit(this.user.id, this.credit.change, this.credit.remark).then(() => {
                    this.visible = false
                    this.get()
                    this.$message.success('积分修改成功')
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .account {
        margin: 0 15px 0 0;
        @media (max-width: 512px) {
            margin: 0 0 20px 0;
        }
    }

    .account-center-avatarHolder {
        text-align: center;
        margin-bottom: 24px;

        & > .avatar {
            width: 104px;
            height: 104px;
            margin: 0 auto 20px;
            border-radius: 50%;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .username {
            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
            margin-bottom: 4px;
        }
    }

    .account-center-detail {
        p {
            margin-bottom: 8px;
            padding-left: 26px;
            position: relative;
        }

        .title {
            background-position: 0 0;
        }

        .group {
            background-position: 0 -22px;
        }

        .address {
            background-position: 0 -44px;
        }
    }
</style>

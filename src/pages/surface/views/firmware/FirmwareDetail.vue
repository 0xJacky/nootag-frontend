<template>
    <div class="info">
        <h2>开始下载吧</h2>
        <p v-for="(v,k) in infoRow" :key="k">
            {{ v }}: {{ info[k] }}
        </p>
        <p v-if="info.uploaddate">上传时间: {{ info.uploaddate }}</p>
        <p v-if="info.size">文件大小: {{ bytesToSize(info.size)}}</p>
        <div class="extra">
            <div class="signing" v-if="type==='stable'">
                <a-alert v-if="info.signing === 1" message="该固件正常验证中，可以通过 iTunes 进行「升级」或「恢复」。"
                         type="success"/>
                <a-alert v-else message="该固件已经停止验证，无法通过 iTunes 恢复。"
                         type="error"/>
            </div>

            <template v-if="info.url">
                <a-button
                    :type="info.signing === 1 || type ==='beta'?'primary':'danger'"
                    @click="copy(info.url)"
                    ghost v-if="is_mobile">复制下载链接
                </a-button>

                <a-button-group v-else>
                    <a-button :type="info.signing == 1 || type ==='beta'?'primary':'danger'">
                        <a :href="info.url">
                            <a-icon type="apple"/>
                            苹果服务器下载</a>
                    </a-button>
                    <a-tooltip placement="bottom">
                        <template slot="title">
                            <span>复制链接</span>
                        </template>
                        <a-button
                            icon="link" :type="info.signing === 1 || type ==='beta'?'primary':'danger'"
                            @click="copy(info.url)"
                            ghost/>
                    </a-tooltip>
                </a-button-group>
            </template>

            <template v-if="type==='beta' && info.cow_url">
                <a-button v-if="is_mobile" type="primary" @click="copy(info.cow_url)" ghost>复制下载链接</a-button>
                <a-button-group v-else>
                    <a-button>
                        <a :href="info.cow_url">
                            <a-icon :component="CowtransferLogo" theme="filled"/>
                            奶牛快传下载</a>
                    </a-button>
                    <a-tooltip placement="bottom">
                        <template slot="title">
                            <span>复制链接</span>
                        </template>
                        <a-button icon="link" @click="copy(info.cow_url)"/>
                    </a-tooltip>
                </a-button-group>
            </template>

            <p class="no" v-if="type==='beta' && !info.url && !info.cow_url">
                <a-icon type="close"/>
                固件还没上传呢，再等等~
            </p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueClipboard from 'vue-clipboard2'
    import CowtransferLogo from '~/surface/components/CowtransferLogo'


    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)

    const infoRow = {
        show_name: '设备型号',
        version: '版本',
        buildid: 'Build ID',
        releasedate: '发布时间'
    }

    export default {
        name: 'FirmwareDetail',
        props: {
            info: Object,
            type: {
                type: String,
                default() {
                    return 'stable'
                }
            }
        },
        data() {
            return {
                loading: true,
                infoRow,
                CowtransferLogo
            }
        },
        computed: {
            is_mobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }
        },
        methods: {
            copy(url) {
                this.$copyText(url).then(() => {
                    this.$message.success('下载链接已拷贝到您的剪切板啦~')
                }).catch(() => {
                    this.$message.error('下载链接拷贝失败')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    p {
        line-height: 2.0
    }

    .extra {
        text-align: center;
        padding: 10px 0 0 0;

        button {
            margin: 10px 0 0 0;
        }
    }

    .ant-btn-group {
        margin: 10px;
    }

    .no {
        color: #ee5854;
    }
</style>

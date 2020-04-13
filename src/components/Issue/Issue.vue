<template>
    <div class="issue">
        <a-button @click="visible=true" class="entry-button" icon="info" shape="circle"/>
        <a-modal
            title="尝鲜派反馈系统"
            v-if="visible"
            :visible="visible"
            :centered="true"
            @ok="handleOk"
            @cancel="visible=false"
            okText="确认"
            cancelText="取消"
        >
            <p>感谢您参与尝鲜派 {{ version }}-{{ build_id }} 测试。</p>
            <p>我们会记录您的浏览器版本信息, 以方便对问题进行定位。</p>
            <br/>
            <p>当前页面: {{ issue.path }}</p>
            <br/>
            <a-textarea v-model="issue.content" placeholder="请简述您的问题..."/>
        </a-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {VueReCaptcha} from 'vue-recaptcha-v3'
    import issue from './api'

    Vue.use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
        loaderOptions: {
            useRecaptchaNet: true
        }
    })
    export default {
        name: 'Issue',
        data() {
            return {
                visible: false,
                version: process.env.VUE_APP_VERSION,
                build_id: process.env.VUE_APP_BUILD_ID ? process.env.VUE_APP_BUILD_ID : 'dev',
                issue: {}
            }
        },
        watch: {
            '$route'() {
                this.issue.path = this.getPath()
            }
        },
        created() {
            this.issue.path = this.getPath()
        },
        methods: {
            getPath() {
                return window.location.pathname + '#' + this.$route.fullPath
            },
            handleOk() {
                if (this.issue.content.length > 0) {
                    this.$recaptchaLoaded().then(() => {
                        this.$recaptcha('issue').then((token) => {
                            this.issue.token = token
                            this.$nextTick(() => {
                                issue.add(this.issue).then(() => {
                                    this.$message.success('提交成功, 感谢您的贡献!')
                                    this.visible = false
                                }).catch(() => {
                                    this.$message.error('服务器错误')
                                })
                            })
                        })
                    })
                } else {
                    this.$message.error('提交失败: 内容不能为空')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .entry-button {
        position: fixed;
        right: 50px;
        bottom: 75px
    }

    p {
        line-height: 2.0;
    }
</style>

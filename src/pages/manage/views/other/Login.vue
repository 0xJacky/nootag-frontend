<template>
    <a-row
        class="container center"
        :align="'middle'"
        :type="'flex'"
    >
        <a-col
            :xs="0"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="8"
        >
            <a-card class="left-card" :bordered="false">
                <div class="welcome">
                    <h1>欢迎登录</h1>
                    <h2>{{ tips }}</h2>
                </div>
                <div class="footer">© 尝鲜派 2017 - 2020 · Designed by 0xJacky</div>
            </a-card>
        </a-col>
        <a-col
            :xs="24"
            :sm="12"
            :md="9"
            :lg="8"
            :xl="8"
        >
            <std-form-card-content :options="options" :error="error" @onSubmit="handleSubmit"/>
            <vue-particles
                color="#dedede"
                :particlesNumber="60"
                :move-speed="3"
                :click-effect="false"
                :hover-effect="false"
                class="particles"/>
        </a-col>
    </a-row>
</template>

<script>
    import Vue from 'vue'
    import {VueReCaptcha} from 'vue-recaptcha-v3'
    import StdFormCardContent from '~/user/components/StdFormCard/StdFormCardContent'
    import VueParticles from 'vue-particles'

    Vue.use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
        loaderOptions: {
            useRecaptchaNet: true
        }
    })

    Vue.use(VueParticles)

    const options = {
        title: '欢迎登录',
        button_text: '登录',
        items: [
            {
                label: '邮箱',
                placeholder: '请输入',
                icon: 'mail',
                decorator: ['email', {
                    rules: [{type: 'email', message: '您输入的邮箱地址无效'}, {
                        message: '请输入邮箱!'
                    }]
                }]
            },
            {
                label: '密码',
                placeholder: '请输入',
                icon: 'key',
                type: 'password',
                decorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入密码!'
                    }]
                }]
            },
        ]
    }

    export default {
        name: 'Login',
        components: {
            StdFormCardContent
        },
        props: {
            redirect: {
                type: Boolean,
                default: true
            },
            tips: {
                type: String,
                default: 'WelCome to iBeta'
            }
        },
        data() {
            return {
                loading: true,
                login_loading: false,
                logo: require('@/assets/img/logo.png'),
                options,
                error: {}
            }
        },
        created() {
            if (this.$store.getters.isLogin) {
                this.$router.push('/')
            }
            this.form = this.$form.createForm(this)
        },
        methods: {
            handleSubmit(data) {
                this.$api.authorization.login(data.email, data.password, data.token).then(() => {
                    this.$api.user.info().then(() => {
                        this.$message.success('登录成功', 1).then(() => {
                            const path = this.$route.query.redirect ? this.$route.query.redirect : '/user.html'
                            window.location.href = path
                        })
                    })
                }).catch(r => {
                    this.error = r.errors
                })
            }
        }
    }
</script>

<style lang="less">
    .left-card {
        .ant-card-body {
            height: 360px;
            position: relative;
        }
    }
</style>

<style lang="less" scoped>
    .particles {
        position: fixed;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;

        .ant-card, .left-card {
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(200, 200, 200, 0.25);
        }

        .form-card {
            transform: translateX(-5%);
            max-width: 360px;
            @media (max-width: 575px) {
                transform: translateX(0);
                margin: 0 auto;
                max-width: 320px;
            }
            @media (max-width: 320px) {
                border-radius: 0;
            }
        }

        .left-card {
            transform: translateX(5%);
            @media (max-width: 575px) {
                display: none;
            }

            .footer {
                position: absolute;
                bottom: -30px;
                font-size: 13px;
                @media (max-width: 680px) {
                    display: none;
                }
            }

            .welcome {
                display: inline-table;
                margin: 0 auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-40%, -50%);

                h1, h2 {
                    font-weight: 300;
                    text-align: center;
                }
            }
        }

    }
</style>

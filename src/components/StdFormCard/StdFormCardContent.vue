<template>
    <a-card :bordered="false" class="form-card">
        <a-form :form="form" @submit="handleSubmit">
            <div class="logo">
                <img :src="logo"/>
            </div>
            <p class="title">
                {{ options.title }}
            </p>
            <a-form-item
                :label="item.label"
                v-for="item in options.items"
                :key="item.label"
                :validate-status="error[item.decorator[0]] ? 'error' :'success'"
                :help="error[item.decorator[0]] ? error[item.decorator[0]].join('') : null"
            >
                <a-input
                    v-decorator="item.decorator"
                    :placeholder="item.placeholder"
                    :autocomplate="item.autocomplate ? 'on' : 'off'"
                    :type="item.type"
                >
                    <a-icon slot="prefix" :type="item.icon" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <div class="action">
                <div class="center">
                    <a-button
                        type="primary"
                        html-type="submit"
                        :loading="loading"
                        class="std-border-radius"
                    >
                        {{ options.button_text }}
                    </a-button>
                </div>
                <div class="small-link center">
                    <slot name="small-link"/>
                </div>
            </div>
        </a-form>
    </a-card>
</template>

<script>
    import {VueReCaptcha} from 'vue-recaptcha-v3'
    import Vue from 'vue'

    Vue.use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
        loaderOptions: {
            useRecaptchaNet: true
        }
    })

    export default {
        name: 'StdFormCardContent',
        props: {
            options: Object,
            error: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        data() {
            return {
                logo: require('@/assets/img/logo.png'),
                loading: false,
                // eslint-disable-next-line vue/no-reserved-keys
                form: null
            }
        },
        mounted() {
            this.form = this.$form.createForm(this)
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.loading = true
                        this.$recaptchaLoaded().then(() => {
                            this.$recaptcha('std_form').then(token => {
                                values.token = token
                                this.$emit('onSubmit', values)
                            })
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .form-card {
        .ant-form-item {
            input {
                border-radius: 20px;
            }
        }
    }
</style>

<style lang="less" scoped>
    .form-card {
        box-shadow: 0 0 30px rgba(200, 200, 200, 0.25);

        .ant-form {
            max-width: 250px;
            margin: 0 auto;

            .title {
                text-align: center;
                font-size: 17px;
                margin: 10px 0;
            }
        }

        .logo {
            display: grid;
            padding: 10px;

            img {
                height: 80px;
                width: 80px;
                margin: 0 auto;
            }
        }

        .action {
            .small-link {
                font-size: 13px;
                padding: 15px 0 0 0;
            }
        }
    }
</style>

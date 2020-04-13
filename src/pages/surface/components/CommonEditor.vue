<template>
  <div class="editor">
    <a-textarea
      v-model="update.content"
      maxlength="200"
      placeholder="体验的感受...支持 Markdown 语法"
      :row="2"
      :autosize="{ minRows: 2, maxRows: 3 }"
      @input="lengthCheck()"
    />
    <div class="form-control" style="margin: 10px 0 0 0; float: left">
      <upload :upload-url="'/upload/'+module+'_img/'+update.id" :file-url="update.img" :keep-file="false" :theme="uploadTheme"
              ref="upload"/>
    </div>
    <div class="save">
      <span style="margin: 0 10px 0 0">{{ length }}/200</span>
      <a-button
        type="primary"
        @click="save()"
      >
        发布
      </a-button>
    </div>
    <div class="clear"/>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {VueReCaptcha} from 'vue-recaptcha-v3'
    import upload from '../../manage/components/StdDataEntry/StdUpload'

    Vue.use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
        loaderOptions: {
            useRecaptchaNet: true
        }
    })

    const api = process.env.VUE_APP_API_ROOT

    export default {
        name: 'CommonEditor',
        components: {
            upload
        },
        props: {
            inGallery: {
                type: Boolean,
                default: false
            },
            inFeedback: {
                type: Boolean,
                default: false
            },
            inPost: {
                type: Boolean,
                default: false
            },
            inComment: {
                type: Boolean,
                default: false
            },
            inFeedbackEdit: {
                type: Boolean,
                default: false
            },
            id: {
                type: [String, Number],
                default: null
            },
            replyto: {
                type: [String, Number],
                default: null
            },
            parent: {
                type: [String, Number],
                default: null
            },
            autoload: {
                type: Boolean,
                default: true
            },
            uploadTheme: {
                default: 'tiny',
                validator: function (value) {
                    return ['tiny', 'normal'].indexOf(value) !== -1
                }
            },
            module: {
                validator: function (value) {
                    return ['feedback', 'comment'].indexOf(value) !== -1
                }
            }
        },
        data() {
            return {
                loading: true,
                update: {
                    id: '',
                    content: '',
                    img: '',
                    allow_comment: 1
                },
                length: 200,
                api
            }
        },
        watch: {
            parent() {
                this.init()
            },
            id() {
                this.init()
            },
            update() {
                this.lengthCheck()
            }
        },
        beforeMount() {
            this.init()
        },
        methods: {
            init() {
                if (this.inGallery) {
                    this.update.gallery_id = this.id
                }
                if (this.inFeedback) {
                    this.update.feedback_id = this.id
                }
                if (this.inPost) {
                    this.update.post_id = this.id
                }
                if (this.inComment) {
                    this.update.replyto = this.replyto
                    this.update.parent = this.parent
                }
                if (this.inFeedbackEdit) {
                    this.get_feedback()
                }
            },
            upload() {
                return new Promise(resolve => {
                    if (this.$refs.upload.file != this.update.img) {
                        this.$refs.upload.handleUpload().then(() => resolve())
                    } else {
                        resolve()
                    }
                })
            },
            save() {
                // eslint-disable-next-line eqeqeq
                if (this.update.content == '') {
                    this.$notification['error']({
                        message: '保存出错',
                        description: '内容不能为空'
                    })
                } else {
                    const action = this.update.id === '' ? 'add' : 'edit'

                    this.$recaptchaLoaded().then(() => {
                        this.$recaptcha(this.module).then((token) => {
                            this.update.token = token
                            this.$http.post('/' + this.module + '/' + action, this.update)
                                .then((response) => {
                                    if (response.status === 200) {
                                        if (action === 'add') {
                                            this.update.id = response.id
                                        }
                                        this.$message.success('发布成功')
                                        const t = this
                                        this.upload().then(() => {
                                            if (!this.inFeedbackEdit) {
                                                t.update = {
                                                    id: '',
                                                    content: '',
                                                    img: '',
                                                    allow_comment: 1
                                                }
                                                this.$emit('get_list')
                                            }
                                        })
                                    } else {
                                        if (response.status === 404) {
                                            this.$router.push('/404')
                                        } else {
                                            this.$message.error('发布失败')
                                            // eslint-disable-next-line no-console
                                            console.log(response)
                                        }
                                    }
                                })
                        })
                    })
                }
            },
            onChange(checked) {
                this.update.allow_comment = checked ? '1' : '0'
            },
            get_feedback(f = true) {
                this.$http.get('/feedback/get/' + this.id + '/auth')
                    .then((response) => {
                        if (response.status === 200) {
                            this.update.id = response.feedback.id
                            if (f) {
                                this.update.content = response.feedback.content
                                this.update.img = response.feedback.img
                            }
                        } else {
                            this.$message.error('服务器错误')
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            lengthCheck() {
                this.length = 200 - this.update.content.length
            }
        }
    }
</script>

<style scoped>

</style>

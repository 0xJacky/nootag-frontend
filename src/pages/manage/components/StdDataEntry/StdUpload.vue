<template>
    <div v-if="type==='img'">
        <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            v-if="theme === 'normal'"
        >
            <img :src="fileUrl" v-if="fileUrl" width="100">
            <div v-else>
                <a-icon :type="uploading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">
                    上传文件
                </div>
            </div>
        </a-upload>

        <a-upload
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :withCredentials="true"
            v-else-if="theme === 'tiny'"
        >
            <a-popover
                trigger="click"
                placement="bottom"
                :visible="!!fileUrl"
            >
                <img slot="content" :src="fileUrl" width="64"/>
                <span class="upload-picture-btn">
        <a-icon type="picture"/>
      </span>
            </a-popover>
        </a-upload>

        <a-modal
            title="图片裁切"
            v-model="visible"
            @ok="handleCropSuccess"
            @cancel="visible=false;$emit('changeFileUrl', orig)"
            v-if="crop"
            okText="裁切"
            cancelText="取消上传"
            class="cropper"
        >
            <a-button @click="handleSingleUpload">不剪裁</a-button>
            <div class="vue-cropper">
                <VueCropper
                    ref="cropper"
                    :img="fileUrl"
                    outputType="png"
                    :autoCrop="true"
                    :fixed="cropOptions.fixed"
                    :fixedNumber="cropOptions.fixedNumber"
                    :autoCropWidth="cropOptions.autoCropWidth"
                    :autoCropHeight="cropOptions.autoCropHeight"
                />
            </div>
        </a-modal>
    </div>
    <div v-else-if="type==='multi-img'">
        <a-upload
            listType="picture-card"
            :before-upload="beforeMultiUpload"
            :multiple="true"
        >
            <a-icon type="plus"/>
            <div class="ant-upload-text">添加图片</div>
        </a-upload>
        <a-divider v-if="fileList.length">上传成功</a-divider>
        <div class="img-preview" v-for="file in fileList" :key="file.id">
            <a-popover placement="bottom">
                <img :src="file.url"
                     @click="$emit('clickImg', file.id, file.url)"
                />
                <template slot="content">
                    <div style="margin: 0 auto">
                        <a-button type="danger" size="small" @click="deleteImg(file.id)" ghost>删除</a-button>
                    </div>
                </template>
            </a-popover>
        </div>
        <div class="clear"></div>
    </div>

    <div v-else-if="type==='file'">
        <a-upload
            :before-upload="beforeUpload"
            :show-upload-list="false"
            :multiple="false"
        >
            <a-button>
                <a-icon type="upload"/>
                上传
            </a-button>
            <p v-show="fileUrl">
                <a-icon type="paper-clip"/>
                {{ fileUrl }}
            </p>
        </a-upload>
    </div>

</template>

<script>
    import Vue from 'vue'
    import {VueReCaptcha} from 'vue-recaptcha-v3'
    import VueCropper from 'vue-cropper'

    const uuidv1 = require('uuid/v1')

    Vue.use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITEKEY,
        loaderOptions: {
            useRecaptchaNet: true
        }
    })

    Vue.use(VueCropper)

    export default {
        name: 'StdUpload',
        props: {
            id: {
                type: Number,
                default: null
            },
            api: Function,
            api_delete: {
                type: Function,
                default: null
            },
            fileUrl: {
                type: String,
                default: null
            },
            type: {
                default: 'img',
                validator: value => {
                    return ['img', 'file', 'multi-img'].indexOf(value) !== -1
                }
            },
            theme: {
                default: 'normal',
                validator: value => {
                    return ['tiny', 'normal'].indexOf(value) !== -1
                }
            },
            crop: {
                type: Boolean,
                default: false
            },
            cropOptions: {
                type: Object,
                default: () => {
                    return {
                        fixed: true,
                        autoCropWidth: 128,
                        autoCropHeight: 128,
                    }
                }
            },
            list: {
                type: Array,
                default: null
            }
        },
        data() {
            return {
                uploading: false,
                orig: '',
                visible: false,
                fileList: null
            }
        },
        created() {
            this.orig = this.fileUrl
            this.fileList = this.list
        },
        model: {
            prop: 'fileUrl',
            event: 'changeFileUrl'
        },
        watch: {
            list() {
                this.fileList = this.list
            }
        },
        methods: {
            upload() {
                if (this.orig && this.fileUrl !== this.orig) {
                    return this.handleSingleUpload()
                }
            },
            handleSingleUpload() {
                const formData = new FormData()
                formData.append('file', this.fileList[0])
                this.visible = false
                this.uploading = true
                this.$message.info('正在上传附件, 请不要关闭本页')

                this.$recaptchaLoaded().then(() => {
                    this.$recaptcha('upload').then((token) => {
                        this.api(this.id, formData, token).then(r => {
                            this.$emit('uploaded', r.url)
                            this.$emit('changeFileUrl', r.url)
                            this.uploading = false
                            this.$message.success('上传成功')
                        })
                    })
                })
            },
            multiUpload() {
                this.handleMultiUpload()
            },
            handleMultiUpload() {
                const {fileList} = this
                const formData = new FormData()
                fileList.forEach((file) => {
                    formData.append('files[]', file)
                })
                this.uploading = true
                this.$message.info('正在上传附件, 请不要关闭本页')
                this.$recaptchaLoaded().then(() => {
                    this.$recaptcha('upload').then((token) => {
                        this.api(this.id, formData, token).then(r => {
                            this.fileList = this.fileList.concat(r.images)
                            this.uploading = false
                            this.$message.success('上传成功')
                        })
                    })
                })
            },
            beforeUpload(file) {
                // 赋予新值之前做个备份 emm 生气了哼!!!
                this.orig = this.fileUrl ? this.fileUrl : 'orig_is_empty'
                this.fileList = [file]
                if (this.type === 'img') {
                    this.visible = true
                    const r = new FileReader()
                    r.readAsDataURL(file)
                    r.onload = e => {
                        file.thumbUrl = e.target.result
                        this.$emit('changeFileUrl', e.target.result)
                    }
                } else {
                    this.$emit('changeFileUrl', file.name)
                }
                return false
            },
            beforeMultiUpload(file) {
                this.fileList = [...this.fileList, file]
                return false
            },
            afterCropUpload(file) {
                this.visible = true
                const r = new FileReader()
                r.readAsDataURL(file)
                r.onload = e => {
                    file.thumbUrl = e.target.result
                    this.$emit('changeFileUrl', e.target.result)
                }
                this.fileList = [file]
                this.$nextTick(() => {
                    this.handleSingleUpload()
                })
            },
            withdraw() {
                this.$emit('changeFileUrl', this.orig)
            },
            handleCropSuccess() {
                this.$refs.cropper.getCropBlob((data) => {
                    let file = new window.File([data], uuidv1() + '.png', {type: data.type})
                    this.afterCropUpload(file)
                    this.visible = false
                })
            },
            deleteImg(file_id) {
                this.api_delete(this.id, file_id).then(r => {
                    this.fileList = r
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .upload-picture-btn {
        font-size: 20px;
        color: #999999;
    }

    .cropper {
        .ant-modal-body {
            min-height: 256px;
        }
    }

    .vue-cropper {
        min-height: 200px;
        background-image: unset;
    }

    .img-preview {
        float: left;
        border: 1px solid #8e8e904d;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;

        img {
            height: 90px;
            width: 90px;
            object-fit: cover;
        }
    }
</style>

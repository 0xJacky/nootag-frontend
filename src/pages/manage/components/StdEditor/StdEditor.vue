<template>
    <div class="std-editor">
        <a-form-item>
            <a-input v-model="post.title" placeholder="标题"/>
        </a-form-item>
        <mavon-editor
            style="height: 100%"
            :box-shadow="false"
            :subfield="subfield"
            v-model="post.content"
            @save="save"
            ref=md
            :toolbars="toolbars"
            editorBackground="transparent"
            previewBackground="transparent"
            toolbarsBackground="transparent"
        />
        <p>支持 Markdown 语法</p>
        <a-modal
            title="图片管理"
            :visible="visible"
            ok-text="上传"
            cancel-text="关闭"
            :mask="false"
            @ok="startUpload"
            @cancel="visible=false"
        >
            <std-upload
                type="multi-img"
                :api="upload_api"
                ref="std_upload_multi"
                :id="post.id"
                :list="post.images"
                @clickImg="addImg"
                :api_delete="upload_api_delete"
            />
        </a-modal>
        <footer-tool-bar>
            <a-button type="primary" @click="clickUpload" style="margin: 0 20px 0 0" v-show="post.id" ghost>
                图片管理
            </a-button>
            <a-button type="primary" @click="save">保存</a-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import toolbars from './toolbars'
    import StdUpload from '~/manage/components/StdDataEntry/StdUpload'
    import FooterToolBar from '~/manage/components/FooterToolbar/FooterToolBar'

    export default {
        name: 'StdEditor',
        components: {
            StdUpload,
            FooterToolBar,
            mavonEditor
        },
        props: {
            post: Object,
            upload_api: Function,
            upload_api_delete: Function
        },
        model: {
            prop: 'post',
            event: 'changePost'
        },
        data() {
            return {
                subfield: !this.collapse(),
                toolbars,
                visible: false
            }
        },
        mounted() {
            window.onresize = () => {
                this.subfield = !this.collapse()
            }
        },
        methods: {
            save() {
                this.$emit('save')
            },
            clickUpload() {
                this.visible = true
            },
            startUpload() {
                this.$refs.std_upload_multi.multiUpload()
            },
            addImg(name, url) {
                this.$refs.md.toolbar_left_addlink('imagelink', name, url)
            }
        }
    }
</script>

<style lang="less">
    @media (prefers-color-scheme: dark) {
        .auto-textarea-input {
            background-color: transparent;
            color: #f5f5f5 !important;
        }

        .v-show-content {
            color: #f5f5f5 !important;
            img {
                opacity: 0.8;
            }
        }
    }
</style>

<style lang="less">
    .v-note-show {
        img {
            max-height: 256px!important;
        }
    }
</style>

<style lang="less" scoped>
    .v-note-wrapper {
        z-index: 8;
    }

    .full-screen {
        z-index: 11;
    }

    @media (prefers-color-scheme: dark) {
        @bg: #1e1f20 !important;
        .v-note-wrapper {
            background-color: @bg;
        }

        .auto-textarea-input {
            background-color: transparent;
            color: #f5f5f5 !important;
        }

        .v-show-content {
            color: #f5f5f5 !important;
        }
    }
</style>

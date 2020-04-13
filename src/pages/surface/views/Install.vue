<template>
  <div class="topic install">
    <div class="article major">
      <div class="post_info">
        <div class="title">
          <h1>{{ card.title }}</h1>
        </div>
      </div>
      <div class="post_content">
        <a-skeleton
          v-show="!card"
          active
        />
        <vue-markdown :source="card.content"/>
      </div>
      <p class="post_modified">
        最后修改于 {{ card.post_modified }}
      </p>
      <div class="clear"/>
      <p style="text-align: center">
        <br>感谢使用 Nootag 无派科技<br>
        网站目前无盈利且无广告<br>
        如果我们的工作帮助到您<br>
        请向我们投资或捐助我们
      </p>
      <div class="button">
        <a :href="card.config">
          <a-button
            type="primary"
            ghost
          >再次下载
          </a-button>
        </a>
        <router-link to="/donate">
          <a-button
            type="primary"
            ghost
          >
            捐助我们
          </a-button>
        </router-link>
      </div>
      <p class="center">
        ↑ 感谢 @Alien、@Mobei、@Mars.W 提供测试与截图
      </p>
    </div>
  </div>
</template>

<script>
    import VueMarkdown from '../plugins/VueMarkdown'
    import ScrollPosition from '../../../lib/utils/scroll-position';
    import Vue from 'vue'
    import VueClipboard from 'vue-clipboard2'

    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)

    export default {
        name: 'Install',
        components: {
            VueMarkdown
        },
        data() {
            return {
                card: ''
            }
        },
        beforeMount() {
            this.init()
        },
        mounted: ScrollPosition.goTop,
        watch: {
            '$route'() {
                this.init()
            }
        },
        methods: {
            init() {
                this.$http.get('/card/get?url=' + this.$route.params.url)
                    .then((response) => {
                        if (response.status === 200) {
                            this.card = response.card
                            if (!this.is_wechat()) {
                                const type = this.card.config.search('dmg') !== -1 ? '升级工具' : '描述文件'
                                // eslint-disable-next-line eqeqeq
                                if (this.card.download_method == 0) {
                                    this.$confirm({
                                        title: 'Nootag 无派科技',
                                        content: '您希望想直接下载' + type + '而略过教程吗?',
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk() {
                                            window.open(response.card.config)
                                        }
                                    })
                                } else {
                                    this.$copyText(response.card.config)
                                    this.$info({
                                        title: 'Nootag 无派科技',
                                        content: '描述文件的链接已复制到您的剪贴板，请参照这篇教程来使用',
                                        okText: '确认'
                                    })
                                }
                            } else {
                                this.$info({
                                    title: 'Nootag 无派科技',
                                    content: '请在 Safari 中打开本页面',
                                    okText: '确认'
                                })
                            }
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            is_wechat() {
                const ua = navigator.userAgent.toLowerCase()
                const isWeixin = ua.indexOf('micromessenger') !== -1
                if (isWeixin) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>

</style>

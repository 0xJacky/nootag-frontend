<template>
  <div class="main">
    <header>
      <a-row class="center menu">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="19"
          :xxl="16"
          class="limit-max">
        <span class="title">
          <router-link to="/home">
            <a-icon :component="HeaderLogo" />
          </router-link>
        </span>

          <span
            v-show="!is_login"
            class="login_button"
          >
          <router-link to="/user/login">
            <a-button type="primary">登录</a-button>
          </router-link>
        </span>

          <a-popover
            v-show="is_login"
            trigger="hover"
            placement="bottom"
            arrow-point-at-center
          >
            <template slot="content">
              <div class="user-pop-card">
                <table>
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
                      <router-link to="/user/home"> 个人中心</router-link>
                    </td>
                    <td style="text-align: right">
                      <a-icon type="message"/>
                      <router-link to="/user/message"> 消息中心</router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-icon type="setting"/>
                      <router-link to="/user/settings"> 设置</router-link>
                    </td>
                    <td style="text-align: right">
                      <a-icon type="info-circle"/>
                      <router-link to="/user/feedback"> 我的反馈</router-link>
                    </td>
                  </tr>
                </table>
                <div style="margin:8px 0 0 0;float: left" v-if="user.is_admin">
                  <a href="/manage.html">进入管理系统</a>
                </div>
                <div style="margin:8px 0 0 0;float: right">
                  <a @click="logout">注销</a>
                </div>
                <div class="clear"></div>
              </div>
            </template>
            <span class="avatar" @mouseover="get_user_info">
            <router-link to="/user/home">
              <a-avatar
                v-if="avatar!='null'"
                :src="avatar"
                alt="avatar"
                :size="28"
              />
              <a-avatar
                v-else
                icon="user"
                :size="28"
              />
            </router-link>
          </span>
          </a-popover>

          <a-menu
            v-model="current"
            mode="horizontal"
            class="horizontal_menu"
          >
            <a-menu-item
              key="/home"
              class="home_link"
            >
              <a-icon type="home"/>
              <router-link to="/home">
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item key="/donate">
              <a-icon type="money-collect"/>
              <router-link to="/donate">
                捐助
              </router-link>
            </a-menu-item>
            <a-menu-item key="/about">
              <a-icon type="question-circle"/>
              <router-link to="/about">
                关于
              </router-link>
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </header>
    <a-row class="container">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="19"
        :xxl="16"
        class="limit-max"
      >
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="17"
          :xl="17"
          :xxl="17"
          class="content"
        >
          <router-view @init="init"/>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="7"
          :xl="7"
          :xxl="7"
          class="widget-area"
        >
          <a-card
            title="公告"
            :bordered="false"
            class="card"
            v-show="notice"
          >
            <a-skeleton
              v-show="!notice"
              active
            />
            <vue-markdown :source="notice"/>
          </a-card>
          <a-card
            v-show="$route.path !== '/donate'"
            title="捐助诗"
            :bordered="false"
            class="card"
          >
            <p>网站现在不盈利</p>
            <p>全靠捐助养自己</p>
            <p>如果有幸帮到你</p>
            <p>捐助我们别吝惜</p>
            <router-link to="/donate">
              <a-button
                type="primary"
                ghost
              >
                <a-icon type="money-collect"/>
                捐助我们
              </a-button>
            </router-link>
          </a-card>
          <a-card
            title="联系我们"
            :bordered="false"
            class="card contact-us"
          >
            <div class="item">
              <a
                href="https://weibo.com/ibetame"
                target="_blank"
              >
                <a-avatar
                  :size="36"
                  :src="logo"
                />
                在微博上关注 @iBeta尝鲜派
              </a>
            </div>
            <div class="item">
              <a @click="copy_wechat">
                <a-avatar
                  :size="36"
                  :src="wechat"
                />
                在微信上关注 @iBeta尝鲜派
              </a>
            </div>
            <div class="item">
              <a
                href="https://t.me/ibetame"
                target="_blank"
              >
                <a-avatar
                  :size="36"
                  :src="telegram"
                />
                加入 TG 群组
              </a>
            </div>
            <div class="item">
              <a href="mailto:i@Sunbelife.com">
                <a-avatar
                  :size="36"
                  :src="hr"
                />
                加入尝鲜派
              </a>
            </div>
          </a-card>
        </a-col>
      </a-col>
    </a-row>
    <issue/>
    <div class="ant-modal-mask" v-if="shouldLogin">
      <Login :redirect="false" :tips="loginTips"/>
    </div>
    <footer>
      <a-row class="row center">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="14"
          :xxl="14"
          class="col limit-max"
        >
          <div>
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </div>
          <div>
            © 尝鲜派 2017 - {{ this_year }}
            · <a
            href="http://www.miitbeian.gov.cn/"
            target="_blank"
          >沪ICP备17047556号</a>
          </div>
          <div>
            <a
              href="https://jackyu.cn/"
              target="_blank"
            >Designed by OxJacky</a>
          </div>
        </a-col>
      </a-row>
    </footer>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueClipboard from 'vue-clipboard2'
    import VueMarkdown from 'vue-markdown'
    import HeaderLogo from "../components/HeaderLogo";

    const Issue = () => import('../../../components/Issue/Issue')
    const Login = () => import('./user/Login')

    VueClipboard.config.autoSetContainer = true
    Vue.use(VueClipboard)

    export default {
        name: 'Frontend',
        components: {
            Login,
            Issue,
            VueMarkdown
        },
        data() {
            const date = new Date()
            return {
                notice: '',
                logo_header: require('../../../assets/img/logo_header.png'),
                logo: require('../../../assets/img/logo.png'),
                wechat: require('../../../assets/img/wechat.png'),
                telegram: require('../../../assets/img/tg.png'),
                hr: require('../../../assets/img/hr.png'),
                this_year: date.getFullYear(),
                message: 'iamibeta',
                user: {},
                HeaderLogo
            }
        },
        computed: {
            current: {
                get() {
                    return [this.$route.path]
                },
                set(val) {
                    return val
                }
            },
            avatar() {
                return this.$store.getters.getAvatar
            },
            is_login() {
                return this.$store.getters.isLogin
            },
            shouldLogin() {
                return this.$store.getters.shouldLogin
            },
            loginTips() {
                return this.$store.getters.loginTips
            }
        },
        methods: {
            init(data) {
                this.notice = data.notice
            },
            copy_wechat() {
                this.$copyText(this.message).then(function () {
                    alert('公众号 ID 已拷贝到您的剪切板啦~')
                }, function (e) {
                    alert('复制失败')
                    // eslint-disable-next-line no-console
                    console.log(e)
                })
            },
            get_user_info() {
                this.$http.get('/user/info')
                    .then((response) => {
                        if (response.status === 200) {
                            this.user = response.user
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            login() {
                this.shouldLogin = true
            },
            logout() {
                this.$http.get('/user/logout')
                    .then((response) => {
                        if (response.status === 200) {
                            this.$store.dispatch('logout')
                            this.$message.success('注销成功')
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            }
        }
    }
</script>

<style scoped>
  .ant-menu-horizontal {
    border-bottom: unset;
  }

  .ant-modal-mask {
    z-index: 1002;
  }
</style>

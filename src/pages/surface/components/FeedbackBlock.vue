<template>
  <div>
    <a-card
      class="article"
      :bordered="false"
    >
      <div class="post_info">
        <div class="avatar">
          <a-avatar
            v-if="post.avatar"
            :src="post.avatar"
            :alt="post.author"
          />
          <a-avatar
            v-else
            icon="user"
          />
        </div>
        <div class="author">
          <p>{{ post.author }}</p>
          <p>发布于 {{ moment(post.post_date).fromNow() }}</p>
        </div>
        <a-divider/>
        <div class="clear"/>
      </div>
      <div class="post_content">
        <vue-markdown :source="post.content"/>
        <div><img :src="post.img"></div>
      </div>
      <p class="post_modified">
        最后修改于 {{ post.post_modified }}
      </p>
      <div class="clear"/>
      <template
        slot="actions"
        class="ant-card-actions"
      >
        <a-tooltip title="踩">
          <a-icon
            type="dislike"
            :theme="post.favour == 0 ? 'filled' : 'outlined'"
            @click="dislikes"
          />
          <span
            v-if="post.dislikes>0"
            style="padding-left:3px;cursor: auto"
          >{{ post.dislikes }}</span>
        </a-tooltip>

        <a-tooltip
          v-if="post.allow_comment == 1"
          title="评论"
        >
          <a-icon
            type="message"
            @click="$refs.comment.get_list(); show=true"
          />
          <span
            v-if="post.comments>0"
            style="padding-left:3px;cursor: auto"
          >{{ post.comments }}</span>
        </a-tooltip>

        <a-tooltip title="赞">
          <a-icon
            type="like"
            :theme="post.favour == 1 ? 'filled' : 'outlined'"
            @click="likes"
          />
          <span
            v-if="post.likes>0"
            style="padding-left:3px;cursor: auto"
          >{{ post.likes }}</span>
        </a-tooltip>
      </template>
      <comment
        v-show="show"
        ref="comment"
        module="feedback"
        :feedback_id="post.id"
        :autoload="false"
      />
    </a-card>
  </div>
</template>

<script>
    import VueMarkdown from '../plugins/VueMarkdown'
    import moment from 'moment'
    import Comment from './Comment/Comment'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'FeedbackBlock',
        components: {
            VueMarkdown,
            Comment
        },
        props: {
            post: Object
        },
        data() {
            return {
                moment,
                show: false
            }
        },
        methods: {
            likes() {
                // eslint-disable-next-line eqeqeq
                if (this.post.favour != 1) {
                    this.$http.get('/favour/likes/feedback/' + this.post.id)
                        .then((response) => {
                            if (response.status === 403) {
                                this.$router.push('/user/login')
                            }
                            this.post.favour = 1
                            this.post.likes = Number(this.post.likes) + Number(1)
                        })
                }
            },
            dislikes() {
                // eslint-disable-next-line eqeqeq
                if (this.post.favour != 0) {
                    this.$http.get('/favour/dislikes/feedback/' + this.post.id)
                        .then((response) => {
                            if (response.status === 403) {
                                this.$router.push('/user/login')
                            }
                            this.post.favour = 0
                            this.post.dislikes = Number(this.post.dislikes) + Number(1)
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>

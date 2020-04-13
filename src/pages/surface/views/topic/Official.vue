<template>
  <div class="official">
    <router-link :to="post.name ? '/post/name/'+post.name : '/post/id/'+post.id" v-for="post in posts" :key="post.id">
      <a-card hoverable :bordered="false" class="card border-radius">
        <img
          :alt="post.title"
          :src="post.banner"
          slot="cover"
        />
        <h2>{{ post.title }}</h2>
        <div class="digest">
          <p v-html="post.content"></p>
        </div>
        <p style="float: right">{{ post.author + ' 发布于 ' + moment(post.post_date).fromNow() }}</p>
      </a-card>
    </router-link>
    <a-pagination
      v-if="total_page > 1"
      :default-current="1"
      :total="total"
      :current="page"
      size="small"
      class="pagination"
      @change="get_list"
    />
    <div
      v-show="loading"
      class="loading"
    >
      <div class="wrapper center">
        <a-spin>
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 30px"
            spin
          />
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'

    require('moment/locale/zh-cn')
    moment.locale('zh-cn')

    export default {
        name: 'Official',
        data() {
            return {
                loading: true,
                total: 1,
                total_page: 1,
                page: 1,
                posts: [],
                moment
            }
        },
        beforeMount() {
            this.init()
        },
        watch: {
            '$route'() {
                this.init()
            }
        },
        methods: {
            init() {
                this.$http.get('/frontend/gallery_official/' + this.$route.params.id)
                    .then((response) => {
                        if (response.status === 200) {
                            this.posts = response.posts.posts
                            this.total = response.posts.total
                            this.total_page = response.posts.total_page
                            this.loading = false
                            this.$emit('gallery_init', {
                                gallery: response.gallery,
                                banners: response.banners,
                                subscribed: response.subscribed
                            })
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            get_list(pageNum = 1) {
                this.loading = true
                this.$http.get('/post/get_list/' + this.$route.params.id + '/' + pageNum)
                    .then((response) => {
                        if (response.status === 200) {
                            this.posts = response.posts
                            this.total = response.total
                            this.total_page = response.total_page
                            this.page = pageNum
                            this.loading = false
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
  .pagination {
    float: right;
    padding: 20px 0 0 0;
  }
</style>

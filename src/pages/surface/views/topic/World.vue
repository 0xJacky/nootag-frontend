<template>
  <div class="topic feedback">
    <CommonEditor
      :id="$route.params.id"
      ref="ce"
      module="feedback"
      :in-gallery="true"
      :autoload="false"
      @get_list="get_list"
    />
    <feedback-block
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />

    <a-pagination
      v-if="total_page > 1"
      :default-current="1"
      :default-page-size="5"
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
    import CommonEditor from '../../components/CommonEditor'
    import FeedbackBlock from '../../components/FeedbackBlock'

    export default {
        name: 'Feedback',
        components: {
            CommonEditor,
            FeedbackBlock
        },
        data() {
            return {
                loading: true,
                posts: [],
                total: 1,
                page: 1,
                total_page: 1
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
                this.loading = true
                this.$http.get('/frontend/gallery_feedback/' + this.$route.params.id)
                    .then((response) => {
                        if (response.status === 200) {
                            this.posts = response.posts.posts
                            this.total = response.posts.total
                            this.total_page = response.posts.total_page
                            this.$emit('gallery_init', {
                                gallery: response.gallery,
                                banners: response.banners,
                                subscribed: response.subscribed
                            })
                            this.loading = false
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            get_list(pageNum = 1) {
                this.loading = true
                this.$http.get('/feedback/get_list_with_content/' + this.$route.params.id + '/' + pageNum)
                    .then((response) => {
                        if (response.status === 200) {
                            this.posts = response.posts
                            this.total = response.total
                            this.page = pageNum
                            this.total_page = response.total_page
                            this.loading = false
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            likes(commentId) {
                this.$http.get('/favour/likes/feedback/' + commentId)
                    .then((response) => {
                        if (response.status === 403) {
                            this.$router.push('/user/login')
                        }
                    })
            },
            dislikes(commentId) {
                this.$http.get('/favour/dislikes/feedback/' + commentId)
                    .then((response) => {
                        if (response.status === 403) {
                            this.$router.push('/user/login')
                        }
                    })
            }
        }
    }
</script>

<style scoped>
  .pagination {
    text-align: right;
    padding: 20px 0 0 0;
  }

  .fullsearch {
    z-index: 2102 !important;
  }

  .save {
    text-align: right;
  }

</style>

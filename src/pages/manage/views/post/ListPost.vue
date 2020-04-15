<template>
  <div>
    <a-card title="所有文章">
      <router-link slot="extra" to="/post/add">写文章</router-link>
      <std-table
        :columns="columns"
        :api="api"
        data_key="posts"
        pagination_method="a"
        @clickEdit="id => {
          $router.push('/post/'+id)
        }"
        :soft_delete="true"
      />
    </a-card>
  </div>
</template>

<script>
  import StdTable from '~/manage/components/StdDataDisplay/StdTable'
  import post_columns from '~/manage/views/post/post'

  export default {
    name: 'ListPost',
    components: {StdTable},
    data() {
      return {
        api: this.$api.post,
        columns: post_columns
      }
    }
  }
</script>

<style scoped>

</style>

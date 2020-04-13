<template>
    <div>
        <a-card title="所有稿件">
            <router-link slot="extra" to="/post/add">写文章</router-link>
            <std-table
                :columns="columns"
                :api="api"
                data_key="posts"
                pagination_method="a"
                @clickEdit="id => {
          $router.push('/post/'+id+'/edit')
        }"
                :soft_delete="true"
            />
        </a-card>
    </div>
</template>

<script>
    import StdTable from '~/manage/components/StdDataDisplay/StdTable'
    import contribution_column from '~/manage/views/post/contribution_columns'

    export default {
        name: 'ListContribution',
        components: {StdTable},
        data() {
            return {
                api: this.$api.contribution,
                columns: contribution_column
            }
        }
    }
</script>

<style scoped>

</style>

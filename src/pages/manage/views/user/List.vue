<template>
    <a-card>
        <std-table
            :columns="columns"
            :api="api"
            data_key="users"
            pagination_method="a"
            @clickEdit="id => {
          $router.push('/user/'+id+'/edit')
       }"
        />
    </a-card>
</template>

<script>
    import StdTable from '~/manage/components/StdDataDisplay/StdTable'
    import user_columns from './user_colums'

    export default {
        name: 'ManageUser',
        components: {
            StdTable
        },
        data() {
            return {
                api: this.$api.user,
                columns: user_columns,
            }
        }
    }
</script>

<style scoped>
    .btn-group {
        float: right;
    }

    .nav-second-level {
        visibility: hidden;
    }

</style>

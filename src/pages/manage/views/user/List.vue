<template>
    <std-curd
        :columns="columns"
        :api="api"
        data_key="users"
        pagination_method="a"
    />
</template>

<script>
    import StdCurd from '~/manage/components/StdDataDisplay/StdCurd'
    import user_columns from './user_colums'

    export default {
        name: 'ManageUser',
        components: {
            StdCurd
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

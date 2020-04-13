<template>
    <std-curd
        :api="api"
        :columns="columns"
        :disable_search="true"
        :soft_delete="true"
    />
</template>

<script>
    import StdCurd from '~/manage/components/StdDataDisplay/StdCurd'
    import category_columns from '~/manage/views/post/category_columns'

    export default {
        name: 'ManageCategory',
        components: {
            StdCurd
        },
        data() {
            return {
                api: this.$api.category,
                columns: category_columns
            }
        }
    }
</script>

<style scoped>

</style>

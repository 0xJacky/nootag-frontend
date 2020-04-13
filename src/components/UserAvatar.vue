<template>
    <a-avatar :src="url" v-if="url" />
    <a-avatar icon="user" v-else />
</template>

<script>
    export default {
        name: 'UserAvatar',
        props: {
            url: String
        }
    }
</script>

<style scoped>

</style>

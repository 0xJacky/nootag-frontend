<template>
    <a-row class="post-page" justify="center" type="flex">
        <a-col :xs="24" :sm="22" :md="20" :lg="18" :xxl="16">
            <a-card>
                <a class="gohome" @click="$router.push('/').then()">返回首页</a>
                <h1 class="title" v-if="post.title">{{ post.title }}</h1>
                <span>{{ post.author }} 发布于 {{ post.created_at }} · {{ post.category }} · 浏览量 {{ post.visits }}</span>
                <a-divider/>
                <vue-markdown class="post-content" :source="post.content" v-if="post.content"/>
                <slot name="post"/>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
    import VueMarkdown from '~/surface/plugins/VueMarkdown'

    export default {
        name: 'PostPage',
        components: {VueMarkdown},
        props: {
            post: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        model: {
            prop: 'post',
            event: 'changePost'
        }
    }
</script>

<style lang="less">
    @import "post-content";

    .post-page .title {
        padding: 10px 0;
        font-weight: 300;
    }
</style>

<style lang="less" scoped>
    .post-page {
        position: relative;
        .gohome {
            position: absolute;
            top: -50px;
            left: 0;
            @media (max-width: 576px) {
                left: 15px;
            }
        }
    }
    .ant-card {
        margin: 0 0 40px 0;
        h2 {
            font-weight: 300;
            padding: 0 0 10px 0;
        }
    }
</style>

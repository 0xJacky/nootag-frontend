<template>
    <div>
        <a-card class="topic-content" :bordered="false">
            <div class="title">
                <div class="icon">
                    <a-avatar :src="topic.icon" size="large" shape="square"/>
                </div>
                <div class="subscribe-btn-group">
                    <a-dropdown v-if="subscribed">
                        <a-menu slot="overlay">
                            <a-menu-item key="1" @click="unsubscribe">
                                <a-icon type="close"/>
                                取消订阅
                            </a-menu-item>
                        </a-menu>
                        <a-button type="primary" ghost>
                            <a-icon type="check"/>
                            已订阅
                            <a-icon type="caret-down"/>
                        </a-button>
                    </a-dropdown>

                    <a-button
                        v-else
                        type="primary"
                        ghost
                        @click="subscribe"
                    >
                        <a-icon type="bell"/>
                        订阅
                    </a-button>
                </div>
                <div class="name">
                    <h2>{{ topic.name }}</h2>
                </div>
                <div class="description">
                    <p>{{ topic.description ? topic.description : '提供 '+topic.name+' 的最新资讯'}}</p>
                </div>
            </div>

            <a-divider/>

            <vue-markdown class="multi" :source="topic.multi"/>

            <a-menu v-model="group" mode="horizontal">
                <a-menu-item key="official">
                    精选资讯
                </a-menu-item>

                <a-menu-item key="stream">
                    时光流
                </a-menu-item>
            </a-menu>
        </a-card>
        <router-link :to="'/post/'+(post.post_name ? post.post_name : post.id)" v-for="post in topic.post" :key="post.id">
            <post-card :post="post"/>
        </router-link>
    </div>
</template>

<script>
    import VueMarkdown from '../../plugins/VueMarkdown'
    import PostCard from '@/components/PostCard/PostCard'

    export default {
        name: 'topic',
        components: {
            VueMarkdown,
            PostCard
        },
        data() {
            return {
                topic: {},
                group: [],
                loading: true,
                subscribed: false,
                banners: []
            }
        },
        created() {
            this.get()
        },
        watch: {
            '$route'() {
                this.get()
            }
        },
        methods: {
            get() {
                this.$api.topic.get(this.$route.params.id).then(r => {
                    this.topic = r
                })
            },
            subscribe() {

            },
            unsubscribe() {

            }
        }
    }
</script>

<style lang="less">
    .topic-content {
        .ant-card-body {
            padding: 30px;
        }
    }
</style>

<style lang="less" scoped>
    .post-card {
        margin: 30px 0 0 0;
    }

    .icon {
        float: left;
        padding: 0 15px 0 0;
    }

    .subscribe-btn-group {
        float: right;
    }

    .multi {
        padding: 5px 20px;
    }

    .ant-menu-item {
        width: 50%;
        text-align: center;
    }
</style>

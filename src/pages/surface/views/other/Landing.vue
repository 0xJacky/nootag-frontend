<template>
    <div>
        <a-drawer
                placement="left"
                :closable="false"
                :visible="morenews"
                @close="morenews=false"
                width="60%"
        >
            <h2>无派科技</h2>
            <a-divider/>
            <a-list itemLayout="horizontal" :dataSource="post_list">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta
                            :description="'发布于 ' + item.created_at"
                    >
                        <a slot="title" @click="$router.push('/post/'+(item.post_name?item.post_name:item.id)).then()">{{
                            item.title }}</a>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
            <std-pagination :pagination="pagination" @changePage="page => {getMoreNews(page)}"/>
        </a-drawer>
        <a-row class="landing">
            <a-col :xs="24">
                <p>nooTag</p>
                <h2>无派科技</h2>
            </a-col>
            <a-col :xs="24">
                <h1>让互联网属于每个人</h1>
            </a-col>
        </a-row>
        <a-divider/>
        <a-row class="center news">
            <a-col :xs="22" :sm="18">
                <div class="news-label">
                    <span class="left">最新动态</span>
                    <a class="right" @click="getMoreNews">更多新闻</a>
                </div>

                    <a-col :xs="24" :sm="12">
                        <span style="cursor: pointer"
                              @click="$router.push('/post/'+(headline.post_name?headline.post_name:headline.id)).then()">
                            <div class="headline">
                                <div class="img-container">
                                    <img class="image" :src="headline.banner"/>
                                </div>
                                <div class="meta">
                                    <h2>{{ headline.title }}</h2>
                                    <p>{{ headline.created_at }}</p>
                                </div>
                            </div>
                        </span>
                    </a-col>
                    <a-col :xs="12">
                        <a-col :xs="10" :sm="10" :md="11" class="post" v-for="post in posts" :key="post.id">
                        <span style="cursor: pointer"
                              @click="$router.push('/post/'+(post.post_name?post.post_name:post.id)).then()">
                            <div class="img-container">
                                <img class="image" :src="post.banner"/>
                            </div>
                            <div class="meta">
                                {{ post.title }}
                            </div>
                        </span>
                        </a-col>
                    </a-col>
            </a-col>
        </a-row>
        <a-row class="center news">
            <a-col :xs="22" :sm="18">
                <h2>我们的想法</h2>
                <a-card class="idea">
                    <div class="img">
                        <img :src="heart"/>
                    </div>
                    <div class="description">
                        <p>愿景：让互联网属于每一个人。</p>
                        <p>使命：以打造受人尊敬、直抵人心的产品为基本，致力于推动、打造去中心化的互联网。</p>
                        <p>价值观：迎接未来、发掘本质、坚持本心、坦诚相待、彼此信任。</p>
                    </div>

                </a-card>
            </a-col>
        </a-row>
        <a-row class="products center">
            <a-col :xs="22" :sm="18">
                <h2>无派科技出品</h2>
                <a-row class="products-card">
                    <a-col :xs="24" :sm="12" v-for="product in products" :key="product.name">
                        <product-card :card="product"/>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row class="center">
            <a-col :xs="23" :sm="18" class="contact-us">
                <h2>联系我们 hello@nooTag.tech</h2>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import StdPagination from "~/manage/components/StdDataDisplay/StdPagination";

    const products = [{
        icon: require('@/assets/img/logo.png'),
        name: '尝鲜派',
        description: '去中心化的软件众测社区',
        url: 'https://ibeta.me',
        appType: 'website',
        multi: 'iBeta 尝鲜派是一个属于数千万尝鲜派的聚集地。\n' +
                '\n' +
                '2017 年上线至今，聚集了数千万计的尝鲜派来这里体验测试版的 iOS 系统，并通过微博和 iOS 体验报告解决了「什么时候更新？」「去哪更新？」「更新了什么？」这三个问题，' +
                '而有了来自全世界各地的捐助以及志愿者的帮助，也让尝鲜派在初期发展地更好，' +
                '并将持续致力于为所有尝鲜派们打造一个更加优质、完善的尝鲜环境和服务。'
    }, {
        icon: require('@/assets/img/pasty_icon.png'),
        name: '啪唧相机',
        description: '用贴纸定义你的照片',
        url: '#',
        appType: 'app',
        multi: 'Pasty 水印相机是一个通过添加照片水印的方式表达你对所爱品牌认同的微信小程序。\n' +
                '\n' +
                '灵感来自于每个人都会有的时代：每个人的铅笔盒、背包、墙上都会贴满你所爱的明星、漫画人物的贴纸。\n' +
                '\n' +
                '能表达这种对文化、品牌的认同是 Pasty 之所以区别于其他水印软件的核心区别。\n' +
                '\n' +
                '上线虽然只有短暂的几个月，但如今已服务数百万人。'
    }]
    import ProductCard from "~/surface/components/ProductCard";

    export default {
        name: "Landing",
        components: {
            StdPagination,
            ProductCard
        },
        data() {
            return {
                heart: require('@/assets/img/heart.png'),
                products,
                headline: {},
                posts: [],
                morenews: false,
                post_list: [],
                pagination: {}
            }
        },
        created() {
            this.$api.surface.landing().then(r => {
                this.headline = r.posts.shift()
                this.posts = r.posts
            })
        },
        methods: {
            getMoreNews(page = 1) {
                this.morenews = true
                this.$api.post.get_list(page).then(r => {
                    this.post_list = r.posts
                    this.pagination = r.meta.pagination
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .landing {
        text-align: center;

        h1 {
            font-size: 50px;
            font-weight: 100;
            margin: 50px 0;
        }

        h2 {
            font-size: 40px;
            font-weight: 100;
        }

        p {
            font-size: 30px;
        }
    }

    .news {
        h2 {
            margin: 0 0 15px 0;
        }

        .news-label {
            height: 50px;
            padding: 0 0 5px 0;

            .left {
                float: left;
                font-size: 21px;
            }

            .right {
                float: right;
                font-size: 14px;
            }
        }

        .post {
            @media (max-width: 576px) {
                display: none;
            }
            margin: 0 0 15px 15px;
            height: 177px;
            overflow: hidden;

            .meta {
                color: #ffffff;
                position: absolute;
                left: 20px;
                bottom: 15px;
                font-size: 18px;
            }
        }

        .img-container {
            width: 100%;
            height: 0;
            padding-top: 100%;

            .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .headline {
            overflow: hidden;
            border: 1px solid #e8e8e8;
            position: relative;
            height: 370px;

            .meta {
                position: absolute;
                width: 90%;
                left: 25px;
                bottom: 0;
                color: #ffffff;

                h2 {
                    float: left;
                    margin-right: 15px;
                    color: #ffffff;
                }

                p {
                    line-height: 31px;
                }
            }
        }

        margin: 0 0 60px 0;
    }

    .idea {
        .img {
            float: left;
            margin: 0 25px 0 0;

            img {
                width: 64px;
            }
        }

        .description {
            p {
                padding: 3px 0;
            }
        }
    }

    .products {
        padding: 35px 0;
        background-color: rgba(142, 142, 144, 0.2);
        
        .products-card {
            .ant-col {
                padding: 30px 20px;
            }
        }
    }


    .contact-us {
        text-align: center;

        h2 {
            font-size: 40px;
            font-weight: 100;
            padding: 100px 0 0 0;
        }
    }

</style>

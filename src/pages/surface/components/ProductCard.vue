<template>
    <div class="product-card">
        <a-card :hoverable="true">
            <div class="card-content">
                <div class="icon">
                    <img :src="card.icon"/>
                </div>
                <div class="info">
                    <h2>{{ card.name }}</h2>
                    <p>{{ card.description }}</p>
                </div>
                <div class="action">
                    <span @click="visible=true"><a-icon type="compass" /></span>
                    <span v-if="card.appType==='website'"><a :href="card.url"><a-icon type="link" /></a></span>
                    <span v-else-if="card.appType==='app'"><a-icon type="wechat" /></span>
                </div>
            </div>
        </a-card>
        <a-modal :title="'关于'+card.name" v-model="visible" @ok="handleOk" :footer="false" :centered="true">
            <p>{{ card.multi }}</p>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: 'ProductCard',
        props: {
            card: Object
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            handleOk() {
                this.visible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .product-card {
        .ant-card {
            max-width: 360px;
            margin: 0 auto;
        }
    }
    .card-content {
        height: 100%;

        .icon {
            width: 80px;
            padding: 36px 0 0 0;
            margin: 0 auto;
            overflow: hidden;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }

        .info {
            text-align: center;
            padding: 13px;
            margin: 0 auto;
            white-space: normal;

            h2 {
                padding: 0 0 15px 0;
                font-weight: 200;
            }

            p {
                padding: 0 0 5px 0;
            }
        }

        .action {
            text-align: center;
            span {
                margin: 5px 10px;
            }
        }

    }

</style>

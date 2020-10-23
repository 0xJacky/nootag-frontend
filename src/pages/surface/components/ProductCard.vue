<template>
    <div class="product-card">
        <a-card :bordered="false" :hoverable="true">
            <div class="card-content">
                <div class="icon">
                    <img :src="card.icon"/>
                </div>
                <div class="info">
                    <p style="font-size: 15px; font-weight: bold; padding-bottom: 15px; padding-top: 10px;">{{ card.name }}</p>
                    <p style="color: #8e8e90">{{ card.description }}</p>
                </div>
                <div class="action">
                    <span v-if="card.appType==='website'"><a :href="card.url"><a-icon type="global" /></a></span>
                    <span @click="try_visible=true" v-else-if="card.appType==='app'"><a-icon type="wechat"/></span>
                    <span><a-icon type="info-circle" @click="visible=true"/></span>
                    <span><a :href="card.privacy_url"><a-icon type="container" @click="visible=true"/></a></span>
                </div>
            </div>
        </a-card>
        <a-modal :title="'关于 '+card.name" v-model="visible" @ok="handleOk" :footer="false" :centered="true">
            <p>{{ card.multi }}</p>
        </a-modal>
        <a-modal :title="即刻体验" v-model="try_visible" @ok="try_handleOk" :footer="false" :centered="true">
            <img src="@/assets/img/try_pasty.jpg" style="width: 100%;"/>
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
                visible: false,
                try_visible: false,
            }
        },
        methods: {
            handleOk() {
                this.visible = false
            },
            try_handleOk() {
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
            width: 250px;
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
            padding-top: 15px;
            span {
                margin: 5px 10px;
            }
        }

    }

</style>

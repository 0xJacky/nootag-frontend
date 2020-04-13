<template>
    <div class="home">
        <div class="card config">
            <div class="card-wrapper">
                <ul>
                    <li v-for="(v, index) in cards" :key="index">
                        <a-card
                            class="card gallery border-radius"
                            :bordered="false"
                        >
                            <a-card-meta
                                :title="index"
                                :description="v.description ? v.description : '提供 ' + index + ' 的更新方式'"
                            >
                                <a-avatar
                                    slot="avatar"
                                    shape="square"
                                    :src="v.icon"
                                />
                            </a-card-meta>
                            <div class="card-wrapper sub">
                                <ul>
                                    <li v-for="card in v.children" :key="card.id">
                                        <div
                                            class="card-block"
                                            :style="card.css"
                                        >
                                            <router-link :to="'/install/'+card.url">
                                                <div class="card-content">
                                                    <div class="pic">
                                                        <img
                                                            class="icon"
                                                            :src="card.icon"
                                                        >
                                                    </div>
                                                    <div class="info">
                                                        <h2>{{ card.name }}</h2>
                                                        <p>{{ card.build_id }}</p>
                                                        <p>{{ card.pub_time.replace(/-/g, '.') }}</p>
                                                        <p>{{ card.system_type }}</p>
                                                    </div>
                                                    <a-button ghost>
                                                        {{ card.button }}
                                                    </a-button>
                                                </div>
                                            </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="enter center">
                                <router-link :to="'/gallery/'+v.gallery_id">
                                    <a-button
                                        type="primary"
                                        style="width: unset"
                                        ghost
                                    >
                                        <a-icon type="message"/>
                                        进入讨论
                                    </a-button>
                                </router-link>
                            </div>
                        </a-card>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                card: {}
            }
        }
    }
</script>

<style scoped>

</style>

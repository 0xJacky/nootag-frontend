<template>
    <div class="std-form-card">
        <a-row
            :align="'middle'"
            :type="'flex'"
            class="container"
        >
            <a-col
                :xs="24"
                :sm="12"
                :md="10"
                :lg="8"
                :xl="6"
                :xxl="5"
                class="content"
            >
                <std-form-card-content
                    :options="options" :error="error"
                    @onSubmit="value => {$emit('onSubmit', value)}"/>
                <vue-particles
                    color="#dedede"
                    :particlesNumber="60"
                    :move-speed="3"
                    :click-effect="false"
                    :hover-effect="false"
                    class="particles"/>
            </a-col>
        </a-row>
    </div>

</template>

<script>
    import Vue from 'vue'
    import VueParticles from 'vue-particles'
    import StdFormCardContent from '@/components/StdFormCard/StdFormCardContent'

    Vue.use(VueParticles)

    export default {
        name: 'StdFormCard',
        components: {
            import StdFormCardContent from '@/components/StdFormCard/StdFormCardContent'
        },
        props: {
            options: Object,
            error: {
                type: Object,
                default() {
                    return {}
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .particles {
        position: fixed;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #f5f5f5;

        .content {
            max-width: 360px;
            margin: 0 auto;
        }
    }
</style>

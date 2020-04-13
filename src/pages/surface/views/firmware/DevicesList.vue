<template>
    <div>
        <h2>哪个型号？</h2>
        <p>请在下面选择您的设备型号</p>
        <a-row class="device-identifier">
            <a-col v-for="device in devices" :key="device.identifier ? device.identifier : device.device_name"
                   :xs="24" :sm="12" :md="8">
                <a-button type="primary" @click="$emit('identifier', device.identifier ? device.identifier : device.device_name)" ghost>{{ device.show_name }}</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'DevicesList',
        props: {
            devices: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style lang="less">
    .device-identifier {
        span {
            word-break:normal;
            width:auto;
            display:block;
            white-space:pre-wrap;
            word-wrap : break-word ;
            overflow: hidden ;
        }
    }
</style>

<style lang="less" scoped>
    button {
        margin: 10px auto;
        width: 80%;
        @media (max-width: 375px) {
            width: 100%;
        }
        display: table;
        border-radius: 12px;
        font-size: 13px;
        min-height: 40px;
    }
</style>

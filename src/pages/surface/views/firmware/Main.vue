<template>
    <div class="content firmware">
        <h1 class="page-title">iOS 固件下载</h1>
        <p style="text-align: center;">致敬我的第一个项目</p>
        <a-card :bordered="false">
            <div
                class="source"
            >
                <img :src="penguin"> IPSW.me &
                <a-icon
                    type="apple"
                    :theme="'filled'"
                />
                Apple
            </div>
            <a href="javascript:;" @click="tab--" v-if="tab!==1">返回上一级</a>
            <a-tabs type="card" v-model="tab">
                <a-tab-pane tab="Tab Title 1" :key="1">
                    <h2>固件下载</h2>
                    <p>请在下面选择您想下载的 iOS/iPadOS/tvOS 设备固件类型</p>
                    <a-row>
                        <a-col :xs="24" :sm="12">
                            <a-button type="primary" @click="first('stable')" ghost>正式版</a-button>
                        </a-col>
                        <a-col :xs="24" :sm="12">
                            <a-button type="primary" @click="first('beta')" ghost>开发者测试版</a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane tab="Tab Title 2" :key="2">
                    <h2>哪种设备？</h2>
                    <p>请在下面选择您的设备类型</p>
                    <a-row>
                        <a-col :xs="12" :sm="12" :md="6" v-for="(v,k) in device_group" :key="k">
                            <a-button type="primary" @click="second(k)" ghost>{{ v }}</a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane tab="Tab Title 3" :key="3">
                    <devices-list :devices="devices" @identifier="third"/>
                </a-tab-pane>
                <a-tab-pane tab="Tab Title 4" :key="4">
                    <firmwares-list :firmwares="firmwares" :type="type" @build_id="fourth"/>
                </a-tab-pane>
                <a-tab-pane tab="Tab Title 5" :key="5">
                    <firmware-detail :info="info" :type="type" />
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script>
    import DevicesList from './DevicesList'
    import FirmwaresList from './FirmwaresList'
    import FirmwareDetail from '~/surface/views/firmware/FirmwareDetail'

    const device_group = {
        iPhone: 'iPhone',
        iPad: 'iPad',
        iPod: 'iPod touch',
        TV: 'Apple TV'
    }

    export default {
        name: 'Firmware',
        components: {FirmwareDetail, FirmwaresList, DevicesList},
        data() {
            return {
                type: null,
                group: null,
                device_group,
                devices: [],
                firmwares: [],
                info: {},
                penguin: require('@/assets/img/penguin.png'),
                identifier: null,
                build_id: null,
                tab: 1
            }
        },
        methods: {
            next_tab(now) {
                // 防止手速快引起发奇怪的问题
                if (this.tab === now) {
                    this.tab++
                }
            },
            first(type) {
                this.type = type
                this.next_tab(1)
            },
            second(group) {
                this.group = group
                if (this.type === 'stable') {
                    this.$api.apple.devices(group).then(r => {
                        this.devices = r.devices
                        this.next_tab(2)
                    })
                } else {
                    this.$api.apple.beta_devices(group).then(r => {
                        this.devices = r.devices
                        this.next_tab(2)
                    })
                }
            },
            third(identifier) {
                this.identifier = identifier
                if (this.type === 'stable') {
                    this.$api.apple.firmwares(identifier).then(r => {
                        this.firmwares = r.firmwares
                        this.next_tab(3)
                    })
                } else {
                    this.$api.apple.beta_firmwares(identifier).then(r => {
                        this.firmwares = r.firmwares
                        this.next_tab(3)
                    })
                }
            },
            fourth(build_id) {
                this.build_id = build_id
                if (this.type === 'stable') {
                    this.$api.apple.firmware_info(this.identifier, build_id).then(r => {
                        this.info = r
                        this.next_tab(4)
                    })
                } else {
                    this.$api.apple.beta_firmware_info(this.identifier, build_id).then(r => {
                        this.info = r
                        this.next_tab(4)
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    .firmware {
        h2 {
            font-weight: 300;
        }
        .ant-tabs-bar {
            // comment the following line when debugging
            display: none;
        }
    }
</style>

<style lang="less" scoped>
    .content {
        padding: 20px 0;
        @media(max-width: 414px) {
            padding: 0
        ;
        }
    }

    .page-title {
        font-weight: 300;
        font-size: 36px;
        text-align: center;
        padding: 20px 0;
    }

    .ant-card {
        max-width: 900px;
        margin: 30px auto;

        h2 {
            font-weight: 300;
        }
    }

    .source {
        font-size: 11px;
        color: #8e8e90;
    }

    .source img {
        height: 20px;
        border-radius: 50%;
    }

    .ant-row {
        padding: 20px 0 0 0;
    }

    button {
        margin: 10px auto;
        display: table;
        width: 70%;
        border-radius: 12px;
        font-size: 13px;
    }

</style>

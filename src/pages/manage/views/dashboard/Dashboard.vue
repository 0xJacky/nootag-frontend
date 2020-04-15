<template>
    <div>
        <a-row class="row-two">
            <a-col :sm="24" :lg="15">
                <a-card title="后端服务器实时数据" style="min-height: 250px">
                    <a-row>
                        <a-col :sm="24" :lg="12" class="chart">
                            <a-statistic title="CPU" :value="cpu" style="margin: 0 50px 10px 0">
                                <template v-slot:suffix>
                                    <span>%</span>
                                </template>
                            </a-statistic>
                            <mini-smooth-area :data-source="cpu_analytic"/>
                        </a-col>
                        <a-col :sm="10" :lg="6" class="chart">
                            <span>实际内存占用</span>
                            <div>
                                <a-progress :percent="memory.pressure" type="circle" strokeColor="rgb(135, 208, 104)"/>
                            </div>
                        </a-col>
                        <a-col :sm="10" :lg="6" class="chart">
                            <span>存储空间</span>
                            <div>
                                <a-tooltip
                                    :title="'已使用: '+bytesToSize(disk.total - disk.free) + '/ 总共: ' + bytesToSize(disk.total)">
                                    <a-progress :percent="disk.percent" type="circle"/>
                                </a-tooltip>
                            </div>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :sm="24" :lg="9">
                <a-card title="MySQL 监控" style="min-height: 250px">
                    <a-statistic title="每秒查询量(QPS)" :value="mysql_qps" style="margin: 0 50px 10px 0"/>
                    <mini-smooth-area :data-source="mysql_analytic"/>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Viser from 'viser-vue'
    import MiniSmoothArea from '~/manage/components/Charts/MiniSmoothArea'

    Vue.use(Viser)

    export default {
        name: 'Dashboard',
        components: {
            MiniSmoothArea
        },
        data() {
            return {
                loading: true,
                stat: {},
                memory: {},
                disk: {},
                mysql_analytic: [],
                mysql_qps: 0,
                cpu_analytic: [],
                cpu: 0,
                google_analytic: {
                    total: {
                        today: {},
                        yesterday: {}
                    }
                }
            }
        },
        created() {
            this.loading = false
            window.InitSetInterval = setInterval(() => {
                this.$api.analytic.mysql().then(r => {
                    if (this.mysql_analytic.length > 15) {
                        this.mysql_analytic.shift()
                    }
                    this.mysql_analytic.push(r)
                    this.mysql_qps = r.y
                })

                this.$api.analytic.server().then(r => {
                    if (this.cpu_analytic.length > 15) {
                        this.cpu_analytic.shift()
                    }
                    this.cpu_analytic.push(r.cpu)
                    this.cpu = r.cpu.y
                    this.memory = r.memory
                    this.disk = r.disk
                })

            }, 1000)
        },
        destroyed() {
            window.clearInterval(window.InitSetInterval)
        },
        methods: {
            bytesToSize(bytes) {
                if (bytes === 0) return '0 B'

                const k = 1024

                const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

                const i = Math.floor(Math.log(bytes) / Math.log(k))
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
            },
        },
        filters: {
            NumberFormat: (value) => {
                if (!value) {
                    return '0'
                }
                const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                return intPartFormat
            }
        }
    }
</script>

<style lang="less" scoped>
    .ant-card {
        margin: 10px;
        @media (max-width: 512px) {
            margin: 10px 0;
        }

        .chart-card-content, .chart-wrapper, .chart {
            overflow: hidden;
        }
    }

    .row-two {
        .ant-card-body {
            min-height: 255px;
        }
    }
</style>

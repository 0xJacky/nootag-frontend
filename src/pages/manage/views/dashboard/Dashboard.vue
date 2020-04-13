<template>
    <div>
        <a-row>
            <!--网站访问量-->
            <a-col :xs="24" :sm="12" :md="12" :lg="6">
                <chart-card :loading="loading" title="今日访问" :total="google_analytic.total.today.pageViews">
                    <div>
                        <mini-area :data="google_analytic.total.page_views"/>
                    </div>
                    <template slot="footer">
                        昨日访问量<span> {{ google_analytic.total.yesterday.pageViews | NumberFormat }}</span>
                    </template>
                </chart-card>
            </a-col>

            <!--今日访客-->
            <a-col :xs="24" :sm="12" :md="12" :lg="6">
                <chart-card :loading="loading" title="今日访客" :total="google_analytic.total.today.visitors">
                    <div>
                        <mini-bar :data="google_analytic.total.visitors"/>
                    </div>
                    <template slot="footer">
                        昨日访客<span> {{ google_analytic.total.yesterday.visitors | NumberFormat }}</span>
                    </template>
                </chart-card>
            </a-col>

            <!--总收入-->
            <a-col :xs="24" :sm="12" :md="12" :lg="6">
                <chart-card :loading="loading" :precision="2" title="总收入(CNY)" :total="analytic.income.total">
                    <a-tooltip title="指标说明" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <trend :type="analytic.income.chain>=0" style="margin-right: 16px;" term="日同比"
                               :percentage="analytic.income.chain"/>
                    </div>
                    <template slot="footer">30天收入<span>￥ {{ analytic.income.month | NumberFormat }}</span></template>
                </chart-card>
            </a-col>

            <!--注册量-->
            <a-col :xs="24" :sm="12" :md="12" :lg="6">
                <chart-card :loading="loading" title="注册用户" :total="analytic.users.total">
                    <div>
                        <mini-area :data="analytic.users.fortnight_reg"/>
                    </div>
                    <template slot="footer">今日注册<span> {{ analytic.users.today_reg | NumberFormat }}</span></template>
                </chart-card>
            </a-col>
        </a-row>

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
                                    :title="'已使用: '+bytesToSize(analytic.disk.total - analytic.disk.free) + '/ 总共: ' + bytesToSize(analytic.disk.total)">
                                    <a-progress :percent="analytic.disk.percent" type="circle"/>
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
        <a-row class="row-three">
            <a-col :sm="24" :lg="8">
                <a-card title="热门页面">
                    <a-table
                        :columns="most_visited_pages_columns"
                        :rowKey="record => record.url"
                        :dataSource="google_analytic.most_visited_pages"
                        :pagination="{pageSize: 5}"
                        :loading="loading"
                        size="small"
                    />
                </a-card>
            </a-col>
            <a-col :sm="24" :lg="8">
                <a-card title="Card 下载量">
                    <a-statistic title="总体下载量" :value="analytic.cards.total_download_times"
                                 style="margin: 0 50px 30px 0"/>
                    <a-table
                        :columns="card_analytic_columns"
                        :rowKey="record => record.id"
                        :dataSource="analytic.cards.data"
                        :pagination="{pageSize: 4}"
                        :loading="loading"
                        size="small"
                    />
                </a-card>
            </a-col>
            <a-col :sm="24" :lg="8">
                <a-card title="其他数据统计">
                    <a-row>
                        <a-col :sm="8">
                            <a-statistic title="反馈总量" :value="analytic.issues.total" style="margin: 0 50px 30px 0"/>
                        </a-col>
                        <a-col :sm="8">
                            <a-statistic title="未处理" :value="analytic.issues.unsolved" :valueStyle="{color:'#cf1322'}"
                                         style="margin: 0 50px 30px 0"/>
                        </a-col>
                        <a-col :sm="8">
                            <a-statistic title="已处理" :value="analytic.issues.solved" :valueStyle="{color:'#3f8600'}"
                                         style="margin: 0 50px 30px 0"/>
                        </a-col>
                    </a-row>
                    <a-table
                        :columns="apple_analytic_columns"
                        :rowKey="record => record.category"
                        :dataSource="analytic.apple"
                        :pagination="false"
                        :loading="loading"
                        size="small"
                    />
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Viser from 'viser-vue'

    import {
        ChartCard,
        MiniArea,
        MiniBar,
        Trend,
    } from '~/manage/components/Charts'
    import MiniSmoothArea from '~/manage/components/Charts/MiniSmoothArea'

    Vue.use(Viser)

    const most_visited_pages_columns = [{
        title: '页面',
        dataIndex: 'url'
    }, {
        title: '名称',
        dataIndex: 'pageTitle'
    }, {
        title: '访问量',
        dataIndex: 'pageViews'
    }]

    const card_analytic_columns = [{
        title: 'ID',
        dataIndex: 'id'
    }, {
        title: '名称',
        dataIndex: 'name'
    }, {
        title: '下载量',
        dataIndex: 'download_times'
    }]

    const apple_analytic_columns = [{
        title: '项目',
        dataIndex: 'category'
    }, {
        title: '数量',
        dataIndex: 'total'
    }]

    export default {
        name: 'Dashboard',
        components: {
            MiniSmoothArea,
            ChartCard,
            MiniArea,
            MiniBar,
            Trend
        },
        data() {
            return {
                card_analytic_columns,
                apple_analytic_columns,
                most_visited_pages_columns,
                loading: true,
                stat: {},
                analytic: {
                    income: {},
                    users: {},
                    cards: {},
                    apple: [],
                    issues: [],
                    disk: {},
                },
                memory: {},
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
            this.$api.analytic.get().then(r => {
                this.analytic = r
            })
            this.$api.analytic.google().then(r => {
                this.google_analytic = r
            })
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

    .row-three {
        .ant-card {
            min-height: 377px;
        }
    }
</style>

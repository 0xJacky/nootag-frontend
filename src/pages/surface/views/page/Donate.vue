<template>
    <post-page>
        <div slot="post">
            <h1 class="title">捐助榜</h1>
            <p style="text-align: center">微信扫描下方二维码</p>
            <p style="text-align: center">即可向我们捐赠</p>
            <div class="donate">
                <div class="left-thanks">
                    <img :src="left">
                </div>
                <div class="qr-code">
                    <img :src="donateQrCode"/>
                </div>
                <div class="right-thanks">
                    <img :src="right">
                </div>
                <div class="clear"/>
                <a-menu mode="horizontal" class="menu" v-model="selected">
                    <a-menu-item key="2">大老板</a-menu-item>
                    <a-menu-item key="1">老板</a-menu-item>
                    <a-menu-item key="0">好心人</a-menu-item>
                </a-menu>
                <a-table
                    class="donate-table"
                    :columns="columns"
                    :rowKey="record => record.id"
                    :dataSource="donates"
                    :pagination="false"
                    :loading="loading"
                    size="small"
                />
                <std-pagination :pagination="pagination" @changePage="get_list"/>
            </div>
        </div>
    </post-page>
</template>

<script>
    import PostPage from '~/surface/components/PostPage/PostPage'
    import StdPagination from '~/manage/components/StdDataDisplay/StdPagination'

    const columns = [{
        title: '昵称',
        dataIndex: 'name',
        scopedSlots: {customRender: 'name'},
        align: 'center',
        width: '33.333%'
    }, {
        title: '捐助金额',
        dataIndex: 'money',
        align: 'center',
        width: '33.333%'
    }, {
        title: '日期',
        dataIndex: 'created_at',
        align: 'center',
        width: '33.333%'
    }]
    export default {
        name: 'Donate',
        components: {StdPagination, PostPage},
        data() {
            return {
                columns,
                left: require('@/assets/img/left.png'),
                right: require('@/assets/img/right.png'),
                donateQrCode: require('@/assets/img/donate.jpg'),
                donates: [],
                pagination: {},
                loading: true,
                selected: ['0'],
                params: {
                    group: 0
                }
            }
        },
        watch: {
            selected() {
                this.params['group'] = this.selected[0]
                this.$nextTick(() => {
                    this.get_list()
                })
            }
        },
        created() {
            this.get_list()
        },
        methods: {
            get_list(page = 1) {
                this.loading = true
                this.params['page'] = page
                this.$api.surface.donate(this.params).then(r => {
                    this.loading = false
                    this.donates = r.donates
                    this.pagination = r.meta.pagination
                })
            }
        }
    }
</script>

<style lang="less">
    .donate-table .ant-table-small {
        border: unset;

        .ant-table-tbody {
            td {
                border: unset;
            }
        }

        .ant-table-thead {
            th {
                border: unset!important;
            }
        }

    }
</style>

<style lang="less" scoped>
    .donate {
        max-width: 660px;
        margin: 0 auto;
    }

    .left-thanks img {
        width: 33%;
        float: left;
        padding: 30px 0 0 0;
    }

    .qr-code img {
        width: 33%;
        float: left;
    }

    .right-thanks img {
        width: 33%;
        float: left;
        padding: 30px 0 0 0;
    }

    .ant-menu-item {
        width: (1/3)*100%;
        text-align: center;
    }

</style>

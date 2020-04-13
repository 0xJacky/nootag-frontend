<template>
    <div>
        <h2>哪个版本？</h2>
        <p>请选择您需要下载的固件版本</p>
        <a-table
            :columns="displayColumns(columns)"
            :customRow="row"
            :rowKey="record => record.id"
            :dataSource="firmwares"
            :pagination="false"
            size="small"
        >
            <template slot="signing" slot-scope="text">
                <a-badge v-if="text === 1" status="success"/>
                <a-badge status="error" v-else/>
            </template>

        </a-table>
    </div>
</template>

<script>
    const columns = [{
        title: '设备型号',
        dataIndex: 'show_name',
        scopedSlots: {customRender: 'show_name'},
        align: 'center'
    }, {
        title: '版本',
        dataIndex: 'version',
        scopedSlots: {customRender: 'version'},
        align: 'center'
    }, {
        title: 'Build ID',
        dataIndex: 'buildid',
        scopedSlots: {customRender: 'buildid'},
        align: 'center'
    }, {
        title: '验证状态',
        dataIndex: 'signing',
        scopedSlots: {customRender: 'signing'},
        align: 'center',
        hideInBeta: true
    }]

    export default {
        name: 'FirmwaresList',
        props: {
            firmwares: {
                type: Array,
                default() {
                    return []
                }
            },
            type: {
                type: String,
                default() {
                    return 'stable'
                }
            }
        },
        data() {
            return {
                columns
            }
        },
        methods: {
            row(record) {
                return {
                    on: {
                        click: () => {
                            this.$emit('build_id', record.buildid)
                        }
                    }
                }
            },
            displayColumns(columns) {
                if (this.type === 'beta') {
                    return columns.filter(c => {
                        return c.hideInBeta !== true
                    })
                }
                return columns
            }
        }
    }
</script>

<style lang="less" scoped>
    p {
        padding: 0 0 10px 0;
    }
</style>

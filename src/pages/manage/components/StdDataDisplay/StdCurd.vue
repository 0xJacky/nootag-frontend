<template>
    <div>
        <a-card title="列表">
            <a slot="extra" @click="add" v-if="!disable_add">添加</a>
            <std-table
                :columns="columns"
                :api="api"
                :disable_search="disable_search"
                :pagination_method="pagination_method"
                :data_key="data_key"
                ref="table"
                @clickEdit="edit"
                :soft_delete="soft_delete"
            />
        </a-card>
        <a-modal
            :title="data.id ? '编辑 ID: ' + data.id : '添加'"
            :visible="visible"
            ok-text="保存"
            cancel-text="取消"
            :mask="false"
            @ok="ok"
            @cancel="visible=false;error={}"
        >
            <std-data-entry :data-list="editableColumns(columns)" :data-source="data" :error="error" ref="std_data_entry"/>
        </a-modal>
    </div>
</template>

<script>
    import StdTable from '~/manage/components/StdDataDisplay/StdTable'
    import StdDataEntry from '~/manage/components/StdDataEntry/StdDataEntry'

    export default {
        name: 'StdCurd',
        components: {
            StdTable,
            StdDataEntry
        },
        props: {
            api: Object,
            columns: Array,
            data_key: {
                type: String,
                default: 'data'
            },
            pagination_method: {
                default: 'b',
                validator: function (value) {
                    return ['a', 'b', 'none'].indexOf(value) !== -1
                }
            },
            disable_search: {
                type: Boolean,
                default: false
            },
            disable_add: {
                type: Boolean,
                default: false
            },
            soft_delete: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false,
                data: {
                    id: null,
                },
                error: {}
            }
        },
        methods: {
            editableColumns(columns) {
                return columns.filter((c) => {
                    return c.edit
                })
            },
            uploadColumns(columns) {
                return columns.filter((c) => {
                    return c.edit && c.edit.type === 'upload'
                })
            },
            add() {
                this.visible = true
                this.data = {
                    id: null
                }
            },
            ok() {
                this.api.save((this.data.id ? this.data.id : null), this.data).then(r => {
                    this.$message.success('保存成功')
                    const refs = this.$refs.std_data_entry.$refs
                    this.uploadColumns(this.columns).forEach(c => {
                        const t = refs['std_upload_' + c.dataIndex][0]
                        if (t) {
                            t.upload()
                        }
                        delete r[c.dataIndex]
                    })
                    this.data = this.extend(this.data, r)
                    this.$refs.table.get_list()
                }).catch(error => {
                    this.$message.error('保存失败')
                    this.error = error.errors
                })
            },
            edit(id) {
                this.api.get(id).then(r => {
                    this.data = r
                    this.visible = true
                }).catch(() => {
                    this.$message.error('服务器错误')
                })
            }
        }
    }
</script>

<style scoped>

</style>

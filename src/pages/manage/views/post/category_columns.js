const category_columns = [{
    title: 'ID',
    dataIndex: 'id',
    scopedSlots: {customRender: 'id'},
    pithy: true
}, {
    title: '名称',
    dataIndex: 'name',
    scopedSlots: {customRender: 'name'},
    edit: {
        type: 'input'
    },
    pithy: true
}, {
    title: '创建时间',
    dataIndex: 'created_at',
    scopedSlots: {customRender: 'created_at'}
}, {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: {customRender: 'action'}
}]

export default category_columns

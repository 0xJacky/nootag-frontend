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
    title: '描述',
    dataIndex: 'description',
    scopedSlots: {customRender: 'description'},
    edit: {
        type: 'input'
    },
    pithy: true
}, {
    title: '更多',
    dataIndex: 'multi',
    display: false,
    scopedSlots: {customRender: 'multi'},
    edit: {
        type: 'textarea'
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

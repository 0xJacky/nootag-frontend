const user_columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        scopedSlots: {customRender: 'id'},
        pithy: true
    }, {
        title: '昵称',
        dataIndex: 'name',
        scopedSlots: {customRender: 'name'},
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        },
        pithy: true,
        edit: {
            type: 'input'
        }
    }, {
        title: '邮箱',
        dataIndex: 'email',
        scopedSlots: {customRender: 'email'},
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        },
        pithy: true,
        edit: {
            type: 'input'
        }
    }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: {customRender: 'action'}
    }
]

export default user_columns

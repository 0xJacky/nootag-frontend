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
        pithy: true
    }, {
        title: '用户组',
        dataIndex: 'user_group',
        scopedSlots: {customRender: 'user_group'},
        pithy: true
    }, {
        title: 'Level',
        dataIndex: 'level',
        scopedSlots: {customRender: 'level'},
        sorter: true,
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        },
        pithy: true
    }, {
        title: '邮箱',
        dataIndex: 'email',
        scopedSlots: {customRender: 'email'},
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        }
    }, {
        title: '手机',
        dataIndex: 'phone',
        scopedSlots: {customRender: 'phone'},
        default: '无记录',
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        }
    }, {
        title: '注册时间',
        dataIndex: 'created_at',
        scopedSlots: {customRender: 'created_at'}
    }, {
        title: '上次活跃',
        dataIndex: 'last_active',
        scopedSlots: {customRender: 'last_active'},
        default: '无记录'
    }, {
        title: '邮箱验证',
        dataIndex: 'email_verify',
        scopedSlots: {customRender: 'email_verify'},
        badge: true,
        mask: {
            true: '否',
            false: '是'
        },
        search: {
            type: 'checkbox',
            condition: 'verified_email',
            default: true,
            labelCol: 20,
            wrapperCol: 2
        }
    }, {
        title: '状态',
        dataIndex: 'active',
        scopedSlots: {customRender: 'active'},
        badge: true,
        mask: {
            true: '正常',
            false: '禁用'
        },
        search: {
            type: 'checkbox',
            default: true,
            labelCol: 18,
            wrapperCol: 2
        },
        pithy: true
    }, {
        title: '积分',
        dataIndex: 'credits',
        scopedSlots: {customRender: 'credits'},
        sorter: true
    }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: {customRender: 'action'}
    }
]

export default user_columns

const post_columns = [{
  title: 'ID',
  dataIndex: 'id',
  scopedSlots: {customRender: 'id'},
  sorter: true,
  pithy: true
}, {
  title: '标题',
  dataIndex: 'title',
  scopedSlots: {customRender: '_title'},
  search: {
    type: 'input'
  },
  pithy: true
}, {
  title: '作者',
  dataIndex: 'author',
  scopedSlots: {customRender: 'author'},
  search: {
    type: 'input'
  },
  pithy: true
}, {
  title: '发布时间',
  dataIndex: 'created_at',
  scopedSlots: {customRender: 'created_at'},
  sorter: true
}, {
  title: '分类',
  dataIndex: 'category',
  scopedSlots: {customRender: 'category'},
  search: {
    type: 'input',
    labelCol: 6,
    wrapperCol: 16
  },
  pithy: true
}, {
  title: '状态',
  dataIndex: 'post_status',
  scopedSlots: {customRender: 'post_status'},
  badge: true,
  mask: {
    0: '草稿',
    1: '审核',
    2: '正常'
  },
  search: {
    type: 'slider',
    min: 0,
    max: 2,
    labelCol: 6,
    wrapperCol: 16
  },
  pithy: true
}, {
  title: '阅读数',
  dataIndex: 'visits',
  scopedSlots: {customRender: 'visits'},
  sorter: true
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: {customRender: 'action'},
}]

export default post_columns

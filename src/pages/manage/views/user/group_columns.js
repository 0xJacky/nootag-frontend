const group_columns = [{
  title: 'ID',
  dataIndex: 'id',
  scopedSlots: {customRender: 'id'},
  sorter: true,
  pithy: true
}, {
  title: '名称',
  dataIndex: 'name',
  scopedSlots: {customRender: 'name'},
  pithy: true,
  edit: {
    type: 'input'
  }
}, {
  title: '描述',
  dataIndex: 'description',
  scopedSlots: {customRender: 'description'},
  pithy: true,
  edit: {
    type: 'input'
  }
}, {
  title: '权限',
  dataIndex: 'power',
  scopedSlots: {customRender: 'power'},
  sorter: true,
  pithy: true,
  edit: {
    type: 'number',
    min: 0,
    max: 10,
    step: 1,
  }
}, {
  title: '创建时间',
  dataIndex: 'created_at',
  scopedSlots: {customRender: 'created_at'},
  pithy: true
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: {customRender: 'action'},
}]

export default group_columns

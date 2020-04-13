<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="galleries"
      :row-key="'id'"
      :pagination="false"
    >
      <template
        slot="id"
        slot-scope="text"
      >
        {{ text }}
      </template>
      <template
        slot="name"
        slot-scope="text"
      >
        {{ text == null ? '无名称' : text }}
      </template>
      <span slot="action" slot-scope="text, record" v-if="showTools">
          <a href="javascript:;"
             @click="edit(record.id)">编辑</a>
          <a-divider type="vertical"/>
          <a href="javascript:;" @click="rm(record.id)">删除</a>
        </span>
    </a-table>
    <a-pagination
      :default-current="1"
      :total="total"
      :current="page"
      class="pagination"
      @change="get_list"
      :defaultPageSize="20"
    />
  </div>
</template>

<script>
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        scopedSlots: {customRender: 'id'}
    }, {
        title: '昵称',
        dataIndex: 'name',
        scopedSlots: {customRender: 'name'}
    }]

    export default {
        name: 'GalleryList',
        props: {
            showTools: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                page: 1,
                total: 1,
                galleries: [],
                columns
            }
        },
        beforeCreate() {
            if (this.showTools) {
                columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    scopedSlots: {customRender: 'action'}
                })
            }
        },
        beforeMount() {
            this.get_list()
        },
        methods: {
            get_list(pageNum = 1) {
                this.$http.get('/gallery/get_list?page=' + pageNum)
                    .then((response) => {
                        if (response.status === 200) {
                            this.total = response.total
                            this.galleries = response.galleries
                        } else {
                            this.$message.error('服务器错误')
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
            },
            edit(id) {
                this.show_editor = true
                this.$http.get('/gallery/get/' + id)
                    .then((response) => {
                        if (response.status === 200) {
                            this.update = response.gallery
                            this.icon = response.gallery.icon
                        } else {
                            this.$message.error('服务器错误')
                            // eslint-disable-next-line no-console
                            console.log(response)
                        }
                    })
                if (Object(this.categories).length === 0) {
                    this.get_category_list()
                }
            },
            rm(id) {
                this.$http.post('/gallery/delete', {'id': id})
                    .then((response) => {
                        if (response.status !== 200) {
                            this.$message.error('服务器错误')
                            // eslint-disable-next-line no-console
                            console.log(response)
                        } else {
                            this.$message.success('ID: ' + id + ' 删除成功')
                            this.get_list()
                        }
                    })
            },

        }

    }
</script>

<style scoped>

</style>

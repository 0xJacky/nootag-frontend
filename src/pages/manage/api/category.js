import http from '@/lib/http'

const baseUrl = '/admin/category'

const category = {
  get_list(params) {
    return http.get('/admin/categories', {params: params})
  },

  get(id) {
    return http.get(baseUrl + '/' + id)
  },

  save(id = null, data) {
    return http.post(baseUrl + (id ? '/' + id : ''), data)
  },

  destroy(id) {
    return http.delete(baseUrl + '/' + id)
  },

  restore(id) {
    return http.patch(baseUrl, '/', id)
  }
}

export default category

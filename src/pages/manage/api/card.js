import http from '@/lib/http'

const card = {
  get(id) {
    return http.get('/admin/card/' + id)
  },

  get_list(params = null) {
    return http.get('/admin/cards', {params: params})
  },

  save(id, card) {
    return http.post('/admin/card' + (id ? '/' + id : ''), card)
  },

  delete(id) {
    return http.delete('/admin/card/' + id)
  },

  restore(id) {
    return http.patch('/admin/card/' + id)
  },

  upload_icon(id, file) {
    return http.post('/admin/card/' + id + '/icon', file, {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
  },

  upload_config(id, file) {
    return http.post('/admin/card/' + id + '/config', file, {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
  }

}

export default card

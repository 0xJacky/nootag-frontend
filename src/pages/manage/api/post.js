import http from '@/lib/http'

const baseUrl = '/admin/post'

const post = {
  get_list(params) {
    params['post_type'] = 'post'
    return http.get(baseUrl + 's', {params: params})
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
    return http.patch(baseUrl + '/' + id)
  },

  upload_banner(id, file, token) {
    return http.post(baseUrl + '/' + id + '/banner', file, {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8', 'Token': token}})
  },

  upload_images(id, files, token) {
    return http.post(baseUrl + '/' + id + '/images', files, {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8', 'Token': token}})
  },

  delete_image(id, file_id) {
    return http.delete(baseUrl + '/' + id + '/image/' + file_id)
  }
}

export default post

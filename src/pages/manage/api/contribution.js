import http from '@/lib/http'

const baseUrl = '/admin/post'

const contribution = {
  get_list(params) {
    params['post_type'] = 'contribution'
    return http.get(baseUrl + 's', {params: params})
  },

  destroy(id) {
    return http.delete(baseUrl + '/' + id)
  },

  restore(id) {
    return http.patch(baseUrl + '/' + id)
  }

}

export default contribution

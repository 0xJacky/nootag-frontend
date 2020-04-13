import http from '@/lib/http'

const baseUrl = '/admin/settings'
const settings = {
  get_all() {
    return http.get(baseUrl)
  },

  update(data) {
    return http.post(baseUrl, data)
  },

  cache() {
    return http.put(baseUrl)
  }
}

export default settings

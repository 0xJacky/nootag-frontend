import http from '@/lib/http'

const baseUrl = '/admin/group'

const user_group = {
    get_list(params) {
        return http.get(baseUrl + 's', {params: params})
    },

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    save(id = null, data) {
        return http.post(baseUrl + (id ? '/' + id : ''), data)
    },

    cache() {
        return http.put(baseUrl)
    },

    destroy(id) {
        return http.delete(baseUrl + '/' + id)
    },

    restore(id) {
        return http.patch(baseUrl, '/', id)
    }
}

export default user_group

import http from '@/lib/http'

const baseUrl = '/admin/rate_option'

const rate_option = {

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    get_list(params = null) {
        return http.get(baseUrl + 's', {params: params})
    },

    save(id = null, data) {
        return http.post(baseUrl + (id ? '/' + id : ''), data)
    },

    destroy(id) {
        return http.delete(baseUrl + '/' + id)
    },

    restore(id) {
        return http.patch(baseUrl + '/' + id)
    }

}

export default rate_option

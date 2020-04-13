import http from '@/lib/http'

const baseUrl = '/admin/comment'

const comment = {

    get_list(params) {
        return http.get(baseUrl + 's', {params: params})
    },

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    save(id, data) {
        return http.post(baseUrl + (id ? '/' + id : ''), data)
    },

    destroy(id) {
        return http.delete(baseUrl + '/' + id)
    },

    restore(id) {
        return http.patch(baseUrl + '/' + id)
    }

}

export default comment

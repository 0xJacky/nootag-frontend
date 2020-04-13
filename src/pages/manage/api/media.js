import http from '@/lib/http'

const baseUrl = '/admin/media'

const media = {

    get_list(params) {
        return http.get(baseUrl + 's', {params: params})
    },

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    destroy(id) {
        return http.delete(baseUrl + '/' + id)
    }

}

export default media

import http from '@/lib/http'

const baseUrl = '/admin/report'

const report = {

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    get_list(params) {
        return http.get(baseUrl + 's', {params: params})
    },

    save(id, data) {
        return http.post(baseUrl + '/' + id, data)
    }

}

export default report

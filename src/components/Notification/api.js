import http from '@/lib/http'

const baseUrl = '/user/notifications'

const notification = {

    get_list(params) {
        return http.get(baseUrl, {params: params})
    },

    readAll() {
        return http.put(baseUrl)
    },

    destroyAll() {
        return http.delete(baseUrl)
    }

}

export default notification

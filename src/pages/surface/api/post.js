import http from '@/lib/http'

const baseUrl = '/post'

const post = {

    get(id) {
        return http.get(baseUrl + '/' + id)
    },

    get_list(page = 1) {
        return http.get(baseUrl + 's', {params: {page: page}})
    }

}


export default post

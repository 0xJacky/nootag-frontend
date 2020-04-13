import http from '@/lib/http'

const baseUrl = '/post'

const post = {

    get(id) {
        return http.get(baseUrl + '/' + id)
    }

}


export default post

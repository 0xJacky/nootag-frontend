import http from '@/lib/http'

const baseUrl = '/comment'

const comment = {

    get_children(id, page = 1, sort = 'hot') {
        return http.get(baseUrl + 's', {params: {comment_id: id, page: page, sort: sort}})
    },

    get_root(id, page = 1, sort = 'hot') {
        return http.get(baseUrl + 's', {params: {post_id: id, page: page, sort: sort}})
    },

    store(data) {
        return http.post(baseUrl, data)
    }

}

export default comment

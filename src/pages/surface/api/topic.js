import http from '@/lib/http'

const topic = {

    get(id) {
        return http.get('topic/' + id)
    },

    subscribe(id) {
        return http.post('topic/' + id + '/subscribe')
    },

    destroy(id) {
        return http.delete('topic/' + id + '/subscribe')
    }

}

export default topic

import http from '@/lib/http'

const favour = {

    store(data) {
        return http.post('/favour', data)
    },

    destroy(data) {
        return http.delete('/favour', {data: data})
    }

}

export default favour

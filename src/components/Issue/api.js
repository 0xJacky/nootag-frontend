import http from '@/lib/http'

const issue = {

    add(data) {
        return http.post('/issue', data)
    }

}

export default issue

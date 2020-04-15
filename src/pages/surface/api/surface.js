import http from '@/lib/http'

const surface = {

    landing() {
        return http.get('/surface/landing')
    }

}

export default surface

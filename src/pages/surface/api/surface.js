import http from '@/lib/http'

const surface = {

    donate(params) {
        return http.get('surface/donate', {params: params})
    },

    about() {
        return http.get('surface/about')
    }

}

export default surface

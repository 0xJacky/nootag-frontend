import http from '@/lib/http'

const apple = {

    devices(group) {
        return http.get('/apple/devices/' + group)
    },

    firmwares(identifier) {
        return http.get('/apple/firmwares/' + identifier)
    },

    firmware_info(identifier, build_id) {
        return http.get('/apple/firmwares/' + identifier + '/' + build_id)
    },

    beta_devices(group) {
        return http.get('/apple/beta/devices/' + group)
    },

    beta_firmwares(name) {
        return http.get('/apple/beta/firmwares/' + name)
    },

    beta_firmware_info(name, build_id) {
        return http.get('/apple/beta/firmwares/' + name + '/' + build_id)
    }

}

export default apple

import http from '@/lib/http'

const analytic = {

    get() {
        return http.get('/admin/analytic')
    },

    mysql() {
        return http.get('/admin/analytic/mysql')
    },

    server() {
        return http.get('/admin/analytic/server')
    },

    google() {
        return http.get('/admin/analytic/google')
    }

}

export default analytic

import http from '@/lib/http'
import store from '@/lib/store'

const authorization = {
    login(email, password, token) {
        const login = http.post('/authorizations', {
            username: email,
            password: password,
            grant_type: 'password',
            client_id: process.env.VUE_APP_API_CLIENT,
            client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
            token: token
        })
        login.then(r => {
            store.dispatch('login', r, r.expires_in).then()
        })
        return login
    },
    logout() {
        return http.delete('/authorizations/current').then(() => {
            store.dispatch('logout').then()
        })
    },
    refreshToken() {
        return http.put('/authorization', {
            refresh_token: store.auth.refresh_token,
            grant_type: 'refresh_token',
            client: process.env.VUE_APP_API_CLIENT,
            client_secret: process.env.VUE_APP_API_CLIENT_SECRET
        })
    }
}

export default authorization

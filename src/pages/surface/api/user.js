import http from '@/lib/http'
import store from '@/lib/store'

const user = {

    info() {
        const user = http.get('/user')
        user.then(response => {
            store.dispatch('update_user', response).then()
        })
        return user
    },

    follow(id) {
        return http.post('/user/' + id + '/follow')
    }

}

export default user

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

    get(id) {
        return http.get('/admin/user/' + id)
    },

    save(id, user) {
        return http.post('/admin/user' + (id ? '/' + id : ''), user)
    },

    get_list(params = null) {
        return http.get('/admin/users', {params: params})
    },

    destroy(id) {
        return http.delete('/admin/user/' + id)
    },

    verify(id, type) {
        return http.post('/admin/user/' + id + '/verify', {type: type})
    },

    destroy_avatar(id) {
        return http.delete('/admin/user/' + id + '/avatar')
    },

    change_credit(id, change, remark) {
        return http.post('/admin/user/' + id + '/credit', {
            change: change,
            remark: remark
        })
    }

}

export default user

import api from "../services/api.js";

const AuthRepository = {
    async me() {
        return await api('/me');
    },

    async reg (values) {
        return await api('/registration', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    async login (values) {
        return await api('/login', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    async logout() {
        return await api('/logout', {
            method: "POST",
            body: JSON.stringify({})
        })
    },
}

export default AuthRepository
import AuthRepository from "../repository/auth.js";
import api from "./api.js";
import config from "./config.js";
import location from "./location.js";

class Auth {
    static get token () {
        return window.localStorage.getItem(config.AUTH_ACCESS_TOKEN)
    }

    static set token (value) {
        if (!value) {
            window.localStorage.removeItem(config.AUTH_ACCESS_TOKEN)
        } else {
            window.localStorage.setItem(config.AUTH_ACCESS_TOKEN, value)
        }
    }

    static async login (values) {
        const response = await AuthRepository.login(values)
        Auth.token = response.data.accessToken
        location.user()
    }

    static async reg (values) {
        const response = await AuthRepository.reg(values)
        Auth.token = response.data.accessToken
        location.user()
    }

    static async me () {
        return await AuthRepository.me()
    }

    static async logout () {
        Auth.token = ''
        // return await AuthRepository.logout()
    }
}

export default Auth
import Auth from "./auth.js";
import config from "./config.js";

const api = async (url, options = {}) => {
    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
    }

    const token = Auth.token
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const result = await Promise.all([
        await new Promise(resolve => setTimeout(() => resolve(), 200)),
        await fetch(config.BASE_URL + url, {
            ...options,
            headers
        })
    ])

    const response = result[1]

    return await response.json()
}

export default api
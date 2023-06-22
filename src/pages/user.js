import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";

const init = async () => {
    const { ok: isLogged, data } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const user = data.user
    const userInfoEl = document.getElementById('user-info')

    const userInfoAgeEl = userInfoEl.querySelector('[data-user-age]')
    userInfoAgeEl.innerText = user.age

    const userInfoNameEl = userInfoEl.querySelector('[data-user-name]')
    userInfoNameEl.innerText = user.name

    const userInfoEmailEl = userInfoEl.querySelector('[data-user-email]')
    userInfoEmailEl.innerText = user.email
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

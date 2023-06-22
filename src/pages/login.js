import Form from "../components/form.js";
import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (isLogged) {
        return location.user()
    } else {
        loading.stop()
    }

    const formEl = document.getElementById('login-form')

    new Form(formEl, {
        'email': (value) => {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
                return 'Некорректный email'
            }

            return false
        },
        'password': (value) => {
            if (value.length < 6) {
                return 'Значение должно быть больше или равно 6'
            } else if (value.length >= 32) {
                return 'Значение должно быть меньше 32'
            }

            return false
        }
    }, (values) => {
        Auth.login(values)
    })
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

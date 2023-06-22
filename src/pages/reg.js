import Form from "../components/form.js";
import Auth from "../services/auth.js";
import loading from "../services/loading.js";
import location from "../services/location.js";

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
        'name': (value) => {
            if (value.length < 3) {
                return 'Значение должно быть больше или равно 3'
            } else if (value.length >= 32) {
                return 'Значение должно быть меньше 32'
            }

            return false
        },
        'age': (value) => {
            if (!value) {
                return 'Поле обязательно'
            }

            value = +value;

            if (typeof value !== 'number') {
                return 'Поле должно быть числом'
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
        },
        'password-repeat': (value, fields) => {
            const password = fields.find(field => field.name === 'password')

            if (password.input.value !== value) {
                return 'Пароли должны совпадать'
            }

            return false
        }
    }, (values) => {
        delete values['password-repeat']
        Auth.reg(values)
    })
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

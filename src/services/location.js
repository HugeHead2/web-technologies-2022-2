const url = new URL(window.location.href)

const location = {
    index: () => {
        window.location.href = url.origin + '/index.html'
    },
    login: () => {
        window.location.href = url.origin + '/login.html'
    },
    reg: () => {
        window.location.href = url.origin + '/reg.html'
    },
    user: () => {
        window.location.href = url.origin + '/user.html'
    }
}

export default location
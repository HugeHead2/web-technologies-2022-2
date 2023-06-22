const loading = {
    start () {
        const loader = document.querySelector('[data-loading]')
        loader.classList.remove('loader-wrapper_stopped')
    },

    stop () {
        const loader = document.querySelector('[data-loading]')
        loader.classList.add('loader-wrapper_stopped')
    }
}

export default loading
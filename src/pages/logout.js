import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";

const init = async () => {
    const response = await Auth.logout()
    location.index()
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

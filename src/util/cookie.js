import Cookie from 'js-cookie'

export function getCookie(key) {
    return Cookie.get(key)
}

export function setCookie(key, value) {
    if (value) {
        Cookie.set(key, value, {expires: 7});
    }
}
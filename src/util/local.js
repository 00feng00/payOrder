export function setLocal(key, value) {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export function setLocalWithNull(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocal(key) {
    var value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }

}

export function localClearAll() {
    localStorage.clear();
}
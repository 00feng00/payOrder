import {getLocal, setLocal} from "./local";

export function setStoreUtil(namespace_key, value) {
    var props = this;
    var namespace = namespace_key.split('.')[0]
    var key = namespace_key.split('.')[1]
    setLocal(`${namespace}.${key}`, value)
    return props.dispatch({
        type: `${namespace}/snapShot`, payload: {[key]: value}
    })
}

export function getStoreUtil(namespace_key) {
    var namespace = namespace_key.split('.')[0]
    var key = namespace_key.split('.')[1]
    var props = this;
    var value = undefined;
    if (props.store[`${namespace}`]) {
        value = props.store[`${namespace}`][key]
        if (value instanceof Array) {
            if (value.length == 0) {
                return getLocal(`${namespace}.${key}`) || []
            }
        }
        if (typeof(value) == "number") {
            if (value == 0) {
                return 0
            } else {
                return value || getLocal(`${namespace}.${key}`)
            }
        }

    }

    return value || getLocal(`${namespace}.${key}`)
}

export function initStoreFromLocal() {
    var props = this;
    var l = localStorage.length
    for (var i = 0; i < l; i++) {
        var key = localStorage.key(i)
        var _isTrue = key.split(".").length == 2
        if (_isTrue) {
            var namespace = key.split('.')[0]
            var key = key.split('.')[1]
            props.dispatch({
                type: `${namespace}/snapShot`, payload: {[key]: getLocal(`${namespace}.${key}`)}
            })
        }
    }
}
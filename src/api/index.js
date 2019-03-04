import axios from 'axios'
import Cookie from 'js-cookie'

axios.interceptors.request.use(
    config => {
        var userToken = Cookie.get('userToken')
        if (userToken) {
            config.headers.userToken = userToken;
        }
        var imageToken = Cookie.get('imageToken')
        if (imageToken) {
            config.headers.imageToken = imageToken;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
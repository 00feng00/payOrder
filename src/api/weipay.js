import axios from 'axios'
import { BASE_URL } from '../constants.js'

export function wei_pay({ deviceId }) {
    return axios.get(`${BASE_URL}/users/menu`).then(res => {
        return res.data.result
    });
}


import axios from 'axios'
import { BASE_URL } from '../constants.js'

export function get_banner({ deviceId }) {
    return axios.get(`${BASE_URL}/wx/api/ads`, {
        params: {
            deviceId
        }
    }).then(res => {
        return res.data.data
    });
}


import {MyToast, uuid} from "./uitls";
import axios from 'axios'
import Cookie from 'js-cookie'

export const UPLOAD_ACTION = "https://upload-z2.qiniup.com"
export const QINIU_DEMAIN = 'https://qn.diyeetech.com/'

export function UPLOAD_TOKEN() {
    var getTokeUrl = `${__API__}/designs/file-upload`
    return axios.get(getTokeUrl).then(res => {
        return res.data.uploadToken
    })
}

export async function UPLOAD_TO_QINIU(file) {
    var imageToken = await UPLOAD_TOKEN()
    Cookie.set("imageToken", imageToken, {expires: 5})
    var formData = new FormData();
    formData.append("file", file)
    formData.append("key", uuid() + ".png")
    formData.append("token", imageToken)
    return axios({
        url: UPLOAD_ACTION,
        method: 'post',
        data: formData,
        headers: {
            "Content-Type": "Multipart/form-data"
        }
    }).then(res => {
        return res.data
    }).catch(e => {
        MyToast.fail(e.response.data)
        return false
    })

}
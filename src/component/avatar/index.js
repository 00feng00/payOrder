import React from 'react';
import style from './style.css'
import {Input, Form, Select, Icon, Radio, DatePicker, Button, message} from 'antd'
import MyIcon from "../../component/Icon/icon";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;
import CutImage from './cutImage'
import MyLayout from "../../page/layout";
import {PUT_USER_PROFILE, UPLOAD_TO_QINIU} from "../../api/user";
import {UPLOAD_TOKEN} from "../../api/uploadCustomFabric";
import Cookie from 'js-cookie'
import {getFileExtension, getHistory, uuid} from "../../util/uitls";
import {QINIU_DOMAIN} from "../../constants";
import {GET_EARNINGBALANCE_DEPOSITBALANCE} from "../../api/financeCenter";
import Load from '../../component/load/index.js'

function file2image(file) {
    return new Promise((resolve) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            var txt = event.target.result;

            var img = document.createElement("img");
            img.src = txt;//将图片base64字符串赋值给img的src
            resolve(img)
        };
        reader.readAsDataURL(file);
    })
}

class Avatar extends React.Component {
    constructor() {
        super();
        this.state = {
            uploadFile: new window.Image(),
            isUploadImage: false,
            resultImageUrl: '',
            user: {
                userImage: ""
            }
        }
    }

    componentDidMount() {
        var self = this;
        /*获取用户信息*/
        GET_EARNINGBALANCE_DEPOSITBALANCE().then(res => {
            if (res.userImage) {
                loadImage(res.userImage).then(image => {
                    self.setState({
                        isUploadImage: true,
                        uploadFile: image
                    })
                })
            }
            self.setState({
                user: res
            })
        })

    }

    onChangeImage(url) {
        this.setState({
            resultImageUrl: url
        })
    }

    render() {
        var self = this;
        return (<div className={style.avatar1}>
            <h1 className={style.big_title}>请点击上传图片</h1>
            <div className={style.addWrappperWrapper}>
                <div className={style.addWrappper}>
                    <input type="file" className={style.fileInput} onChange={e => {
                        file2image(e.target.files[0]).then(res => {
                            self.setState({
                                isUploadImage: true,
                                uploadFile: res
                            })
                        })
                    }}/>
                    <Icon type={"plus"} style={{width: 100, fontSize: 100}}/>
                </div>
            </div>
            {
                this.state.isUploadImage && <div>
                    <CutImage image={this.state.uploadFile}
                              onChange={this.onChangeImage.bind(this)}
                    ></CutImage>

                    <div className={style.btns}>
                        <Button className={style.btn} type={"primary"}
                                onClick={this.onSubmit.bind(this)}
                        >保存</Button>
                    </div>
                </div>
            }
        </div>);
    }

    onSubmit() {
        var self = this;
        Load()
        /*upload to qiniu */
        uploadToQiniu(this.state.resultImageUrl).then(res => {
            PUT_USER_PROFILE({
                userImage: QINIU_DOMAIN + res.key,
               /* surname: self.state.user.userDetail.surname,
                givenName: self.state.user.userDetail.givenName,
                email: self.state.user.userDetail.email,
                genderId: self.state.user.userDetail.genderId,
                birthday: self.state.user.userDetail.birthday,*/
            }).then(res1 => {
                Load().close()
                message.success("上传成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }).catch((e) => {
                debugger
                Load().close()
                message.error(e.response.data)
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            })
        })

    }

}

function loadImage(src) {
    var image = new window.Image();
    image.crossOrigin = "Anonymous"
    image.src = src;
    var promise = new Promise((resolve, reject) => {
        image.onload = () => {
            resolve(image)
        }
    })
    return promise
}

function dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

async function uploadToQiniu(image_url) {
    var image = dataURLtoFile(image_url, "avatorimage.png")
    var imageToken = await  UPLOAD_TOKEN()
    Cookie.set("imageToken", imageToken, {expires: 5})
    var formData = new FormData();
    formData.append("file", image)
    formData.append("key", uuid() + ".png")
    formData.append("token", Cookie.get("imageToken"))
    var result = await  UPLOAD_TO_QINIU(formData)
    return result
}

export default Avatar;
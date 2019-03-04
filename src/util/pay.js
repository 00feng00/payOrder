import {getUrlParams, isWeiXin} from "./uitls";
import {POST_WEICHATPAY_MOBILE} from "../api/shopcart";
import {ActivityIndicator, Toast} from 'antd-mobile'

export function wx_pay(orderId) {
    if (isWeiXin()) {
        //微信内部支付
        return new Promise((resolve, reject) => {
            POST_WEICHATPAY_MOBILE(orderId, "H5:WEIXIN").then(htmlUrl => {
                var params = getUrlParams(htmlUrl)
                debugger
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": "wxab55a35b11a769d2",     //公众号名称，由商户传入
                        "timeStamp": params['timeStamp'],
                        "nonceStr": params["nonceStr"], //随机串
                        "package": `prepay_id=${params['prepayId']}`,
                        "signType": "MD5",         //微信签名方式：
                        "paySign": params['paySign'] //微信签名
                    },
                    function (res) {
                        var newUrl = encodeURI(`https://m.diyeetech.com/orderdetail/${orderId}`)
                        debugger
                        setTimeout(() => {
                            location.href = (newUrl)
                            return resolve({success: true})
                        }, 500)
                    });

            })
        })

    }
    else {
        /*微信外部*/
        return new Promise(resolve => {
            POST_WEICHATPAY_MOBILE(orderId, 'H5').then(htmlUrl => {
                var newUrl = htmlUrl + "&redirect_url=" + encodeURI(`https://m.diyeetech.com/orderdetail/${orderId}`)
                debugger
                setTimeout(() => {
                    location.href = (newUrl)
                }, 500)
                return resolve({success: true, message: newUrl})
            })
        })

    }
}
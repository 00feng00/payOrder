import { effects } from 'dva/saga'
import _Map from 'lodash.map'
import _Filter from 'lodash.filter'
import Cookie from 'js-cookie'
import React from "react";




export function isImage(file) {
    var ImgType = ["gif", "jpeg", "jpg", "bmp", "png"];//图片
    if (!RegExp("\.(" + ImgType.join("|") + ")$", "i").test(file.name.toLowerCase())) {
        console.log("不是指定图片格式,重新选择");
        return false;
    } else {
        return true
    }
}


function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function uuid() {
    // return (S4() + S4() + S4()+ S4() + S4() + S4() + S4() + S4());
    var date = new Date();
    var y = (date.getFullYear()) + "";
    var m = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + ""
    var d = (date.getDate()) + ""
    var h = (date.getHours()) + "";
    var M = ((date.getMinutes()) < 10 ? "0" + (date.getMinutes()) : date.getMinutes()) + ""
    var s = ((date.getSeconds()) < 10 ? "0" + (date.getSeconds()) : date.getSeconds()) + ""
    var _uuid = (y + m + d + "-" + h + M + s + "-" + S4() + S4());
    return _uuid
}

export function isMatch(myreg, str) {
    //声明邮箱正则
    //对输入的值进行判断
    return myreg.test(str);
}

export function setStateReducer(state, actions) {
    var { payload, isStrict } = actions
    if (!isStrict) {
        return { ...state, ...payload }
    } else {
        return payload
    }

}


export function setState(obj, isStrict = false) {
    return (name_space) => {
        return effects.put({
            type: `${name_space}/setState`,
            payload: obj,
            isStrict
        })
    }
}

export function setHistory(history) {
    window.__history__ = history;
    return
}

export function getHistory() {
    return window.__history__;
}

export function* getState(namespace) {
    var result = yield effects.select(state => state[namespace]);
    return Object.assign({}, result)
}


export function findInArray(array, filter) {
    var index = require("lodash.findindex")(array, filter)
    return array[index]
}


export function arrayToCollection(array) {
    var c = {}
    _Map(array, (item) => {
        c[item.id] = item
    })
    return c
}

export function getFileExtension(filename) {
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var postf = filename.substring(index1, index2);//后缀名
    return postf
}


export function unloging() {
    var self = this;
    var Cookie = require('js-cookie')
    try {
        self.user = JSON.parse(Cookie.get("cookie_user"))
    } catch (e) {
        window.location.replace("/")
    }
}

export function getUrlParams(url) {
    var url = url || location.search
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

export function getUser() {
    var user = null
    try {
        return user = JSON.parse(Cookie.get('cookie_user'));
    } catch (e) {
        return {
            defaultShopId: ""
        }
    }
}

export function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
    }
    var arrayPageScroll = new Array(xScroll, yScroll);
    return arrayPageScroll;
};

export function getHeight() {
    return document.documentElement.offsetHeight
}

export function getWidth() {
    return document.documentElement.offsetWidth
}

export function isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

export function setWinXinOpenedid() {
    if (isWeiXin()) {
        var code = getUrlParams(window.location.search)['code']
        var openid = Cookie.get("OPENED_ID")
        // var code = Cookie.get("")
        if (!code) {
            if (!openid) {
                try {
                    location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab55a35b11a769d2&redirect_uri=http://m.diyeetech.com&response_type=code&scope=snsapi_base&#wechat_redirect"
                } catch (e) {
                    console.error(e)
                }
            }
        } else {
            if (!openid) {
                GET_WEIXIN_OPENID(code).then(res => {
                    if (res) {
                        Cookie.set("OPENED_ID", res, { expires: 5 })
                    } else {
                        Cookie.remove("OPENED_ID")
                    }
                })
            }
        }

    }
}

export function getPayMent(id) {
    if (id == 2) {
        return "微信"
    }
    if (id == 3) {
        return "支付宝"
    }
    if (id == 1) {
        return "定易余额"
    }
}


export class Load extends React.Component {
    constructor(props) {
        super()
        this.state = {
            loading: props.loading
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loading
        })
    }

    render() {
        var loading = this.state.loading
        return <ActivityIndicator
            toast
            text="Loading..."
            animating={loading}
        />
    }
}


export function mergeArray(a1, a2, key) {
    var _key = key || "designItemId"
    var finshArray = a1;
    _Map(a2, item2 => {
        var isExit = false;
        _Map(a1, item1 => {
            if (item1[_key] == item2[_key]) {
                isExit = true
            }
        })
        if (!isExit) {
            finshArray.push(item2)
        }
    })

    return finshArray
}

export const Map = _Map
export const MyMap = _Map
export const Filter = _Filter

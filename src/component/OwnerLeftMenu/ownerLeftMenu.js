import React from 'react';
import style from './style.css'
import {Input, Form, Select, Icon, Radio, DatePicker, Button} from "antd"
import MyIcon from "../../component/Icon/icon";
import {Link} from 'react-router-dom'
import {GET_EARNINGBALANCE_DEPOSITBALANCE} from "../../api/financeCenter";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;
var pathToRegexp = require('path-to-regexp')

class OwnerLeftMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            pathUrl: "",
            user: {
                defaultShopId: ""
            }
        }
    }

    componentDidMount() {
        /*获取信息*/
        var self = this;
        GET_EARNINGBALANCE_DEPOSITBALANCE().then(res => {
            self.setState({
                user: res
            })
        })
    }

    Mylink(title, to) {
        var re1 = pathToRegexp(to);
        var re2 = pathToRegexp(to + "/:id");
        var isTrue1 = re1.exec(window.location.pathname)
        var isTrue2 = re2.exec(window.location.pathname)
        return <Link
            to={to}
            className={` ${style.item} ${(isTrue1 || isTrue2) ? style.active : "none"}`}>{title}</Link>
    }

    render() {
        var re = pathToRegexp(window.location.pathname);
        var isTrue = re.exec("/setting/collection")
        return (
            <div className={style.OwnerLeftMenu}>
                {
                    this.state.user.defaultShopId && <div>
                        <a className={`${style.headerItem}  ${style.item}`}>
                            <MyIcon type={"icon-bianjiicon"}
                                    style={{marginRight: 5}}
                            ></MyIcon>
                            设计中心</a>
                        {this.Mylink.call(this, "我的设计", "/setting/design")}
                        {/*{this.Mylink.call(this, "", "/setting/my-design/upload")}*/}
                        {this.Mylink.call(this, "店面销售", "/setting/sales-record")}
                        {this.Mylink.call(this, "店面设置", "/setting/shop-settings")}

                    </div>
                }
                <a className={` ${style.item} ${style.headerItem}`}>
                    <MyIcon type={"icon-zhanghao"} style={{marginRight: 5}}></MyIcon>
                    个人中心</a>
                {this.Mylink.call(this, "账号设置", "/setting/account-settings")}
                {this.Mylink.call(this, "我的订单", "/setting/order-history")}
                {this.Mylink.call(this, "财务中心", "/setting/finance-center")}
                {this.Mylink.call(this, "高端定制", "/setting/custom-fabric")}
                <Link to={"/setting/collection"}
                      className={` ${style.item} ${style.laset_item} ${isTrue ? style.active_last : "none"}`}>
                    收藏馆</Link>
            </div>
        );
    }
}


OwnerLeftMenu.defaultProps = {}
export default OwnerLeftMenu;
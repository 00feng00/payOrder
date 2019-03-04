import React from 'react';
import style from './leftstyle.css'
import {Link} from 'react-router-dom'
import MyIcon from "../Icon/icon";

class LeftMenu extends React.Component {
    render() {
        var {active} = this.props
        return (
            <div className={style.left}>
                <div className={style.header}>
                    <MyIcon type={"icon-zhanghao"}
                            style={{color: "#ff4800", marginRight: 10}}/> 个人中心
                </div>
                <div className={`${style.item} ${active == "账号设置" ? style.itemActive : ""}`}>
                    <Link className={style.link} to={"/account-settings"}>账号设置</Link>
                </div>
                <div className={`${style.item} ${active == "订单记录" ? style.itemActive : ""}`}>
                    <Link className={style.link} to={"/orderHistory"}>订单记录</Link>
                </div>
                <div className={`${style.item} ${active == "财务中心" ? style.itemActive : ""}`}>
                    <Link className={style.link} to={"/financeCenter"}>财务中心</Link>
                </div>
                <div className={`${style.item} ${active == "高端定制" ? style.itemActive : ""}`}>
                    <Link className={style.link} to={"/setting/custom-fabric"}>高端定制</Link>
                </div>
                <div className={`${style.item} ${active == "设计师加盟" ? style.itemActive : ""}`}>
                    <Link className={style.link} to={"/join"}>设计师加盟</Link>
                </div>
            </div>
        );
    }
}

export default LeftMenu;
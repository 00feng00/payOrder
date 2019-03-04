import React from 'react';
import Header from "../../component/Header";
import style from './style.css'
import {Button} from 'antd'

class Header2 extends React.Component {
    render() {
        return (
            <div className={style.header2}>
                <div className={style.headerItem}>风格分类</div>
                <div className={style.headerItem}>热卖中</div>
                <div className={style.headerItem}>新品推荐</div>
                <div className={style.headerItem}>设计师加盟</div>
                <div>
                    <Button className={style.btn}>来图定制</Button>
                </div>
            </div>
        );
    }
}

export default Header2;
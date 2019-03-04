import React from 'react'

import styles from './style.css'
import {Input} from 'antd'
import MyIcon from "../Icon/icon";

export default class Header extends React.Component {
    render() {
        return <div className={styles.header}>
            <section className={styles.wrapperWidth}>
                <div className={styles.logo}>
                    <img src="/static/logo2.png" alt=""/>
                </div>
                <div className={styles.headerRight}>
                    <Input className={styles.search}/>
                    <div className={styles.headerImage}>
                        <img src="/static/salesOrderAddItem.png" alt=""/>
                    </div>
                    <div className={styles.cart}>
                        <MyIcon type={"icon-gouwuche"}></MyIcon>
                    </div>
                </div>
            </section>
        </div>
    }
}

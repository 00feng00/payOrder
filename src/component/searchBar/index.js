import React from 'react'
import styles from './style.css'
import MyIcon from "../Icon/icon";
import {Link} from 'react-router-dom'
import Drawing from "../drawing";

class SearchBar extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    render() {
        var self = this
        return <div className={styles.searchBar}>
            <div className={styles.content}>
                <MyIcon type={"icon-nav"} className={styles['icon-nav']}
                        onClick={() => {
                            self.setState({visible: true})
                        }}
                />
                <div className={styles.wrapperlogowrapper}>
                    <div className={styles.wrapperlogo}>
                        <Link to={"/"}>
                            <img src="/static/logo.png" alt=""/>
                        </Link>
                    </div>
                </div>
                <Link to={"/search"}>
                    <div className={styles.input_wrapper}>
                        <span>印花搜索</span>
                        <MyIcon type={"icon-iconfontseacher"}></MyIcon>
                    </div>
                </Link>
            </div>

            <Drawing visible={this.state.visible}
                     onClose={() => {
                         self.setState({visible: false})
                     }}
            >
                <div className={styles.drwaingCenter}>
                    <div className={styles.row1}>
                        <h1>
                            <span>企业</span>
                            <MyIcon type={"icon-nav"} className={styles['icon-nav']}
                                    onClick={() => {
                                        self.setState({visible: false})
                                    }}
                            />
                        </h1>

                        <div className={styles.rowItem}>
                            <Link to={"/about"}>关于定易</Link></div>
                        <div className={styles.rowItem}>
                            <a href="/business-cooperation">
                                商务合作
                            </a>
                        </div>
                        <div className={styles.rowItem}>
                            <a href="/suggestion">意见反馈</a>
                        </div>
                        <div className={styles.rowItem}>
                            <a href="/service">联系客服</a>
                        </div>
                        <div className={styles.rowItem}>
                            <a href="/disclaimer">
                                免责声明
                            </a>
                        </div>
                    </div>

                    <div className={styles.row1}>
                        <h1>
                            <span>产品</span>
                        </h1>

                        <div className={styles.rowItem}>
                            <a href="/digital-printing">
                                数码工艺
                            </a>
                        </div>
                        <div className={styles.rowItem}>
                            <Link to={"/quality-fabric"}>优质面料</Link></div>
                        <div className={styles.rowItem}>
                            <a href="/customize">
                                来图定制
                            </a>
                        </div>
                    </div>
                </div>
            </Drawing>
        </div>
    }
}

export default SearchBar
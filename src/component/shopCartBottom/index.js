import React from 'react';
import styles from './style.css'
import MyIcon from "../Icon/icon";
import MyModal from "../MyModal";
import OptionsAlert from "../../page/DesignItem/OptionsAlert/optionsAlert";
import OptionsAlertBuyItNow from '../../page/DesignItem/OptionsAlertBuyItNow/OptionsAlertBuyItNow'
import {Badge} from 'antd-mobile'
import {connect} from 'react-redux'
import {DELETE_FAVORITES, POST_ACTIVE_FAVORITES} from "../../api/collenction";
import Cookie from 'js-cookie'

class ShopCartBottom extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpenOptions: false,
            isOpenOptionsBuyItNow: false,
            followIngs: [],
            isActive: false
        }
    }

    componentDidMount() {
        var self = this
        var shopcartId = Cookie.get('shopcartId') || undefined
        this.props.flowGetSummary({shopcartId}).then(res => {
            self.props.flowGet({})
        })

    }


    addToCart() {
        this.setState({isOpenOptions: true})
    }

    buyitNow() {
        this.setState({isOpenOptionsBuyItNow: true})
    }

    faving(item) {
        var self = this
        if (item.isActive) {
            DELETE_FAVORITES({designItemId: item.designItemId}).then(res => {
                self.setState({isActive: !self.state.isActive})
            })
        } else {
            POST_ACTIVE_FAVORITES({designItemId: item.designItemId}).then(res => {
                self.setState({isActive: !self.state.isActive})
            })
        }

    }

    render() {
        var self = this
        var {shopcartItems} = this.props.store.shopcart
        return <div className={styles.ShopCartBottom}>
            <div className={styles.left}>
                <div className={styles.leftItem}>
                    <a href="/service">
                        <MyIcon type={"icon-weibiaoti-"} className={styles.icon}></MyIcon>
                        <div className={styles.titiel}>
                            客服
                        </div>
                    </a>
                </div>
                <div className={`${styles.leftItem } ${ this.state.isActive ? styles.active : ''}`}
                     onClick={self.faving.bind(self,
                         {
                             designItemId: this.props.designItemId,
                             isActive: this.state.isActive
                         })}
                >
                    <MyIcon type={"icon-love"}
                            className={`${styles.icon}`}></MyIcon>
                    <div className={styles.titiel}>收藏</div>
                </div>
                <div className={styles.leftItem}>
                    <a href={"/shopcart"}>
                        <Badge text={shopcartItems.length}>
                            <MyIcon type={"icon-gouwuche1"} className={styles.icon}></MyIcon>
                            <div className={styles.titiel}>购物车</div>
                        </Badge>
                    </a>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.addtocart} onClick={this.addToCart.bind(this)}>加入购物车</div>
                <div className={styles.buyitnow}
                     onClick={this.buyitNow.bind(this)}
                >立即购买
                </div>
            </div>
            <MyModal
                popup
                transparent={false}
                visible={this.state.isOpenOptions}
                onClose={() => {
                    self.setState({isOpenOptions: false})
                }}
                animationType="slide-up"
            >
                <OptionsAlert
                    onClose={() => {
                        self.setState({isOpenOptions: false})
                    }}
                    cartNum={this.props.cartNum}
                    activeSku={this.props.activeSku}
                    productDetail={this.props.productDetail}
                    setParentState={this.props.setParentState}
                    skus={this.props.skus}
                />
            </MyModal>
            <MyModal
                popup
                transparent={false}
                visible={this.state.isOpenOptionsBuyItNow}
                onClose={() => {
                    self.setState({isOpenOptionsBuyItNow: false})
                }}
                animationType="slide-up"
            >
                <OptionsAlertBuyItNow
                    onClose={() => {
                        self.setState({isOpenOptionsBuyItNow: false})
                    }}
                    designItemId={this.props.designItemId}
                    cartNum={this.props.cartNum}
                    activeSku={this.props.activeSku}
                    productDetail={this.props.productDetail}
                    setParentState={this.props.setParentState}
                    skus={this.props.skus}
                    shopId={this.props.shopId}
                />
            </MyModal>
        </div>
    }
}

ShopCartBottom.defaultProps = {
    skus: [],
    productDetail: {price: 0},
    setParentState() {
    },
    activeSku: {id: 0}
}

export default connect(state => {
    return {store: state}
}, (dispatch) => {
    return {
        flowGetSummary(payload) {
            return dispatch({type: "shopcart/flowGetSummary", payload})
        },
        flowGet(payload) {
            return dispatch({type: "shopcart/flowGet", payload})
        }
    }
})(ShopCartBottom)
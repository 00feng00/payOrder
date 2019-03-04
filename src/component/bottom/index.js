import React from 'react';
import style from './style.css'
import MyIcon from "../../component/Icon/icon";
import Map from 'lodash.map'
import {getHistory, uuid} from "../../util/uitls";
import Badge from 'antd-mobile/lib/Badge'
import {connect} from 'react-redux'
import {getStoreUtil, setStoreUtil} from "../../util/store";

class Bottom extends React.Component {
    constructor(props) {
        super()
        this.setStore = setStoreUtil.bind(props)
        this.getStore = getStoreUtil.bind(props)

        this.state = {
            hidden: false,
            activeItem: props.defaultTab
        }
    }


    onClick(item) {
        this.setState({
            activeItem: item.title
        })
        if (item.title == "购物车") {
            location.href = "/shopcart"
        } else {
            getHistory().push(item.to)
        }
        if (item.title == "首页") {
            this.setStore("home_bestSeller.scrollTop", 0)
            this.setStore("home_newArrivals.scrollTop", 0)
        }
        item.onClick && item.onClick.call(item)
    }

    componentDidMount() {
        var {shopcartItems, totalQuantity} = this.props.store.shopcart
        this.props.flowGetSummary({}).then(() => {
            this.props.flowGet({})
        })
    }

    render() {
        var self = this
        var {shopcartItems, totalQuantity} = this.props.store.shopcart
        return (
            <div className={style.bottom}>
                {Map(this.props.tabs, item => {
                    return <div
                        to={item.to}
                        onClick={self.onClick.bind(self, item)}
                        className={style.tab}
                        key={uuid()}>
                        {
                            item.title == "购物车" && <Badge text={shopcartItems.length}>
                                <MyIcon type={item.icon} className={style.icon}
                                        style={{fill: self.state.activeItem == item.title ? "#ff4800" : "black"}}
                                ></MyIcon>
                                {
                                    item.title && <div className={style.titiel}
                                                       style={{color: self.state.activeItem == item.title ? "#ff4800" : "black"}}
                                    >
                                        {item.title}
                                    </div>
                                }
                            </Badge>
                        }
                        {
                            item.title != "购物车" && <div>
                                <MyIcon type={item.icon} className={style.icon}
                                        style={{fill: self.state.activeItem == item.title ? "#ff4800" : "black"}}
                                ></MyIcon>
                                {
                                    item.title && <div className={style.titiel}
                                                       style={{color: self.state.activeItem == item.title ? "#ff4800" : "black"}}
                                    >
                                        {item.title}
                                    </div>
                                }
                            </div>
                        }
                    </div>
                })}
            </div>
        );
    }
}

Bottom.defaultProps = {
    tabs: [],
    defaultTab: ""
}

export default connect(function (store) {
    return {store}
}, function (dispatch) {
    return {
        flowGetSummary(payload) {
            return dispatch({type: "shopcart/flowGetSummary", payload})
        },
        flowGet(payload) {
            return dispatch({type: "shopcart/flowGet", payload})
        },
        dispatch
    }
})(Bottom);
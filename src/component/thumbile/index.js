import React from 'react';
import style from './style.css'
import {Input, Form, Select, Icon, Radio, DatePicker, Button} from 'antd'
import MyIcon from "../../../../component/Icon/icon";
import {uuid} from "../../../../util/uitls";
import {DELETE_FLOW_SHOP, POST_ACTIVE_FOLLOWINGS} from "../../../../api/collenction";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

class Thumbile extends React.Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        }
    }

    onClick(item) {
        if (!this.state.isActive) {
            POST_ACTIVE_FOLLOWINGS({shopId: item.shopId})
        } else {
            DELETE_FLOW_SHOP(item.shopId)
        }
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        var {item} = this.props
        return (
            <div className={
                style.item
            }
                 key={uuid()}
            >
                <div className={style.imageWErapper}>
                    <img src={item.previewMediumImage} alt=""/>
                </div>
                <div className={style.tools}>
                    <h3>{item.shopName}</h3>
                    <div className={style.tow}>
                        {/*<span>{item.discountPrice}￥/米</span>*/}
                        <MyIcon type={"icon-xinheart118"} style={{
                            fontSize: 20,
                            fill: this.state.isActive ? "red" : "#acacac"
                        }}
                                onClick={this.onClick.bind(this, item)}
                        ></MyIcon>
                    </div>
                </div>
            </div>
        );
    }
}

Thumbile.defaultProps = {
    shopId: ""
}
export default Thumbile;
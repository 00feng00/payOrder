import React from 'react';
import styles from './style.css'
import Cookie from 'js-cookie'
import List from 'antd-mobile/lib/List'

import Map from 'lodash.map'
import {getHeight, uuid} from "../../util/uitls";
import MyModal from "../MyModal";
import MyIcon from "../Icon/icon";
import {DELETE_ADDRESS, POST_ADD_ADDRESS, PUT_ADD_ADDRESS, PUT_DEFAULT_ADDRESS} from "../../api/address";
import Toast from 'antd-mobile/lib/Toast'
import Modal from 'antd-mobile/lib/Modal'
import EditModalContent from './editModalContent/index'
import AddModalContent from './addModalContent'

const alert = Modal.alert;

class AddressPicker extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isShow: props.isShow,
            addressList: props.addressList,
            isShowEditor: false,
            activeAddress: {
                surname: "",
                country: "中国"
            },
            defaultShippingAddressId: props.defaultShippingAddressId,
            isShowAddModal: props.showAddAddress
        }
    }

    componentDidMount() {
        var self = this
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            isShow: nextprops.isShow,
            addressList: nextprops.addressList,
            defaultShippingAddressId: nextprops.defaultShippingAddressId,
        })
    }

    onCloseEditer() {
        this.setState({isShowEditor: false})
    }

    editAddressItem(item) {
        delete item.createTime
        this.setState({isShowEditor: true, activeAddress: item})
    }

    setDetaultAddress(item) {
        var self = this
        this.setState({defaultShippingAddressId: item.id})
        PUT_DEFAULT_ADDRESS(item.id).then(res => {
            self.props.reload()
        })
    }

    okAddressDistPicker(e) {
        this.setState({
            activeAddress: {
                ...this.state.activeAddress,
                state: e[0],
                city: e[1],
                district: e[2]
            }
        })
    }

    onFinshEditor() {
        var self = this;
        this.setState({isShowEditor: false})
        PUT_ADD_ADDRESS(this.state.activeAddress).then(res => {
            self.props.reload()
            Toast.success("修改成功", .5)
        })
    }

    changeAddressLine1(value) {
        var self = this
        self.setState({
            activeAddress: {
                ...self.state.activeAddress,
                createTime: undefined,
                addressLine1: value
            }
        })

    }

    showAddModal() {
        /**/
        if (Cookie.get('userToken')) {
            this.setState({
                activeAddress: {
                    surname: "",
                    country: "中国"
                },
                isShowAddModal: true
            })
        } else {
            alert('提示', "请先登录")
            return false
        }

    }

    closeAddModal() {
        this.setState({
            isShowAddModal: false
        })
    }

    addAddress() {
        var self = this;
        POST_ADD_ADDRESS(this.state.activeAddress).then(res => {
            if (res) {
                Toast.success("新增成功", .8)
                self.setState({
                    isShowAddModal: false,
                })
                self.props.reload()
            }
        })
    }

    deleteAddressItem(item) {
        var self = this
        DELETE_ADDRESS(item.id).then(res => {
            Toast.success("删除成功", .8)
            self.props.reload()
        })
    }


    render() {
        var self = this
        var {activeAddress, defaultShippingAddressId} = this.state
        return <MyModal
            maskClosable={false}
            onClose={this.props.onClose}
            visible={this.state.isShow}
        >
            <div className={styles.conetne}
                 style={{height: getHeight()}}
            >
                <header className={styles.header}>
                    <MyIcon type={"icon-left"}
                            onClick={this.props.onClose}
                    ></MyIcon>
                    <div className={styles.title}>
                        地址管理
                    </div>
                </header>

                {/*================详细地址列表==============*/}
                <div className={styles.addressContent}>
                    {
                        Map(this.state.addressList, item => {
                            return <div key={uuid()} className={styles.addressitem}>
                                <div className={styles.top}
                                     onClick={() => {
                                         self.props.onChange(item)
                                         self.props.onClose()
                                     }}>
                                    <div className={styles.left}>
                                        <MyIcon type={"icon-address"}/>
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.top1}>
                                            <div className={styles.namne}>
                                                姓名：{item.surname}{item.givenName}</div>
                                            <div className={styles.pohome}>
                                                手机：{item.mobile}</div>
                                        </div>
                                        <div className={styles.top2}>
                                            {/*        "country": "中国",
                                    "state": "上海",
                                    "city": "闸北区",
                                    "district": "城区"
                                    "addressLine1": "1",
  {item.country}
                                    */}
                                            收货地址： {item.country}{item.state}{item.city}{item.district} &nbsp;&nbsp;{item.addressLine1}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.left}>
                                        {defaultShippingAddressId == item.id && <small>默认</small>}
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.edith}
                                             onClick={self.editAddressItem.bind(self, item)}
                                        >
                                            {/*<MyIcon type={"icon-icon6"}></MyIcon>*/}
                                            <small>编辑</small>
                                        </div>
                                        &nbsp;&nbsp;
                                        <div className={styles.delete}
                                             onClick={self.deleteAddressItem.bind(self, item)}
                                        >
                                            {/*<MyIcon type={"icon-shanchu"}></MyIcon>*/}
                                            <small>删除</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    {
                        this.state.addressList.length == 0 && <div className={styles.null1}>
                            <img
                                src="//img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"
                                className={styles.empty_icon}/>
                            <p className={styles.empty_txt}>
                                地址空空如也，去<strong
                                onClick={this.showAddModal.bind(this)}
                            >添加地址</strong>吧~</p></div>
                    }
                </div>


                <div className={styles.bottomAdd} onClick={this.showAddModal.bind(this)}>
                    新增地址
                </div>
                {/*============edit modal================*/}
                <MyModal
                    onClose={this.onCloseEditer.bind(this)}
                    visible={self.state.isShowEditor}>
                    {EditModalContent.call(self, self.props)}
                </MyModal>


                {/*============add modal================*/}
                <MyModal
                    animationType={"slide-down"}
                    visible={this.state.isShowAddModal}>
                    {AddModalContent.call(self, self.props)}
                </MyModal>
            </div>

        </MyModal>
    }
}

AddressPicker.defaultProps = {
    defaultShippingAddressId: undefined,
    isShow: false,
    showAddAddress: false,
    onClose() {
    },
    reload() {
    },
    onChange() {
    },
    addressList: [{
        "id": 74,
        "surname": "1",
        "givenName": "",
        "addressLine2": "",
        "country": "中国",
        "state": "上海",
        "city": "闸北区",
        "addressLine1": "1",
        "district": "城区",
        "postcode": "",
        "mobile": "18819448261",
        "userId": 2903,
        "createTime": "2018-08-19T11:51:30Z",
        "userAddressStatusId": 1,
    },
        {
            "id": 94,
            "surname": "1111",
            "givenName": "",
            "addressLine1": "中国广东省广州市赤岗北路四季天地",
            "addressLine2": "",
            "country": "中国",
            "state": "天津",
            "city": "东丽区",
            "postcode": "",
            "mobile": "18819448261",
            "userId": 2903,
            "createTime": "2018-09-27T12:40:55Z",
            "userAddressStatusId": 1,
            "district": "全境"
        }
    ]

}

export default AddressPicker
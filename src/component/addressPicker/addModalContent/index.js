import district from "../../../util/jd_province_city_area_id";
import {getHeight} from "../../../util/uitls";
import styles from './style.css'
import InputItem from 'antd-mobile/lib/input-item'
import Picker from 'antd-mobile/lib/Picker'

export default function () {
    var self = this
    var {activeAddress, defaultShippingAddressId} = self.state;
    return <div className={styles.modal_content}>
        <div className={styles.header}>
            <div className={styles.backip}
                 onClick={self.closeAddModal.bind(self)}
            >
                返回
            </div>
            <div className={styles.title}>
                新增地址
            </div>
        </div>
        <div className={styles.address_conetne_content}>
            <div className={styles.surname_gitvename}>
                <div className={styles.surname}>
                    <div className={styles.labele1}>
                        姓氏：
                    </div>
                    <InputItem
                        placeholder={"姓氏"}
                        defaultValue={this.state.activeAddress.surname}
                        onChange={(value) => {
                            self.setState({
                                activeAddress: {
                                    ...self.state.activeAddress,
                                    surname: value
                                }
                            })
                        }}>
                    </InputItem>
                </div>

                <div className={styles.givename}>
                    <div className={styles.labele1}>
                        名字：
                    </div>
                    <InputItem
                        placeholder={"名字"}
                        defaultValue={this.state.activeAddress.givenName}
                        onChange={(value) => {
                            self.setState({
                                activeAddress: {
                                    ...self.state.activeAddress,
                                    givenName: value
                                }
                            })
                        }}>
                    </InputItem>
                </div>


            </div>
            <div className={`${styles.inputItem} ${styles.inputItemAddress}`}>
                <div className={styles.labele1}>
                    省区县：
                </div>
                <Picker
                    data={district}
                    value={
                        [activeAddress.state, activeAddress.city, activeAddress.district]
                    }
                    title="省区县"
                    onOk={self.okAddressDistPicker.bind(self)}
                    onDismiss={e => console.log('dismiss', e)}
                >
                    {/*<List.Item>*/}
                    <div className={styles.addressPickerShow}>
                        {/*{activeAddress.country}*/}{activeAddress.state}{activeAddress.city}{activeAddress.district}
                    </div>

                    {/*</List.Item>*/}
                </Picker>
            </div>
            <div className={styles.inputItem}>
                <div className={styles.labele1}>
                    地址：
                </div>
                <InputItem defaultValue={this.state.activeAddress.addressLine1}
                           placeholder={"请输入你的地址"}
                           onChange={(value) => {
                               self.setState({
                                   activeAddress: {
                                       ...self.state.activeAddress,
                                       addressLine1: value
                                   }
                               })
                           }}/>
            </div>
            <div className={styles.inputItem}>
                <div className={styles.labele1}>
                    电话：
                </div>
                <InputItem
                    placeholder={"请输入你的电话"}
                    value={this.state.activeAddress.mobile}
                    onChange={(value) => {
                        self.setState({
                            activeAddress: {
                                ...self.state.activeAddress,
                                mobile: value
                            }
                        })
                    }}
                />
            </div>

        </div>
        <div className={styles.wrapperbtn111}>
            <div className={styles.left}
                 onClick={this.addAddress.bind(this)}
            >
                确定
            </div>
            {/* <div className={styles.right}>
                                删除
                            </div>*/}
        </div>
    </div>
}
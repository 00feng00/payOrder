import React from 'react';
import styles from './style.css'
import MyModal from "../MyModal";
import {DatePickerView, PickerView} from 'antd-mobile'

class MyPicker extends React.Component {
    constructor(props) {
        super()
        this.state = {
            svalue: props.value,
            cancalValue: props.value
        }
    }

    componentDidMount() {
        var self = this
    }


    render() {
        var self = this
        return <div className={styles.myPicker}>
            <MyModal
                visible={this.props.visible}
                onClose={self.props.onClose}
            >
                <div className={styles.header}>
                    <div className={styles.canval}
                         onClick={() => {
                             self.setState({svalue: self.state.cancalValue})
                             self.props.onChange(self.state.svalue)
                             setTimeout(() => {
                                 self.props.onClose()
                             }, 200)
                         }}
                    >取消
                    </div>
                    <div className={styles.fin}
                         onClick={() => {
                             self.props.onOk(self.state.svalue)
                             setTimeout(() => {
                                 self.props.onClose()
                             }, 200)
                         }}
                    >确定
                    </div>
                </div>
                {this.props.type == "default" && <PickerView
                    cols={this.props.cols}
                    data={this.props.data}
                    value={[this.state.svalue]}
                    onChange={(value) => {
                        self.setState({svalue: value[0]})
                    }}
                ></PickerView>}
                {
                    this.props.type == "date" && <DatePickerView
                        minDate={new Date("1920-1-1")}
                        mode={this.props.mode}
                        value={this.state.svalue}
                        onChange={(value) => {
                            self.setState({svalue: value})
                        }}
                    />
                }

            </MyModal>
        </div>
    }
}

MyPicker.defaultProps = {
    visible: false,
    onOk() {
    },
    onChange() {
    },
    onCancel() {
    },
    value: new Date(),
    title: "",
    data: [],
    cols: 1,
    onClose() {
    },
    type: "default",//date
    mode: "date",
}
export default MyPicker
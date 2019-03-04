import React from 'react'
import {uuid} from "../../util/uitls";
import Modal from 'react-modal';
import style from './style.1.css'

class MyModal1 extends React.Component {
    render() {
        return <Modal
            isOpen={this.props.visible}
            transparent
            maskClosable={this.props.maskClosable}
            onClose={this.props.onClose}
            title={false}
            footer={false}
            className={style.modal}
            wrapClassName={style.wrappermodal}
        >
            <div style={{width: "100%"}}>
                {this.props.children}
            </div>

        </Modal>
    }
}

MyModal1.defaultProps = {
    visible: false,
    maskClosable: true,
    onClose: function () {

    },
    footer: false
}
export default MyModal1
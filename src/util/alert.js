import { ActivityIndicator, Modal, Toast } from "antd-mobile"

import Loading from './load/index'
import { getWidth } from './uitls';


const alert = Modal.alert;
const MyAlert = {}

MyAlert.success = (str) => {
    Toast.success(str, 1)
}
MyAlert.fail = (str) => {
    Toast.fail(str, 1)
}
MyAlert.loading = () => {
    MyAlert._loading = Loading({})
    /*   setTimeout(() => {
          MyAlert._loading.close()
      }, 1000 * 10) */
}
MyAlert.confirm = (str) => {
    return new Promise((resolve, reject) => {
        alert('提示', str, [
            { text: '取消', onPress: () => resolve({ success: false }) },
            { text: '确定', onPress: () => resolve({ success: true }) },
        ]);
        /* 修复弹出框的位置为题 */
        if (getWidth() <= 500) {
            document.querySelector('.am-modal-content').style.marginLeft =
                ((getWidth() - document.querySelector('.am-modal-content').offsetWidth) / 2)
                + "px";
            console.log(
                document.querySelector('.am-modal-content').style.marginLeft,
                ((getWidth() - document.querySelector('.am-modal-content').offsetWidth) / 2)
            )
        }
    })
}
MyAlert.clear = () => {
    MyAlert._loading.close()
    Toast.hide()
}

export default MyAlert
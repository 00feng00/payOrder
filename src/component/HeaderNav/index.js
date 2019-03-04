import styles from './style.css'
import {getHistory} from "../../util/uitls";

export default (props) => {
    var clickBack = props.clickBack
    return <div className={styles.header}>
        <div className={styles.gobakc}
             onClick={() => {
                 if (clickBack) {
                     clickBack()
                 } else {
                     if (getHistory().length == 0) {
                         location.href = "/"
                     } else {
                         getHistory().goBack()
                     }
                 }
             }}
        >
            返回
        </div>
        <div className={styles.name}>{props.title}</div>
    </div>
}
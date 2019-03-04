import React from 'react'
import MyIcon from "../../Icon/icon";
import styles from './style.css'

class TableHeaderLable extends React.Component {
    render() {
        var {sort, dataIndex} = this.props

        return <div className={styles.tdLabel}>
            <span className={styles.labelTitle}>{this.props.title}</span>
            <div className={styles.tdIcons}>
                <MyIcon type={"icon-up"} className={styles.icon}
                        style={{fill: sort == "asc" ? '#0492d9' : '#ccc'}}
                        onClick={this.props.onSortClickUp}
                />
                <MyIcon type={"icon-down1"} className={styles.icon}
                        style={{fill: sort == "desc" ? '#0492d9' : '#ccc'}}
                        onClick={this.props.onSortClickDown}/>
            </div>
        </div>
    }

}

TableHeaderLable.defaultProps = {
    title: "",
    sort: "",
    dataIndex: '',
    onSortClickUp() {
    },
    onSortClickDown() {
    },
}
export default TableHeaderLable
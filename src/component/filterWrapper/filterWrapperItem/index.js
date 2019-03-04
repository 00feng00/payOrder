import React from 'react';
import styles from './style.css'
import MyIcon from "../../Icon/icon";
import MyPicker from "../../MyPicker";
import Filter from 'lodash.filter'

class FilterWrapperItem extends React.Component {
    constructor(props) {
        super()
        var defaultValue = props.value ? props.value : props.lists ? props.lists[0].value : "";
        this.state = {
            visible: false,
            sValue: defaultValue,
            lists: props.lists,
        }
    }

    componentDidMount() {
        var self = this
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lists: nextProps.lists
        })
    }

    render() {
        var self = this
        var selectItem = Filter(self.state.lists, item => item.value == this.state.sValue)[0]
        return <div className={styles.filterItem} style={this.props.style}>
            <span onClick={() => {
                self.setState({visible: true})
            }}>
                     {selectItem && selectItem.label}
            </span>
            <MyIcon type={"icon-down-copy"}></MyIcon>

            <MyPicker
                visible={this.state.visible}
                data={this.state.lists}
                title="选择"
                cascade={false}
                value={[this.state.sValue[0]]}
                onClose={() => {
                    self.setState({visible: false})
                }}
                onOk={v => {
                    self.props.onChange(v)
                    this.setState({sValue: v})
                }}
            />
        </div>
    }
}

FilterWrapperItem.defaultProps = {
    style: {},
    value: "",
        defaultItem: "",
    lists: [],
    onChange() {
    }
}
export default FilterWrapperItem
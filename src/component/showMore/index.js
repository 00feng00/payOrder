import React from 'react';
import style from './style.css'
import {Input, Form, Select, Icon, Radio, DatePicker, Button} from 'antd'
import MyIcon from "../../component/Icon/icon";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

export const MODE = {
    HOVE: 1,
    NOT_HOVE: 2
}

import {Popover} from 'antd'

class ShowMore extends React.Component {

    constructor() {
        super()
        this.state = {
            isClickDescriptionMore: false,
            showMoreIcon: false,
            visible: false
        }
    }

    showMore() {
        if (this.props.mode == MODE.NOT_HOVE) {
            this.descriptionsRef.style.maxHeight = "1000px"
            this.setState({isClickDescriptionMore: true})
        } else {
            this.setState({
                visible: true
            })
        }
    }

    hightMore() {
        this.descriptionsRef.style.maxHeight = `${this.props.maxHeight}px`
        this.setState({isClickDescriptionMore: false})
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {
        var height = this.descriptionsRef.offsetHeight;
        var self = this
        if (height > nextProps.maxHeight - 10) {
            self.setState({showMoreIcon: true})
        }
    }

    handleOk() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div className={style.ShowMore}>
                <div className={style.description} ref={node => this.descriptionsRef = node}
                     style={{maxHeight: this.props.maxHeight}}>
                    {this.props.children}
                </div>
                {
                    this.state.showMoreIcon && <div className={style.moreWrapper}>
                        {
                            !this.state.isClickDescriptionMore && this.props.mode == MODE.NOT_HOVE &&
                            <div className={style.more}
                                 style={{paddingLeft: 40}}
                                 onClick={this.showMore.bind(this)}
                            >... <Icon type={"down"}></Icon></div>
                        }
                        {
                            !this.state.isClickDescriptionMore && this.props.mode == MODE.HOVE &&
                            <Popover placement="left" title={"查看"} content={
                                <div style={{width:250}}>
                                    { this.props.children}
                                </div>
                            } trigger="click">
                                <div className={style.more}
                                     style={{paddingLeft: 40}}
                                     onClick={this.showMore.bind(this)}
                                >... <Icon type={"down"}></Icon></div>
                            </Popover>
                        }
                        {
                            this.state.isClickDescriptionMore && <div className={style.more}
                                                                      style={{paddingLeft: 10}}
                                                                      onClick={this.hightMore.bind(this)}
                            >收起 <Icon type={"up"}></Icon></div>
                        }
                    </div>

                }
            </div>
        );
    }
}

ShowMore.defaultProps = {
    content: "",
    maxHeight: 125,
    mode: MODE.NOT_HOVE
}
export default ShowMore;
import React from 'react'
import Merge from 'lodash.merge'
import {uuid} from "../../../util/uitls";

export default class DingYiSpin extends React.Component {
    render() {
        var _props = {
            spinning: false,
            style: {
                width: 50,
                height: 50
            }
        }
        var props = Merge(_props, this.props)
        return <div
            key={uuid()}
            indicator={<img src="/static/loading.gif" alt=""
                            style={props.style}
            />}
            spinning={props.spinning}
        >
            {props.children}
        </div>
    }
}
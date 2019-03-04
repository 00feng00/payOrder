import React from 'react';
import style from './style.css'

import Map from 'lodash.map'
import Filter from 'lodash.filter'
import {uuid} from "../../util/uitls";

class MyTabs extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tabs: props.tabs,
            defaultTab: props.defaultTab,
        }
    }

    onClick(tab) {
        this.setState({defaultTab: tab.title})
        this.props.onChange(tab.title)
    }

    render() {
        var self = this
        return (
            <div className={style.MyTabs}>
                <div className={style.tabsHeader}>
                    {
                        Map(this.state.tabs, tab => {
                            return <div
                                key={uuid()}
                                onClick={self.onClick.bind(this, tab)}
                                className={`${style.tabTitle} ${self.state.defaultTab == tab.title ? style.active : ""}`}>
                                {tab.title}
                            </div>
                        })
                    }
                </div>
                <div className={style.tabContent}>
                    {Filter(this.state.tabs, item => item.title == self.state.defaultTab)[0].component()}
                </div>
            </div>
        );
    }
}

MyTabs.defaultProps = {
    tabs: [],
    defaultTab: "",
    onChange: () => {
    },
    color: "#ff5b05"
}
export default MyTabs;
/*
*
* ```
* tabs []
* defaultTab
* onChange
* tabs=>tab
* {
* title:"",
* component:""
* }
* ```
* */
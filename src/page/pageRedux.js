import React from 'react';
import {connect} from 'react-redux';
import {setStoreUtil, getStoreUtil, initStoreFromLocal} from '../util/store'

export default function (WrappedComponent, options = {}) {
    class MyComponent extends React.Component {
        constructor(props) {
            super()
            initStoreFromLocal.call(props)
            this.getStore = getStoreUtil.bind(props)
            this.setStore = setStoreUtil.bind(props)
        }

        componentWillMount() {
            var self = this
        }

        render() {
            return (<WrappedComponent {...this.props} getStore={this.getStore} setStore={this.setStore}/>)
        }
    }

    var _actionToProps = options.actionToProps
    return connect(function (state, myProps) {
        return {_store: state, store: state, ...myProps}
    }, function (dispatch, ownProps) {
        return {
            dispatch,
            ..._actionToProps && options.actionToProps(dispatch)
        }
    })(MyComponent)
}
import React from 'react';
import Spin from './common/spin/index.js'

/**
 * react组件 loading
 * @author 刘明泰 <18819448261>
 * @todo 加载动画需要美化
 * @param {Object} props
 *   isLoading{boolean}是否加载;
 *   timedOut{number}加载时间
 * @return {React.Component}
 * @example <Loading isLoading={true} timedOut={100} />
 * */

export default function Loading(props) {
    if (props.isLoading) {
        if (props.timedOut) {
            return <div>Loader timed out!</div>;
        } else if (props.pastDelay) {
            return <div
                style={{
                    width: '100%', height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            ><Spin size="large"
                   spinning="true"
                   style={{margin: 10}}/>Loading...</div>;
        } else {
            return null;
        }
    } else if (props.error) {
        return <div>Error! Component failed to load</div>;
    } else {
        return null;
    }
}
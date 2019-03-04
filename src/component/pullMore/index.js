import React from 'react';
import {PullToRefresh} from 'antd-mobile'
import style from './stlye.css'

class PullMore extends React.Component {
    constructor() {
        super()
        this.state = {
            height: document.documentElement.clientHeight,
            refreshing: false,
            showFooter: false,
            damping: 60
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
        }), 0);
    }


    render() {
        var self = this
        return (
            <div>
                <PullToRefresh
                    damping={this.state.damping}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    // indicator={this.state.down ? {} : {deactivate: '上拉可以刷新'}}
                    direction={'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        if (!self.state.showFooter) {
                            this.setState({refreshing: true});
                            setTimeout(() => {
                                this.setState({refreshing: false});
                            }, 5000);
                            self.props.onRefresh && self.props.onRefresh().then((res) => {
                                if (!res) {
                                    self.setState({showFooter: true, refreshing: false})
                                } else {
                                    self.setState({refreshing: false, showFooter: false});
                                }
                            })
                        } else {
                            self.setState({refreshing: false, showFooter: true, damping: 0});
                        }

                    }}
                >
                    {this.props.children}
                    {this.state.showFooter && <div
                        className={style.bottom}
                    >
                        我也是有底线的
                    </div>}
                </PullToRefresh>
            </div>
        );
    }
}

PullMore.defaultProps = {
    onRefresh() {
    }
}
export default PullMore;
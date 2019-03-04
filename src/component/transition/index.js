import React from 'react'
import {TransitionMotion, spring} from 'react-motion'

export default class Transition extends React.Component {
    constructor(props) {
        super()
        let defaultStyles = [], styles = [];
        React.Children.forEach(props.children, (child, i) => {
            if (child) {
                defaultStyles.push({
                    key: child.key,
                    data: child,
                    style: {opacity: 0}
                });
                styles.push({
                    key: child.key,
                    data: child,
                    style: {opacity: spring(1)}
                });
            }
        });
        this.defaultStyles = defaultStyles
        this.styles = styles
    }

    willEnter() {
        return {opacity: 0}
    }

    willLeave() {
        return {opacity: spring(0, {stiffness: 90, damping: 11})}
    }

    componentDidMount() {

    }

    render() {
        return <TransitionMotion
            defaultStyles={this.defaultStyles}
            styles={this.styles}
            willEnter={this.willEnter}
            willLeave={this.willLeave}
        >
            {
                (styles) => <div className={"fukc you"}> {
                    styles.map((child) => {
                        const {key, data, style} = child;
                        console.log(data)
                        return React.cloneElement(
                            data,
                            {key: key, style: style}
                        );
                    })}
                </div>
            }
        </TransitionMotion>
    }
}
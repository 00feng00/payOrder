import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        // You can also log the error to an error reporting service
        console.log(error);
        console.log(info)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>界面发生错误，请尝试使用最新的谷歌浏览器</h1>;
        }
        return this.props.children;
    }
}
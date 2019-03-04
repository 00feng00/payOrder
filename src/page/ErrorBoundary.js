export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true, error});
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h1>界面出了问题，请联系客服！</h1>
                <div dangerouslySetInnerHTML={{__html: this.state.error}}></div>
            </div>
        }
        return this.props.children;
    }
}
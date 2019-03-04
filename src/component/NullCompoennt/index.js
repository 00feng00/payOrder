import React from 'react';
import styles from './style.css'

class NullCompoennt extends React.Component {
    constructor(props) {
        super()
        this.state = {
            hasMore: true,
            autoLoadMore: false,
            headStylesTop: 97,
            array: [1],
            user: {
                userImage: ""
            }
        }
    }

    componentDidMount() {
        var self = this
    }


    render() {
        return <div className={styles.null1}>
            <div className={styles.wrapperImage}>
                <img src={this.props.image} alt=""/>
            </div>
            <div className={styles.title}>
                {this.props.title}
            </div>
        </div>
    }
}

NullCompoennt.defaultProps = {
    image: "/static/null/1.png",
    title: ""
}
export default NullCompoennt
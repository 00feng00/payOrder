import React from 'react';

class MyIcon extends React.Component {
    render() {
        var {type, style, onClick, className} = this.props;
        var _style = style
        return <svg className={"icon " + className} aria-hidden="true"
                    style={_style}
                    onClick={onClick}
        >
            <use xlinkHref={'#' + type}></use>
        </svg>
    }
}

export default MyIcon;
import React from 'react'
import {uuid} from "../../util/uitls";
import style from './style.css'
import {Spring, Transition} from 'react-spring'
import {TimingAnimation, Easing} from 'react-spring/dist/addons'

class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: props.visible,};
        this.uuid = "m" + uuid()
    };


    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible})
    }


    /*  shouldComponentUpdate(nextProps, nextState) {
          if (this.props.visible !== nextProps.visible) {
              return true;
          }
          if (this.state.visible !== nextState.visible) {
              return true;
          }
          return false;
      }*/


    onClose() {
        this.props.onClose()
    }

    render() {
        var self = this;
        var bottom = this.props.animationType == "slide-up" ? 0 : undefined;
        var top = this.props.animationType == "slide-down" ? 0 : undefined
        var top = this.props.animationType == "center" ? '50%' : undefined
        return <Transition
            impl={TimingAnimation}
            config={{duration: 300}}
            from={{opacity: 0, transform: " translateY(500px)"}}
            enter={{opacity: 1, transform: " translateY(0px)", bottom, top}}
            leave={{opacity: 0, transform: " translateY(500px)",}}
        >
            {
                this.state.visible &&
                ((styles) => {
                    return <div className={style.modalwrapper}>
                        <div className={style.mark} onClick={this.props.onClose}></div>
                        <div className={style.content} style={{...styles, ...self.props.style}}>
                            {self.props.children}
                        </div>
                    </div>
                })
            }
        </Transition>
    }
}

MyModal.defaultProps = {
    popup: false,
    visible: false,
    onClose() {
    },
    animationType: "slide-up",
    style: {}
}
export default MyModal
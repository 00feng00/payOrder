import React from 'react'
import {uuid} from "../../util/uitls";
import style from './style.css'
import {Spring, Transition} from 'react-spring'
import {TimingAnimation, Easing} from 'react-spring/dist/addons'

class Drawing extends React.Component {
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
        return <Transition
            impl={TimingAnimation}
            config={{duration: 300}}
            from={{opacity: 0, transform: " translateX(-500px)"}}
            enter={{opacity: 1, transform: " translateX(0px)", left:0}}
            leave={{opacity: 0, transform: " translateX(-500px)",}}
        >
            {
                this.state.visible &&
                ((styles) => {
                    return <div className={style.modalwrapper}>
                        <div className={style.mark} onClick={this.props.onClose}></div>
                        <div className={style.content} style={styles}>
                            {self.props.children}
                        </div>
                    </div>
                })
            }
        </Transition>
    }
}

Drawing.defaultProps = {
    popup: false,
    visible: false,
    onClose() {
    },
}
export default Drawing
import React from 'react'
import "./swiper.css";
import { get_banner } from '../../../api/banner';
class MySwiper extends React.Component {
    constructor() {
        super()
        this.state = {
            images: []
        }
    }
    componentDidMount() {
        var self = this;
        get_banner({ deviceId: 1 }).then(images => {
            self.setState({ images }, () => {
                var mySwiper = new window.Swiper(this._swipper, {
                    // loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })
            })
        })

    }
    render() {
        return <div>
            <div className="swiper-container" ref={node => this._swipper = node}>
                <div className="swiper-wrapper">
                    {
                        this.state.images.map(image => <div className="swiper-slide" >
                            <img src={image.url} alt="" />
                        </div>)
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    }
}
export default MySwiper
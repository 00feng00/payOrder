import React from 'react'
import styles from './home.css'
import Swiper from './swiper/swiper'
import { get_products } from '../../api/products';
import { getHeight } from '../../util/uitls';
import MyAlert from '../../util/alert';
import { MyMap, throttle } from '../../util/lodash';
const count_time = 120
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            categoryList: [],
            groupList: [],
            categoryActive: '',
            swipperHeight: 0,
            groupTopBottom: [],
            cartList: [],
            cartNumber: 0,
            cartTotalSum: 0,
            isShowCartAllHeight: false,
            count_time
        }
        this.scrolling = this.scrolling.bind(this)
        this.clickLeftItem = this.clickLeftItem.bind(this)
    }
    clickisShowCartAllHeight() {
        var self = this
        if (!this.state.isShowCartAllHeight) {
            /*开始倒计时 */
            this._interval = setInterval(() => {
                self.state.count_time = self.state.count_time - 1;
                self.setState({ count_time: self.state.count_time })
                if (self.state.count_time <= 0) {
                    self.setState({ count_time })
                    clearInterval(self._interval)
                }
            }, 1000);
        } else {
            self.setState({ count_time })
            clearInterval(self._interval)
        }
        this.setState({ isShowCartAllHeight: !this.state.isShowCartAllHeight })
    }
    clickClearCart() {
        var self = this
        MyAlert.confirm("确定要删除购物车吗？").then(res => {
            if (res.success) {
                self.state.cartList = []
                var cartNumber = 0;
                var cartTotalSum = 0;
                self.state.cartList.map(_item => {
                    cartNumber += _item.quatity
                    cartTotalSum += _item.quatity * _item.price
                })
                clearInterval(self._interval)
                self.setState({ cartList: self.state.cartList, cartNumber, cartTotalSum, isShowCartAllHeight: false, count_time })

            }
        })
    }
    downCartItem(cartItem) {
        var index = this.state.cartList.findIndex(__item => __item.id == cartItem.id)
        this.state.cartList[index].quatity = this.state.cartList[index].quatity - 1;
        if (this.state.cartList[index].quatity == 0) {
            this.state.cartList.splice(index, 1)
        } else {
            this.state.cartList[index].sum = this.state.cartList[index].quatity * this.state.cartList[index].price
        }
        var cartNumber = 0;
        var cartTotalSum = 0;
        this.state.cartList.map(_item => {
            cartNumber += _item.quatity
            cartTotalSum += _item.quatity * _item.price
        })
        this.setState({ cartList: this.state.cartList, cartNumber, cartTotalSum })
    }
    upCartItem(cartItem) {
        var index = this.state.cartList.findIndex(__item => __item.id == cartItem.id)
        this.state.cartList[index].quatity = this.state.cartList[index].quatity + 1;
        this.state.cartList[index].sum = this.state.cartList[index].quatity * this.state.cartList[index].price
        var cartNumber = 0;
        var cartTotalSum = 0;
        this.state.cartList.map(_item => {
            cartNumber += _item.quatity
            cartTotalSum += _item.quatity * _item.price
        })
        this.setState({ cartList: this.state.cartList, cartNumber, cartTotalSum })
    }
    addToCart(item) {
        /* 查找是否已经存在 */
        var index = this.state.cartList.findIndex(__item => __item.id == item.id)
        if (index >= 0) {
            /*已经存在 添加sum */
            this.state.cartList[index].quatity = this.state.cartList[index].quatity + 1;
            this.state.cartList[index].sum = this.state.cartList[index].quatity * this.state.cartList[index].price
        } else {
            item.quatity = 1;
            item.sum = item.quatity * item.price
            this.state.cartList.push(item)
        }
        var cartNumber = 0;
        var cartTotalSum = 0;
        this.state.cartList.map(_item => {
            cartNumber += _item.quatity
            cartTotalSum += _item.quatity * _item.price
        })
        this.setState({ cartList: this.state.cartList, cartNumber, cartTotalSum })
    }
    scrolling(e) {
        var self = this
        var scrollTop = e.target.scrollTop
        // console.log(e.target.scrollTop, this.state.groupTopBottom[1].top)
        this.state.groupTopBottom.map(group => {
            if (scrollTop < group.bottom && group.top <= scrollTop) {
                self.setState({ categoryActive: group.id })
            }
        })
    }
    clickLeftItem(categoryActive) {
        this.setState({ categoryActive })
        var scrollTop = this.state.groupTopBottom.filter(item => item.id == categoryActive)[0].top
        document.querySelector('.rightScrollView').scrollTop = scrollTop
    }
    getGroupTopBottom() {
        var self = this
        if (self.state.groupTopBottom.length == 0) {
            var groups = document.querySelectorAll('.group')
            self.state.groupTopBottom = MyMap(groups, group => {
                var id = group.dataset.label
                var top = group.offsetTop - 341
                var bottom = top + group.offsetHeight
                return { id, top, bottom }
            })
            self.setState({ groupTopBottom: self.state.groupTopBottom })
        }
    }
    componentDidMount() {
        var self = this
        MyAlert.loading()
        get_products({ deviceId: 1 }).then(({ categoryList, groupList }) => {
            MyAlert.clear()
            self.setState(
                { categoryList, groupList, categoryActive: categoryList[0], swipperHeight: self._swipper.offsetHeight },
                () => {
                    self.getGroupTopBottom()
                    /* 滚动监听 */
                    document.querySelector('.rightScrollView').addEventListener('scroll', throttle(self.scrolling))

                }
            )
        }).catch(e => {
            MyAlert.clear()
        })
    }
    render() {
        var self = this
        return <div className={styles.home}>
            <div className={styles.imageWrapper} ref={node => this._swipper = node}>
                <Swiper></Swiper>
            </div>
            <div className={styles.center} style={{
                height: (getHeight() - self.state.swipperHeight) + "px"
            }}>
                <div className={styles.left}>
                    {
                        this.state.categoryList.map(category => {
                            return <div className={`${styles.leftItem}
                             ${category == self.state.categoryActive ? styles.active : 'none'}`}
                                onClick={self.clickLeftItem.bind(self, category)}
                            >
                                {category}
                            </div>
                        })
                    }
                </div>
                <div className={`${styles.right} rightScrollView`}
                    style={{
                        height: (getHeight() - self.state.swipperHeight) + "px"
                    }}
                >
                    {
                        this.state.groupList.map(group => {
                            return <div className="group" data-label={group.label}>
                                <div className={styles.groupLabel}>{group.label}</div>
                                {
                                    group.items.map(item => {
                                        return <div className={styles.rightItem}>
                                            <div className={styles.rightItemInner}>
                                                <div className={styles.wrapperImage}>
                                                    <img src={item.image} alt="" />
                                                    <i className={`${styles.fontSize} iconfont icon-jia-tianchong`} onClick={self.addToCart.bind(self, item)}></i>
                                                </div>
                                                <div className={styles.price}>
                                                    ￥{item.price}.00
                                            </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }

                </div>
            </div>

            {
                this.state.cartList.length == 0 && <div className={styles.bottom1}>
                    <div className={styles.row1}>
                        <div className={styles.cartIconDadage}>
                            <i className={`${styles.cartIcon} iconfont icon-gouwuchekong`}></i>
                            <span className={styles.badege}>{this.state.cartNumber}</span>
                        </div>
                    </div>
                </div>
            }
            {/* 半透明 */}
            {this.state.isShowCartAllHeight && <div
                onClick={this.clickisShowCartAllHeight.bind(this)}
                className={styles.mark}>1</div>}
            {
                this.state.cartList.length != 0 && <div className={styles.bottom2} style={{ width: true ? '100%' : 'auto' }}>
                    <div className={styles.row1left}>
                        <div className={styles.row1}>
                            <div className={styles.cartIconDadage}>
                                <i className={`${styles.cartIcon} iconfont icon-gouwuchekong`}></i>
                                <div className={styles.badege_seeMore}>
                                    <div className={styles.badege}>{this.state.cartNumber}</div>
                                    <div className={styles.seeMore} onClick={this.clickisShowCartAllHeight.bind(this)}>查看购物车</div>
                                </div>
                            </div>
                            <div className={styles.clearText} onClick={self.clickClearCart.bind(self)}>清空</div>
                        </div>
                        <div className={styles.row2} style={{ maxHeight: self.state.isShowCartAllHeight ? "none" : '2.5rem' }}>
                            {
                                this.state.cartList.map(cartItem => {
                                    return <div className={styles.row2Item} >
                                        <div className={styles.wrapperItemImage}>
                                            <img src={cartItem.image} alt="" />
                                        </div>
                                        <div className={styles.numberBtn}>
                                            <i className={`iconfont icon-reduce_b ${styles.iconfont}`}
                                                onClick={self.downCartItem.bind(self, cartItem)}
                                            ></i>
                                            <span className={styles.number}>{cartItem.quatity}</span>
                                            <i className={`iconfont icon-plus1  ${styles.iconfont}`} style={{ color: '#FE0265' }}
                                                onClick={self.upCartItem.bind(self, cartItem)}
                                            ></i>
                                        </div>
                                        <div className={styles.sumText}>￥{cartItem.sum}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.row1Right}>
                        <div className={styles.wrapperImage}>
                            <img src="http://dummyimage.com/250x250" alt="" />
                        </div>
                        <div className={styles.sumAllText}>￥{this.state.cartTotalSum}</div>
                        <div className={styles.smallTitle}>微信支付</div>
                        {
                            self.state.isShowCartAllHeight && <div className={styles.countTimeText} >
                                <p>注：支付倒计</p>
                                <p>时，时间到了</p>
                                <p>自动关闭，支</p>
                                <p>付成功后自动</p>
                                <p>关闭，清空购</p>
                                <p>物车。<small style={{ color: '#FF0000' }}>({self.state.count_time}s)</small></p>
                            </div>
                        }

                    </div>
                </div>
            }

        </div>
    }
}

export default Home
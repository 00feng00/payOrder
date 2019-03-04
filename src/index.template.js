import React from 'react';
import styles from './style.css'
import Cookie from 'js-cookie'


import Map from 'lodash.map'
import {uuid} from "../../util/uitls";
import SearchBar from '../../component/searchBar'

class Home extends React.Component {
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
        var swiper = new Swiper(self.swiper, {
            slidesPerView: 'auto',
            spaceBetween: 40,
        });
    }


    render() {
        return <div>
            <SearchBar/>
        </div>
    }
}

export default Home
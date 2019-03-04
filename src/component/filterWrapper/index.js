import React from 'react';
import styles from './style.css'
import Cookie from 'js-cookie'


import Map from 'lodash.map'
import {uuid} from "../../util/uitls";
import SearchBar from '../../component/searchBar'
import FilterWrapperItem from './filterWrapperItem'

class FilterWrapper extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isShow: true,
        }
    }

    componentDidMount() {
        var self = this
    }


    render() {
        var self = this
        return <div className={styles.FilterWrapper}>
            {Map(this.props.lists, item => {
                return <FilterWrapperItem key={uuid()}
                                          item={item}
                                          values={this.props.values}
                                          onChange={(item) => {
                                              var values = Map(self.state.values, _item => {
                                                  if (_item.title == item.title) {
                                                      _item = item
                                                  }
                                                  return _item
                                              })
                                              self.setState({
                                                  values
                                              })
                                          }}
                />
            })}
        </div>
    }
}

FilterWrapper.defaultProps = {
    lists: [],
    values: [
        {title: "成分", value: 1},
        {title: "特点", value: 1},
        {title: "用途", value: 1}
    ]
}
export default FilterWrapper
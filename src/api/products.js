import axios from 'axios'
import { BASE_URL } from '../constants.js'
import { groupBy, MyMap } from '../util/lodash';

export function get_products({ deviceId }) {
    return axios.get(`${BASE_URL}/vm/api/products`).then(res => {
        var categoryList = [];
        var categoryObject = {}
        var groupList = [];
        var datasource = res.data.data
        datasource.map(item => {
            categoryObject[item.categoryName] = item.categoryName
        })
        var groupList1 = groupBy(datasource, item => item.categoryName)

        groupList = MyMap(groupList1, (item, key) => {
            return {
                label: key,
                items: item
            }
        })
        categoryList = MyMap(categoryObject, item => item)
        return { categoryList, groupList }
    });
}


import _Filter from 'lodash.filter'
import _Map from 'lodash.map'
import _Uniq from 'lodash.sorteduniq'
import _groupBy from 'lodash.groupby'

export const MyMap = _Map
export const Filter = _Filter
export const Uniq = _Uniq


export function mergeArray(a1, a2, key) {
    var _key = key || "designItemId"
    var finshArray = a1;
    _Map(a2, item2 => {
        var isExit = false;
        _Map(a1, item1 => {
            if (item1[_key] == item2[_key]) {
                isExit = true
            }
        })
        if (!isExit) {
            finshArray.push(item2)
        }
    })

    return finshArray
}

export function deleteTheSameOneArray(needA, longA, key) {
    var _key = key || "designItemId"
    var finshArray = [];
    _Map(needA, need_item => {
        var isTrue = true;
        _Map(longA, long_item => {
            if (long_item[_key] == need_item[_key]) {
                isTrue = false
            }
        })

        if (isTrue) {
            finshArray.push(need_item)
        }
    })

    return finshArray
}
export const throttle=require('lodash.throttle')
export const groupBy = _groupBy
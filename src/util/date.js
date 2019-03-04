import React from 'react'
import Moment from 'moment'

export function trampToDate({date, showTime, dateTimeFormat}) {
    if (!dateTimeFormat || dateTimeFormat.trim() == '')
        dateTimeFormat = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    if (!date) {
        return null
    }
    if (Object.prototype.toString.call(date) === '[object Date]')
        return Moment(date).format(dateTimeFormat)
    else //assume convertible
        return Moment(new Date(date)).format(dateTimeFormat)
}

export function getTime() {
    var tmp = Date.parse(new Date()).toString();
    tmp = tmp.substr(0, 10);
    return tmp;
}

export function getYearMonth(date) {
    var today = new Date(date);//获得当前日期
    var year = today.getFullYear();//获得年份
    var month = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份
    return `${year}-${month}`

}
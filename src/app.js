import 'babel-polyfill';
import "./app.css"
import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Home from './page/home/index.js'
import ReactDOM from 'react-dom'

function init() {
    ReactDOM.render(
        <Home></Home>,
        document.getElementById('root')
    );
}
init()

if (module.hot) {
    init()
    module.hot.accept();
}

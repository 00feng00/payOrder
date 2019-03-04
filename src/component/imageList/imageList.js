import React from 'react'
import style from './style.css'
import MyIcon from "../Icon/icon";

class ImageList extends React.Component {
    render() {
        return <div className={style.imageList}>
            <div className={style.item}>
                <div className={style.wrapperImage}>
                    <img src="" alt=""/>
                </div>
                <div className={style.bottom}>
                    <div className={style.titkle}>火龙果密语</div>
                    <MyIcon type={"icon-love"}></MyIcon>
                </div>
            </div>
            <div className={style.item}>
                <div className={style.wrapperImage}>
                    <img src="" alt=""/>
                </div>
                <div className={style.bottom}>
                    <div className={style.titkle}>火龙果密语</div>
                    <MyIcon type={"icon-love"}></MyIcon>
                </div>
            </div>
            <div className={style.item}>
                <div className={style.wrapperImage}>
                    <img src="" alt=""/>
                </div>
                <div className={style.bottom}>
                    <div className={style.titkle}>火龙果密语</div>
                    <MyIcon type={"icon-love"}></MyIcon>
                </div>
            </div>
            <div className={style.item}>
                <div className={style.wrapperImage}>
                    <img src="" alt=""/>
                </div>
                <div className={style.bottom}>
                    <div className={style.titkle}>火龙果密语</div>
                    <MyIcon type={"icon-love"}></MyIcon>
                </div>
            </div>
        </div>
    }
}

export default ImageList

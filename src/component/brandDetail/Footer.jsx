import React from 'react';
import style from './Footer.scss';

export default () => {
    return (
        <div className={style.Footer}>
            <span className={style.firstLine}></span>
            <div className={style.firstBlock}><p>为您推荐</p></div>
            <span className={style.lastLine}></span>
            <div className={style.lastBlock}><i></i><p>已经到最后啦</p><i></i></div>
        </div>
    );
}

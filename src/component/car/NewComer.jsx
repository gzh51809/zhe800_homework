import React, {
    Component
} from 'react';

import {TouchBox} from '../public'

import style from './NewComer.scss';

class NewComer extends Component {
    render() {
        return (
            <div className={style.NewComer}>
                <h3 className={style.money}>
                    <span>&yen;</span>50
                </h3>
                <div className={style.center}>
                    <h2>新人50元优惠卷</h2>
                    <h3>不能与其他优惠卷共享，仅限首单使用</h3>
                    <h3>19/02/09 22:22 ———— 19/02/13 23:59</h3>
                </div>
                <TouchBox tagName={'p'}
                          className={style.right}
                          activeClass={style.active}>
                    点击领取
                </TouchBox>
            </div>
        );
    }
}

NewComer.propTypes = {};

NewComer.defaultProps = {};

export default NewComer;

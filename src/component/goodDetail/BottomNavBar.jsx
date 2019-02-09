import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'
import icon from '../../scss/iconfont.css';
import style from './BottomNavBar.scss';

class BottomNavBar extends Component {
    render() {
        return (
            <div className={style.BottomNavBar}>
                <TouchBox className={style.icon}
                          activeClass={style.active}
                          tab={() => this.props.collection()}>
                    <i className={icon["icon-xiaoxi"]}></i>
                    <p>客服</p>
                </TouchBox>
                <TouchBox className={style.icon}
                          activeClass={style.active}
                          tab={() => this.props.customerService()}>
                    <i className={icon["icon-shoucang"]}></i>
                    <p>收藏</p>
                </TouchBox>
                <TouchBox className={style.icon}
                          activeClass={style.active}
                          tab={() => this.props.shopCar()}>
                    <i className={icon["icon-gouwuche"]}></i>
                    <p>购物车</p>
                </TouchBox>
                <TouchBox className={style.car}
                          activeClass={style.carActive}
                          tagName={'p'}
                          tab={() => this.props.addToCar()}>
                    加入购物车
                </TouchBox>
                <TouchBox className={style.buy}
                          activeClass={style.buyActive}
                          tagName={'p'}
                          tab={() => this.props.buy()}>
                    立即购买
                </TouchBox>
            </div>
        );
    }
}

BottomNavBar.propTypes = {
    customerService: PropTypes.func,
    collection: PropTypes.func,
    addToCar: PropTypes.func,
    shopCar: PropTypes.func,
    buy: PropTypes.func
};

BottomNavBar.defaultProps = {
    customerService: () => {},
    collection: () => {},
    addToCar: () => {},
    shopCar: () => {},
    buy: () => {}
};

export default BottomNavBar;

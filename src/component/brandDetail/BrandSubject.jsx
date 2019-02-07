import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {TouchBox} from '../public'

import base from '../../scss/base.scss';
import style from './BrandSubject.scss';
import icon from '../../scss/iconfont.css'

class BrandSubject extends Component {
    render() {
        let item = this.props.brand;
        return (
            <div className={style.BrandSubject}>
                <div className={style.subject}>
                    <div className={style.left}>
                        <div>
                            <img src={item.brandSrc} alt="加载失败"/>
                            <div>
                                <h2>{item.brandName}</h2>
                                <h3>已售{Number(item.saleAmount) >= 10000 ? `${item.saleAmount / 10000}万` : item.saleAmount}件</h3>
                            </div>
                        </div>
                    </div>
                    <TouchBox activeClass={style.active}
                              tagName={'h3'}>
                        <i className={this.props.isCollect ? classNames(icon["icon-weishoucang"], style.collected) : classNames(icon["icon-weishoucang"], style.collect)}></i>
                        <span>收藏</span>
                    </TouchBox>
                </div>
                <h2 className={Boolean(item.discountType) ? null : base.disappear}>
                    <span>{item.discountType}</span>
                    {item.discount}
                </h2>
                <div className={Boolean(item.coupon) ? style.coupon : base.disappear}>
                    <h2><span>&yen;</span>{item.couponPrice}</h2>
                    <div>
                        <h2>{item.couponDiscount}</h2>
                        <h3>{item.couponField}</h3>
                    </div>
                    <TouchBox tagName={'p'}
                              activeClass={style.getCoupon}>
                        点击领取
                    </TouchBox>
                </div>
            </div>
        );
    }
}

BrandSubject.propTypes = {
    brand: PropTypes.shape({
        brandSrc: PropTypes.string,
        brandName: PropTypes.string,
        saleAmount: PropTypes.string,
        discountType: PropTypes.string,
        discount: PropTypes.string,
        coupon: PropTypes.string,
        couponPrice: PropTypes.string,
        couponDiscount: PropTypes.string,
        couponField: PropTypes.string
    }),
    isCollect: PropTypes.bool,
    clickCollect: PropTypes.func,
    clickGetCoupon: PropTypes.func
};

BrandSubject.defaultProps = {
    brand: {},
    isCollect: false,
    clickCollect: () => {},
    clickGetCoupon: () => {}
};

export default BrandSubject;

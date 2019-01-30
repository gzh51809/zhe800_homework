import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public';

import style from './BrandCard.scss';
import base from '../../scss/base.scss';

class BrandCard extends Component {
    render() {
        return (
            <TouchBox className={style.BrandCard}
                      activeClass={style.BrandCardActive}
                      tab={this.props.clickItem}>
                <img src={this.props.brand.brandSrc} alt="加载失败"/>
                <div className={style.description}>
                    <p>{this.props.brand.brandName}</p>
                    <span>{this.props.brand.brandState}</span>
                </div>
                <div className={Boolean(this.props.brand.brandDiscount) ? style.discount : base.disappear}>
                    <i>惠</i>
                    <p>{this.props.brand.brandDiscount}</p>
                    <span></span>
                </div>
            </TouchBox>
        )
    }
}

BrandCard.propTypes = {
    brand: PropTypes.object,
    clickItem: PropTypes.func
};

BrandCard.defaultProps = {
    brand: {},
    clickItem: () => {}
};

export default BrandCard;



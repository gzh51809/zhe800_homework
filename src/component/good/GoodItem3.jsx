import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {TouchBox} from '../public'

import base from '../../scss/base.scss';
import style from './GoodItem3.scss';

class GoodItem3 extends Component {
    render() {
        return (
            <TouchBox className={classNames(style.GoodItem3, this.props.className)}
                      activeClass={style.active}
                      tab={() => this.props.clickItem(this.props.good)}>
                <div style={{backgroundImage: `url('${this.props.good.fengmianSrc}')`}}>
                    <h2>
                        <span className={this.props.good.isNew ? '' : style.disappear}>上新</span>
                        {this.props.good.name}
                    </h2>
                    <div className={style.section}>
                        <h3>&yen;
                            <span>{Math.trunc(this.props.good.price)}</span>
                            {Boolean(this.props.good.price - Math.trunc(this.props.good.price)) && ('.' + String(this.props.good.price).replace(/(\d*\.)/g, ''))}
                            <i>{this.props.good.afterDiscount}</i>
                            <del>{Boolean(this.props.good.originPrice) && '&yen;' + this.props.good.originPrice}</del>
                        </h3>
                        <p>{this.props.good.containPostage}</p>
                    </div>
                    <div className={style.section}>
                        <h4>{this.props.good.saleAmount >= 10000 ? (String(this.props.good.saleAmount / 10000) + '万') : this.props.good.saleAmount}件已售</h4>
                        <h5>去{this.props.good.linkName}</h5>
                    </div>
                    <div
                        className={Boolean(this.props.good.coupon) ? classNames(style.coupon, base.visible) : classNames(style.coupon, base.hidden)}>
                        <h2>{this.props.good.coupon}元卷</h2>
                        <h3>点击领取</h3>
                    </div>
                </div>
            </TouchBox>
        );
    }
}

GoodItem3.propTypes = {
    good: PropTypes.shape({
        fengmianSrc: PropTypes.string,
        isNew: PropTypes.string,
        originPrice: PropTypes.string,
        afterDiscount: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        containPostage: PropTypes.string,
        saleAmount: PropTypes.string,
        linkName: PropTypes.string,
        coupon: PropTypes.string
    }),
    clickItem: PropTypes.func
};

GoodItem3.defaultProps = {
    good: {
        fengmianSrc: '',
        isNew: '',
        originPrice: '',
        afterDiscount: '',
        name: '--',
        price: '--',
        containPostage: '',
        saleAmount: '',
        linkName: '',
        coupon: ''
    },
    clickItem: () => {}
};

export default GoodItem3;

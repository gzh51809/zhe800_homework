import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import style from './GoodItem4.scss';
import base from '../../scss/base.scss';
import jingbaojia from '../../image/jingbaojia.png';

class GoodItem4 extends Component {
    render() {
        let {good} = this.props;
        let isShockingPrice = Boolean(good.isShockingPrice) && (<img src={jingbaojia} alt=""/>);
        return (
            <TouchBox className={style.GoodItem4}
                      activeClass={style.active}
                      tab={() => this.props.clickItem(good)}>
                <div style={{backgroundImage: `url('${good.fengmianSrc}')`}}>
                    <h2>
                        {good.name}
                    </h2>
                    <h3>
                        <i>&yen;</i>
                        {good.price}
                        <span>&yen;{good.originPrice}</span>
                    </h3>
                    <span>已售{Number(good.saleAmount) >= 10000 ? Math.trunc(good.saleAmount / 10000) : good.saleAmount }件</span>
                    {isShockingPrice}
                </div>
            </TouchBox>
        );
    }
}

GoodItem4.propTypes = {
    good: PropTypes.shape({
        fengmianSrc: PropTypes.string,
        isShockingPrice: PropTypes.string,
        originPrice: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        saleAmount: PropTypes.string,
    }),
    clickItem: PropTypes.func
};

GoodItem4.defaultProps = {
    good: {
        fengmianSrc: '',
        isShockingPrice: '',
        originPrice: '',
        name: '',
        price: '',
        saleAmount: '',
    },
    clickItem: () => {}
};

export default GoodItem4;

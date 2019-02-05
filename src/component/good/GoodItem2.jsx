import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {TouchBox} from '../public'

import base from '../../scss/base.scss';
import style from './GoodItem2.scss';

class GoodItem2 extends Component {
    render() {
        return (
            <TouchBox className={classNames(style.GoodItem2, this.props.className)}
                      activeClass={style.active}
                      tab={() => this.props.clickItem(this.props.good)}>
                <div style={{backgroundImage: `url('${this.props.good.fengmianSrc}')`}}>
                    <h2>{this.props.good.name}</h2>
                    <h3>&yen;<span>{Math.trunc(this.props.good.price)}</span>{Boolean(this.props.good.price - Math.trunc(this.props.good.price)) && ('.' + String(this.props.good.price).replace(/(\d*\.)/g, ''))}</h3>
                </div>
            </TouchBox>
        );
    }
}

GoodItem2.propTypes = {
    good: PropTypes.shape({
        fengmianSrc: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string
    }),
    clickItem: PropTypes.func
};

GoodItem2.defaultProps = {
    good: {
        fengmianSrc: '',
        name: '--',
        price: '--'
    },
    clickItem: () => {}
};

export default GoodItem2;

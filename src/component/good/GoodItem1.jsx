import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import base from '../../scss/base.scss';
import style from './GoodItem1.scss';

class GoodItem1 extends Component {
    render() {
        return (
            <TouchBox className={style.GoodItem1}
                      activeClass={style.active}
                      tab={() => this.props.clickItem(this.props.good)}>
                <div style={{backgroundImage: `url('${this.props.good.fengmianSrc}')`}}>
                    <span className={Boolean(this.props.good.fieldName) ? base.visible : base.hidden}>{this.props.good.fieldName}</span>
                    <h2>{this.props.good.name}</h2>
                    <h3>{this.props.good.discount}</h3>
                </div>
            </TouchBox>
        );
    }
}

GoodItem1.propTypes = {
    good: PropTypes.shape({
        fengmianSrc: PropTypes.string,
        fieldName: PropTypes.string,
        name: PropTypes.string,
        discount: PropTypes.string
    }),
    clickItem: PropTypes.func
};

GoodItem1.defaultProps = {
    good: {
        fengmianSrc: '',
        fieldName: '',
        name: '--',
        discount: '--'
    },
    clickItem: () => {}
};

export default GoodItem1;

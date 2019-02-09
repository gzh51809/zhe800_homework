import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'
import icon from '../../scss/iconfont.css';
import style from './GoodAttribute.scss';

import AttributePoper from './AttributePoper';

class GoodAttribute extends Component {
    render() {
        let regular = this.props.attributes.reduce((target, item) => {
            if (!Boolean(target[item.kindId])) {
                target[item.kindId] = [];
            }
            target[item.kindId].push(item);

            return target;
        }, {});

        let title = Object.values(regular).map(value => value[0].name).join('、');
        let selectTitle = this.props.attributes.map(item => {
            if (item.select) {
                return item.attributeName;
            } else {
                return null;
            }
        }).filter(value => Boolean(value));

        return (
            <div className={style.GoodAttribute}>
                <TouchBox className={style.item}
                          activeClass={style.active}
                          tab={() => this.refs.poper.showPoper()}>
                    <p>{selectTitle.length === 0 ? `请选择 ${title}` : `已选择 ${selectTitle.join('、')}`}</p>
                    <i className={icon["icon-jiantou-you"]}></i>
                </TouchBox>
                <AttributePoper ref={'poper'}
                                goodTitle={selectTitle.length === 0 ? `请选择 ${title}` : `已选择 ${selectTitle.join('、')}`}
                                attribute={this.props.attributes}
                                good={this.props.good}
                                buyAmount={this.props.buyAmount}
                                addAmount={this.props.addAmount}
                                minusAmount={this.props.minusAmount}
                                selectAttribute={this.props.selectAttribute}
                                addToCar={this.props.addToCar}/>
            </div>
        );
    }
}

GoodAttribute.propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.shape({
        kindId: PropTypes.string,
        name: PropTypes.string,
        attributeId: PropTypes.string,
        attributeName: PropTypes.string,
        select: PropTypes.bool
    })),
    good: PropTypes.shape({
        price: PropTypes.string,
        fengmianSrc: PropTypes.string
    }),
    buyAmount: PropTypes.string,
    addAmount: PropTypes.func,
    minusAmount: PropTypes.func,
    selectAttribute: PropTypes.func,
    addToCar: PropTypes.func
};

GoodAttribute.defaultProps = {
    attributes: [],
    good: {},
    buyAmount: '1',
    addAmount: () => {},
    minusAmount: () => {},
    selectAttribute: () => {}
};

export default GoodAttribute;

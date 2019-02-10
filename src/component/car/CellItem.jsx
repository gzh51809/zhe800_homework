import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import style from './CellItem.scss';
import classNames from "classnames";
import icon from "../../scss/iconfont.css";

class CellItem extends Component {
    render() {
        let {good} = this.props;

        return (
            <div className={style.CellItem}>
                <TouchBox tagName={'p'}
                          tab={() => this.props.selectGood(this.props.good)}>
                    <i className={good.select ? classNames(icon["icon-quanxuanze"], style.select) : icon["icon-weiquanxuanze"]}></i>
                </TouchBox>
                <img src={good.fengmianSrc} alt="加载失败"/>
                <div className={style.right}>
                    <div className={style.top}>
                        <h2>{good.title}</h2>
                        <TouchBox tagName={'h3'}
                                  activeClass={this.props.edit ? style.active : null}
                                  tab={() => this.props.edit && this.props.selectAttribute(this.props.good)}>
                            <div className={this.props.edit ? style.edit : style.default}>
                                <p>{good.attributeName}</p>
                                <i className={icon["icon-jiantou-xia"]}></i>
                            </div>
                        </TouchBox>
                    </div>
                    <div className={style.price}>
                        <div className={style.left}>
                            <h2><span>¥</span>{good.price}</h2>
                            <h3>¥{good.originPrice}</h3>
                        </div>
                        <div className={style.right}>
                            <TouchBox tagName={'i'}
                                      tab={() => this.props.minusAmount()}
                                      activeClass={style.active}>
                                -
                            </TouchBox>
                            <span>{good.buyAmount}</span>
                            <TouchBox tagName={'i'}
                                      tab={() => this.props.addAmount()}
                                      activeClass={style.active}>
                                +
                            </TouchBox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CellItem.propTypes = {
    edit: PropTypes.bool,
    good: PropTypes.shape({
        fengmianSrc: PropTypes.string,
        goodId: PropTypes.string,
        buyAmount: PropTypes.string,
        price: PropTypes.string,
        originPrice: PropTypes.string,
        title: PropTypes.string,
        attributeName: PropTypes.string,
        select: PropTypes.bool
    }),
    selectGood: PropTypes.func,
    selectAttribute: PropTypes.func,
    addAmount: PropTypes.func,
    minusAmount: PropTypes.func
};

CellItem.defaultProps = {
    edit: false,
    good: {},
    selectGood: () => {},
    selectAttribute: () => {},
    addAmount: () => {},
    minusAmount: () => {}
};

export default CellItem;

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
                <TouchBox tagName={'i'}
                          tab={() => this.props.selectGood(this.props.good)}
                          className={good.select ? classNames(icon["icon-quanxuanze"], style.select) : icon["icon-weiquanxuanze"]}/>
                <img src="https://z2.tuanimg.com/imagev2/trade/800x800.ba05b28b68d0d5be6fe6c06f1f549cd0.400x.jpg" alt="加载失败"/>
                <div className={style.right}>
                    <h2>芊艺白色v领长袖t恤女2019春秋装新款小清新喇叭袖上衣打底衫9259</h2>
                    <TouchBox tab={() => console.log('显示属性选择框')}>
                        颜色：SR561女士 尺码：M
                    </TouchBox>
                </div>
            </div>
        );
    }
}

CellItem.propTypes = {
    good: PropTypes.shape({
        goodId: PropTypes.string,
        buyAmount: PropTypes.string,
        select: PropTypes.bool
    }),
    attribute: PropTypes.arrayOf(PropTypes.shape({

    })),
    selectGood: PropTypes.func
};

CellItem.defaultProps = {
    good: {},
    attribute: [],
    selectGood: () => {}
};

export default CellItem;

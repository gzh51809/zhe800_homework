import React, {
    Component
} from 'react';
import icon from '../../scss/iconfont.css';
import PropTypes from 'prop-types';

import style from './GoodDetailContent.scss';

class GoodDetailContent extends Component {
    render() {
        return (
            <div className={style.GoodDetailContent}>
                <div className={style.interval}>
                    <p></p>
                    <i className={icon["icon-tuwenxiangqing"]}></i>
                    <span>图文详情</span>
                    <p></p>
                </div>
                <div className={style.shopkeeper}>
                    <h3 className={style.title}><i className={icon["icon-lingdang"]}></i><p>商家提醒</p></h3>
                    <div dangerouslySetInnerHTML={{__html: this.props.shopkeeperNote}}></div>
                </div>
                <div className={style.goodParam}>
                    <h3 className={style.title}>
                        <p></p>
                        <span>商品参数</span>
                        <p></p>
                    </h3>
                    <div dangerouslySetInnerHTML={{__html: this.props.goodParams}}></div>
                </div>
                <div className={style.goodPic}>
                    <h3 className={style.title}>
                        <p></p>
                        <span>商品简介</span>
                        <p></p>
                    </h3>
                    <img src={this.props.authorization} alt="加载失败"/>
                    <img src={this.props.detailImage} alt="加载失败"/>
                </div>
            </div>
        );
    }
}

GoodDetailContent.propTypes = {
    shopkeeperNote: PropTypes.string,
    goodParams: PropTypes.string,
    detailImage: PropTypes.string,
    authorization: PropTypes.string
};

GoodDetailContent.defaultProps = {
    shopkeeperNote: '',
    goodParams: '',
    detailImage: '',
    authorization: ''
};

export default GoodDetailContent;

import React, {
    Component
} from 'react';

import style from './GoodParam.scss';
import icon from '../../scss/iconfont.css';
import {TouchBox, PoperContainer} from '../public';
import PropTypes from "prop-types";

class GoodParam extends Component {
    render() {
        return (
            <div className={style.GoodParam}>
                <TouchBox className={style.item}
                          activeClass={style.active}
                          tab={() => this.refs.poper.showPoper()}>
                    <p>商品参数</p>
                    <i className={icon["icon-jiantou-you"]}></i>
                </TouchBox>
                <PoperContainer ref={'poper'} title={'商品参数'}>
                    <div className={style.popContent}
                         dangerouslySetInnerHTML={{__html: this.props.params}}></div>
                </PoperContainer>
            </div>
        );
    }
}

GoodParam.propTypes = {
    params: PropTypes.string
};

GoodParam.defaultProps = {
    params: ''
};

export default GoodParam;

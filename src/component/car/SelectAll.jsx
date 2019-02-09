import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import style from './SelectAll.scss';
import icon from '../../scss/iconfont.css';
import classNames from 'classnames';

class SelectAll extends Component {
    constructor(){
        super();
        this.state = {
            selectAll: false
        }
    }

    render() {
        return (
            <div className={style.SelectAll}>
                <div className={style.left}>
                    <div className={style.selectAll}>
                        <TouchBox tagName={'i'}
                                  tab={() => this.setState({selectAll: !this.state.selectAll})}
                                  className={this.state.selectAll ? classNames(icon["icon-quanxuanze"], style.select) : icon["icon-weiquanxuanze"]}/>
                        <p>全选</p>
                    </div>
                    <div className={style.settleContent}>
                        <h2>合计：<span>¥0.00</span></h2>
                        <h3>不含运费、平台卷</h3>
                    </div>
                </div>
                <TouchBox tagName={'p'}
                          tab={() => this.props.settle()}
                          activeClass={style.active}
                          className={style.right}>
                    结算
                </TouchBox>
            </div>
        );
    }
}

SelectAll.propTypes = {
    settle: PropTypes.func
};

SelectAll.defaultProps = {
    settle: () => {}
};

export default SelectAll;

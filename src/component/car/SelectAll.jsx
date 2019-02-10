import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import style from './SelectAll.scss';
import icon from '../../scss/iconfont.css';
import base from '../../scss/base.scss';
import classNames from 'classnames';

class SelectAll extends Component {
    render() {
        return (
            <div className={style.SelectAll}>
                <div className={style.left}>
                    <div className={style.selectAll}>
                        <TouchBox tagName={'h3'}
                                  tab={() => this.props.selectAll()}>
                            <i className={this.props.select ? classNames(icon["icon-quanxuanze"], style.select) : icon["icon-weiquanxuanze"]}></i>
                        </TouchBox>
                        <p>全选</p>
                    </div>
                    <div className={this.props.edit ? base.hidden : style.settleContent}>
                        <h2>合计：<span>¥{this.props.total}</span></h2>
                        <h3>{this.props.discount}</h3>
                    </div>
                </div>
                <TouchBox tagName={'p'}
                          tab={() => {
                              this.props.edit ? this.props.delete() : this.props.settle()
                          }}
                          activeClass={style.active}
                          className={style.right}>
                    {this.props.edit ? '删除' : '结算'}
                </TouchBox>
            </div>
        );
    }
}

SelectAll.propTypes = {
    edit: PropTypes.bool,
    select: PropTypes.bool,
    total: PropTypes.string,
    discount: PropTypes.string,
    selectAll: PropTypes.func,
    settle: PropTypes.func,
    delete: PropTypes.func
};

SelectAll.defaultProps = {
    edit: false,
    select: false,
    total: '0.00',
    discount: '不含运费、平台卷',
    selectAll: () => {},
    settle: () => {},
    delete: () => {}
};

export default SelectAll;

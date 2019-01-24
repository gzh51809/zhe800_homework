import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './SearchBar.scss';
import icon from '../../scss/iconfont.css';

import {TouchBox} from '../public';

class SearchBar extends Component {
    render() {
        return (
            <TouchBox activeClass={style.SearchBarActive}
                      className={style.SearchBar}
                      tab={this.props.clickBar}>
                <i className={style.icon}></i>
                <div className={style.search}>
                    <i className={icon["icon-sousuo"]}></i>
                    <p>搜索低价商品</p>
                </div>
                <i className={classNames(style.searchKind, icon["icon-fenleisousuo"])}></i>
            </TouchBox>
        );
    }
}

SearchBar.propTypes = {
    clickBar: PropTypes.func
};

SearchBar.defaultProps = {
    clickBar: (() => {})
};

export default SearchBar

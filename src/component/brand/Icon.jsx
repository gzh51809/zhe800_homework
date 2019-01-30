import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {TouchBox} from '../public';

import style from './Icon.scss';

class Icon extends Component {
    render() {
        return (
            <TouchBox className={this.props.icon.select ? classNames(style.Icon, style.active) : classNames(style.Icon, style.default)}
                      activeClass={style.IconActive}
                      tab={this.props.clickItem}>
                <img src={this.props.icon.iconSrc} alt="加载失败"/>
                <p>{this.props.icon.iconName}</p>
            </TouchBox>
        )
    }
}

Icon.propTypes = {
    icon: PropTypes.object,
    clickItem: PropTypes.func
};

Icon.defaultProps = {
    icon: {},
    clickItem: () => {}
};

export default Icon;

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
            <TouchBox className={style.Icon}
                      activeClass={style.IconActive}
                      tab={this.props.clickItem}>
                <img src={this.props.icon.iconSrc} alt="加载失败"/>
                <p className={this.props.icon.select ? style.active : style.default}>{this.props.icon.iconName}</p>
            </TouchBox>
        )
    }
}

Icon.propTypes = {
    icon: PropTypes.shape({
        iconSrc: PropTypes.string,
        iconName: PropTypes.string,
        select: PropTypes.bool
    }),
    clickItem: PropTypes.func
};

Icon.defaultProps = {
    icon: {},
    clickItem: () => {}
};

export default Icon;

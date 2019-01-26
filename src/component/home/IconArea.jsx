import React, {
    Component
} from 'react';
import {TouchBox} from '../public';
import PropTypes from 'prop-types';
import style from './IconArea.scss';


class IconArea extends Component {
    render() {
        let icons = this.props.data.map((item, index) => {
            return (
                <TouchBox activeClass={style.activeIcon}
                          className={style.icon}
                          key={index}>
                    <img src={item.iconSrc} alt="加载失败"/>
                    <p>{item.iconName}</p>
                </TouchBox>
            )
        });

        return (
            <div className={style.IconArea}>
                {icons}
            </div>
        );
    }
}

IconArea.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        iconId: PropTypes.string,
        iconName: PropTypes.string,
        iconSrc: PropTypes.string
    })),
    clickIcon: PropTypes.func
};

IconArea.defaultProps = {
    data: [],
    clickIcon: (() => {})
};

export default IconArea;

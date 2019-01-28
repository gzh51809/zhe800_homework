import React, {
    Component
} from 'react';
import classNames from 'classnames';
import {TouchBox} from '../public';
import PropTypes from 'prop-types';
import style from './IconArea.scss';


class IconArea extends Component {
    render() {
        let iconClass = style.icon4;
        switch (this.props.iconRow) {
            case 2:
                iconClass = style.icon2;
                break;
            case 5:
                iconClass = style.icon5;
                break;
            default:
                iconClass = style.icon4;
                break;
        }

        let icons = this.props.data.map((item, index) => {
            return (
                <TouchBox activeClass={style.activeIcon}
                          className={classNames(style.icon, iconClass)}
                          key={item.iconSrc}>
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
    iconRow: PropTypes.number,
    clickIcon: PropTypes.func
};

IconArea.defaultProps = {
    data: [],
    iconRow: 4,
    clickIcon: (() => {})
};

export default IconArea;

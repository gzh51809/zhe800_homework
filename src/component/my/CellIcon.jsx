import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './CellIcon.scss';
import icon from '../../scss/iconfont.css';

import classNames from 'classnames';

import {
    TouchBox
} from '../public';

class CellIcon extends Component {
    render() {
        let icons = this.props.item.icons.map(item => (
            <TouchBox key={item.id}
                      tab={() => this.props.clickIcon(item)}
                      activeClass={style.active}>
                <i className={icon[item.icon]}></i>
                <span>{item.name}</span>
            </TouchBox>
        ));

        return (
            <div
                className={this.props.item.needBoldBottom ? classNames(style.CellIcon, style.boldBorder) : style.CellIcon}>
                {icons}
            </div>
        );
    }
}

CellIcon.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        name: PropTypes.string,
        needBoldBottom: PropTypes.bool
    }),
    clickIcon: PropTypes.func
};

CellIcon.defaultProps = {
    item: {},
    clickIcon: () => {
    },
};

export default CellIcon;

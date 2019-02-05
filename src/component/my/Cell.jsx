import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Cell.scss';
import icon from '../../scss/iconfont.css';

import classNames from 'classnames';

import {
    TouchBox
} from '../public';

class Cell extends Component {
    render() {
        return (
            <TouchBox className={this.props.item.needBoldBottom ? classNames(style.Cell, style.boldBorder) : style.Cell}
                      activeClass={style.active}
                      tab={this.props.clickCell}>
                <p>{this.props.item.left}</p>
                <div>
                    <p>{this.props.item.right}</p>
                    <i className={icon["icon-jiantou-you"]}></i>
                </div>
            </TouchBox>
        );
    }
}

Cell.propTypes = {
    item: PropTypes.shape({
        needBoldBottom: PropTypes.bool,
        left: PropTypes.string,
        right: PropTypes.string,
    }),
    clickCell: PropTypes.func,
};

Cell.defaultProps = {
    item: {},
    clickCell: () => {},
};

export default Cell;

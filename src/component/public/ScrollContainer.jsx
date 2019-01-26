import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './ScrollContainer.scss';

class ScrollContainer extends Component {
    render() {
        return (
            <div className={classNames(this.props.direction === 'horizontal' ? style.horizontal : style.vertical, this.props.className)}
                 onScroll={this.props.scroll}>
                {this.props.children}
            </div>
        );
    }
}

ScrollContainer.propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    scroll: PropTypes.func
};

ScrollContainer.defaultProps = {
    direction: 'vertical',
    scroll: (() => {})
};

export default ScrollContainer;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TouchBox from './TouchBox';

import style from './ScrollToTop.scss';
import iconfont from "../../scss/iconfont.css";

class ScrollToTop extends Component {
    render() {
        return (
            <TouchBox activeClass={style.active}
                      className={classNames(style.ScrollToTop, this.props.className)}
                      tab={this.props.clickAction}>
                <i className={iconfont["icon-huidingbu"]}></i>
                <p>顶部</p>
            </TouchBox>
        );
    }
}

ScrollToTop.propTypes = {
    clickAction: PropTypes.func
};

ScrollToTop.defaultProps = {
    clickAction: (() => {
    })
};

export default ScrollToTop;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ScrollToTop from './ScrollToTop';
import style from './ScrollContainer.scss';
import base from "../../scss/base.scss";

class ScrollContainer extends Component {

    constructor() {
        super();
        this.state = {
            displayScrollToTop: false
        };

        this.scrollToTop = this.scrollToTop.bind(this);
        this.scrollAction = this.scrollAction.bind(this);

        this.timer = null;
    }

    scrollToTop() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.refs.scrollContainer.scrollTop = this.refs.scrollContainer.scrollTop - 50;
            if (this.refs.scrollContainer.scrollTop === 0) {
                clearInterval(this.timer);
            }
        }, 10);
    }

    scrollAction(event) {
        if (this.props.direction === 'vertical' &&
            this.props.needScrollToTop) {

            if (event.target.scrollTop >= 1200 && this.state.displayScrollToTop === false) {
                this.setState({displayScrollToTop: true});
            } else if (event.target.scrollTop < 1200 && this.state.displayScrollToTop === true) {
                this.setState({displayScrollToTop: false});
            }
        }

        this.props.scroll(event);
    }

    render() {
        let scrollTopTop = this.state.displayScrollToTop && (
            <ScrollToTop className={classNames(base.visible, style.scrollToTop)}
                         clickAction={this.scrollToTop}/>
        );

        return (
            <div ref={'scrollContainer'}
                 className={classNames(this.props.direction === 'horizontal' ? style.horizontal : style.vertical, this.props.className)}
                 onScroll={this.scrollAction}
                 onTouchStart={() => this.timer = clearInterval(this.timer)}>
                <div
                    className={this.props.direction === 'horizontal' ? style.horizontalWrapper : style.verticalWrapper}>
                    {this.props.children}
                </div>
                {scrollTopTop}
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

ScrollContainer.propTypes = {
    needScrollToTop: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    scroll: PropTypes.func
};

ScrollContainer.defaultProps = {
    needScrollToTop: false,
    direction: 'vertical',
    scroll: (() => {
    })
};

export default ScrollContainer;

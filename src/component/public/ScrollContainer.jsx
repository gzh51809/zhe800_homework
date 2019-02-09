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
        this.scrollInput = this.scrollInput.bind(this);
        this.appleScroll = this.appleScroll.bind(this);

        //android 需要适配
        if (navigator.platform !== 'iPhone' && navigator.platform !== 'iPad') {
            document.addEventListener('touchend', this.scrollInput, {passive: false});
        }

        this.timer = null;
        this.scrollTop = 0;
        this.appleTimer = null;
        this.clientY = [];
    }

    scrollToTop() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.refs.scrollContainer.scrollTop = this.refs.scrollContainer.scrollTop - this.refs.wrapper.offsetHeight * 0.01;
            if (this.refs.scrollContainer.scrollTop === 0) {
                clearInterval(this.timer);
            }
        }, 10);
    }

    scrollInput(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            event.target.focus();

            // let offsetTop = Math.max(event.changedTouches[0].clientY - window.screen.height / 2, 0);
            // this.refs.wrapper.style.height = '150%';
            // this.scrollTop = this.refs.scrollContainer.scrollTop;
            // setTimeout(() => Boolean(this.refs.scrollContainer) && (this.refs.scrollContainer.scrollTop = offsetTop), 100);
        } else if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            // document.activeElement.blur();
            // setTimeout(() => {
            //     Boolean(this.refs.scrollContainer) && (this.refs.scrollContainer.scrollTop = this.scrollTop);
            //     Boolean(this.refs.wrapper) && (this.refs.wrapper.style.height = '100%');
            // }, 100);
        }
        event.stopPropagation();
    }

    scrollAction(event) {
        if (this.props.direction === 'vertical' &&
            this.props.needScrollToTop) {

            if (event.target.scrollTop >= 1200 && this.state.displayScrollToTop === false) {
                this.setState({displayScrollToTop: true});
            } else if (event.target.scrollTop < 1200 && this.state.displayScrollToTop === true) {
                this.setState({displayScrollToTop: false});
            }
            this.props.scroll(event);
        }
    }

    appleScroll(event) {
        event.stopPropagation();
        clearInterval(this.appleTimer);

        if (navigator.platform === 'iPhone' || navigator.platform === 'iPad' ){
            if (event.type === 'touchend') {
                let start = this.clientY[0];
                let end = this.clientY[this.clientY.length - 1];

                let speed = (end.clientY - start.clientY) / (end.timeStamp - start.timeStamp);
                if (!isFinite(speed)) {
                    return;
                }
                let direction = (speed > 0 ? 1 : -1);
                this.clientY = [];

                let l = Math.trunc( Math.min(Math.abs(speed), 8) * 20) * direction;
                clearInterval(this.appleTimer);
                this.appleTimer = setInterval(() => {
                    this.refs.scrollContainer.scrollTop -= l;
                    l -= direction * 8;
                    if (l <= 0 && direction === 1 ||
                        l >= 0 && direction === -1) {
                        clearInterval(this.appleTimer);
                    }
                }, 10);
            } else {
                let clientY = event.nativeEvent.touches[0].clientY;
                let timeStamp = Date.now();
                this.clientY.push({clientY, timeStamp});
            }
        }
    }

    componentDidMount() {
        setTimeout(() => this.refs.scrollContainer.scrollTop = this.props.scrollTop, 0);
    }

    render() {
        let scrollTopTop = this.state.displayScrollToTop && (
            <ScrollToTop className={classNames(base.visible, style.scrollToTop)}
                         clickAction={this.scrollToTop}/>
        );

        return (
            <div ref={'scrollContainer'}
                 className={classNames(this.props.direction === 'horizontal' ? style.horizontal : style.vertical, this.props.className)}
                 onScroll={event => {
                     this.scrollAction(event);
                     event.stopPropagation();
                 }}
                 onTouchStart={() => this.timer = clearInterval(this.timer)}>
                <div ref={'wrapper'}
                     onTouchStart={this.appleScroll}
                     onTouchMove={this.appleScroll}
                     onTouchEnd={this.appleScroll}
                     className={this.props.direction === 'horizontal' ? style.horizontalWrapper : style.verticalWrapper}>
                    {this.props.children}
                </div>
                {scrollTopTop}
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
        document.removeEventListener('touchend', this.scrollInput);
        clearInterval(this.appleTimer);
        this.appleTimer = null;
    }
}

ScrollContainer.propTypes = {
    needScrollToTop: PropTypes.bool,
    scrollTop: PropTypes.number,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    scroll: PropTypes.func
};

ScrollContainer.defaultProps = {
    needScrollToTop: false,
    scrollTop: 0,
    direction: 'vertical',
    scroll: (() => {
    })
};

export default ScrollContainer;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import base from '../../scss/base.scss';
import style from './Header.scss';
import icon from '../../scss/iconfont.css'

class Header extends Component {
    constructor() {
        super();
        this.state = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
        };

        this.timer = null;
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentWillMount() {
        this.startTimer();
    }

    startTimer() {
        clearInterval(this.timer);

        let dbNumber = number => String(number).length === 1 ? `0${number}` : String(number);

        let endDate = Date.parse(this.props.endTime);
        if (!isFinite(endDate)) {
            return;
        }

        let interval = Math.max(endDate - Date.now(), 0);
        let day = dbNumber(Math.trunc(interval / (1000 * 60 * 60 * 24)));
        let hour = dbNumber(Math.trunc(interval / (1000 * 60 * 60) % 24));
        let minute = dbNumber(Math.trunc(interval / (1000 * 60) % 60));
        let second = dbNumber(Math.trunc(interval / 1000 % 60));

        this.setState({day, hour, minute, second});
        this.timer = setInterval(() => {
            interval = Math.max(Date.parse(this.props.endTime) - Date.now(), 0);
            day = dbNumber(Math.trunc(interval / (1000 * 60 * 60 * 24)));
            hour = dbNumber(Math.trunc(interval / (1000 * 60 * 60) % 24));
            minute = dbNumber(Math.trunc(interval / (1000 * 60) % 60));
            second = dbNumber(Math.trunc(interval / 1000 % 60));
            this.setState({day, hour, minute, second});
        }, 500);
    }

    render() {
        let back = (
            <TouchBox tagName={'span'}
                      activeClass={style.active}
                      className={icon["icon-jiantou-zuo"]}
                      tab={() => this.props.clickBack()}>
            </TouchBox>
        );

        let center = (
            <div className={style.timer}>
                <h2>距离特卖结束还剩</h2>
                <p>{`${this.state.day}天${this.state.hour}小时${this.state.minute}分钟${this.state.second}秒`}</p>
            </div>
        );

        let rightPlaceHolder = (
            <span className={base.hidden}></span>
        );


        return (
            <div className={style.Header}>
                {back}
                {center}
                {rightPlaceHolder}
            </div>
        );
    }

    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentWillUnmount() {
        this.stopTimer();
    }
}

Header.propTypes = {
    endTime: PropTypes.string,
    clickBack: PropTypes.func
};

Header.defaultProps = {
    endTime: (new Date()).toString(),
    clickBack: () => {}
};

export default Header;

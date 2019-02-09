import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import style from './Subject.scss';
import base from '../../scss/base.scss';

class Subject extends Component {
    constructor() {
        super();
        this.state = {
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

        let endDate = Date.parse(this.props.good.endTime);
        if (!isFinite(endDate)) {
            endDate = Date.parse(new Date());
        }

        let interval = Math.max(endDate - Date.now(), 0);
        let hour = dbNumber(Math.trunc(interval / (1000 * 60 * 60)));
        let minute = dbNumber(Math.trunc(interval / (1000 * 60) % 60));
        let second = dbNumber(Math.trunc(interval / 1000 % 60));

        this.setState({hour, minute, second});
        this.timer = setInterval(() => {
            interval = Math.max(Date.parse(this.props.good.endTime) - Date.now(), 0);
            hour = dbNumber(Math.trunc(interval / (1000 * 60 * 60)));
            minute = dbNumber(Math.trunc(interval / (1000 * 60) % 60));
            second = dbNumber(Math.trunc(interval / 1000 % 60));
            this.setState({hour, minute, second});
        }, 500);
    }

    render() {
        let {good} = this.props;
        let yuan = good.price.split('.')[0];
        let fen = good.price.split('.')[1];
        return (
            <div className={style.Subject}>
                <div>
                    <div className={style.number}>
                        <p><span>&yen;</span>{yuan}<i className={Boolean(fen) ? base.visible : base.disappear}>{`.${fen}`}</i></p>
                    </div>
                    <div className={style.saleAmount}>
                        <span>&yen;{good.originPrice}</span>
                        <p>已售{Number(good.saleAmount) >= 10000 ? `${good.saleAmount / 10000}万` : good.saleAmount}件<span>新手价</span></p>
                    </div>
                    <p className={style.timer}>{`距结束${this.state.hour}时${this.state.minute}分${this.state.second}秒`}</p>
                </div>
                <p className={style.title}><span>值得买</span>{good.title}</p>
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

Subject.propTypes = {
    good: PropTypes.shape({
        title: PropTypes.string,
        price: PropTypes.string,
        originPrice: PropTypes.string,
        saleAmount: PropTypes.string,
        endTime: PropTypes.string
    }),
};

Subject.defaultProps = {
    good: {}
};

export default Subject

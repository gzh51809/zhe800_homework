import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './TimeCounter.scss';

class TimeCounter extends Component {
    constructor() {
        super();

        this.state = {
            hour: '00',
            minute: '00',
            second: '00'
        };
        this.timer = null;

        this.startTimer = this.startTimer.bind(this);
        this.timerCount = this.timerCount.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        let delta = new Date(this.props.deadline) - new Date();
        if (delta < 1000) {
            this.setState({hour: '00', minute: '00', second: '00'});
            this.props.enterDeadLine();
            this.stopTimer();
            return;
        }
        this.timerCount(delta);

        this.timer = setInterval(() => {
            delta = new Date(this.props.deadline) - new Date();

            //已到时，可以秒杀
            if (delta < 1000) {
                this.setState({hour: '00', minute: '00', second: '00'});
                this.props.enterDeadLine();
                this.stopTimer();
            } else {
                this.timerCount(delta);
            }
        }, 500);
    }

    timerCount(delta) {
        let hour = Math.trunc(delta / (1000 * 60 * 60));
        let formatHour = String(hour).length === 1 ? ('0' + String(hour)) : String(hour);

        let minute = Math.trunc(delta / (1000 * 60)) % 60;
        let formatMinute = String(minute).length === 1 ? ('0' + String(minute)) : String(minute);

        let second = Math.round(delta / 1000) % 60;
        let formatSecond = String(second).length === 1 ? ('0' + String(second)) : String(second);

        this.setState({
            hour: formatHour,
            minute: formatMinute,
            second: formatSecond
        });
    }

    render() {
        return (
            <div className={style.TimeCounter}>
                <p>{this.state.hour}</p>
                <span>:</span>
                <p>{this.state.minute}</p>
                <span>:</span>
                <p>{this.state.second}</p>
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

TimeCounter.propTypes = {
    enterDeadLine: PropTypes.func,
    deadline: PropTypes.number,     //秒杀时间搓
};

TimeCounter.defaultProps = {
    enterDeadLine: () => {},
    deadline: 0
};

export default TimeCounter;

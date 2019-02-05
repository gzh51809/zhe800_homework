import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import base from '../../scss/base.scss';
import style from './InputBox.scss';
import icon from '../../scss/iconfont.css';

import {TouchBox} from '../public';
import classNames from 'classnames';

class InputBox extends Component {
    constructor() {
        super();
        this.state = {
            interval: 0,
            tipClass: base.disappear
        };
        this.timer = null;

        this.counterStart = this.counterStart.bind(this);
    }

    counterStart() {
        let {item} = this.props;
        clearInterval(this.timer);

        let interval = Math.max(Math.trunc((Number(item.countEndDate) - Date.now()) / 1000), 0);
        if (interval === 0) return;

        this.setState({interval: interval});
        this.timer = setInterval(() => {
            interval = Math.max(Math.trunc((item.countEndDate - Date.now()) / 1000), 0);
            if (!Boolean(interval)) {
                clearInterval(this.timer);
                this.setState({interval: 0}, () => this.props.timerStop());
            } else {
                this.setState({interval});
            }
        }, 500);
    }

    render() {
        let {item} = this.props;

        let rightButtonEnable = (item.rightButtonEnable && !Boolean(this.state.interval));
        let rightButton = (
            <TouchBox tab={() => rightButtonEnable && (this.props.clickRightButton())}
                      tagName={'h3'}
                      activeClass={rightButtonEnable ? style.rightButtonActive : null}>
                <p className={rightButtonEnable ? classNames(style.rightButton, style.buttonActive) : style.rightButton}>
                    {Boolean(this.state.interval) ? this.state.interval : this.props.item.rightButton}
                </p>
            </TouchBox>
        );

        let rightIcon = (
            <TouchBox tagName={'h4'}
                      tab={() => this.props.clickRightIcon()}
                      activeClass={style.active}>
                <i className={classNames(icon[item.rightIcon], style.rightIcon)}></i>
            </TouchBox>
        );

        return (
            <div ref={'inputBox'}
                 className={style.InputBox}>
                <div>
                    <i className={icon[item.icon]}></i>
                    <div className={style.inputArea}>
                        <input ref={'input'}
                               value={item.value}
                               type={item.inputType}
                               onFocus={() => this.setState({tipClass: style.tips})}
                               onBlur={() => this.setState({tipClass: base.disappear})}
                               onChange={event => this.props.input(event.target.value)}
                               onInput={event => this.props.input(event.target.value)}
                               placeholder={item.placeholder}/>
                    </div>
                    {Boolean(item.rightButton) ? rightButton : null}
                    {Boolean(item.rightIcon) ? rightIcon : null}
                </div>
                <p className={this.state.tipClass}>{item.toast}</p>
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

InputBox.propTypes = {
    item: PropTypes.shape({
        icon: PropTypes.string,
        placeholder: PropTypes.string,
        inputType: PropTypes.string,
        value: PropTypes.string,
        regExp: PropTypes.instanceOf(RegExp),
        toast: PropTypes.string,
        rightButton: PropTypes.string,
        rightButtonEnable: PropTypes.bool,
        countEndDate: PropTypes.number
    }),
    input: PropTypes.func,
    clickRightButton: PropTypes.func,
    clickRightIcon: PropTypes.func,
    timerStop: PropTypes.func
};

InputBox.defaultProps = {
    item: {},
    input: () => {},
    clickRightButton: () => {},
    clickRightIcon: () => {},
    timerStop: () => {}
};

export default InputBox;

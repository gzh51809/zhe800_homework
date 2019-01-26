import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './AdArea.scss';

import {TouchBox} from '../public';

class AdArea extends Component {
    constructor() {
        super();
        this.state = {
            hour: '01',
            minute: '35',
            second: '27'
        };
        this.timer = null;

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            let delta = new Date(this.props.deadline) - new Date();

            //已到时，可以秒杀
            if (delta < 1000) {
                this.setState({hour: '00', minute: '00', second: '00'});
                this.props.enterDeadLine();
                this.stopTimer();
            } else {
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
        }, 500);
    }

    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return (
            <div className={style.AdArea}>
                <TouchBox activeClass={style.active}
                          tab={() => this.props.clickAdObject({...{type: 'gallery'}, ...this.props.adObject})}>
                    <img className={style.gallery}
                         src={this.props.adObject.gallerySrc || ''}
                         alt="加载失败"/>
                </TouchBox>
                <div className={style.areaWrapper}>
                    <div className={style.leftBig}
                         style={{backgroundImage: `url('${this.props.adObject.leftBigSrc || ''}')`}}>
                        <div className={style.timer}>
                            <p>{this.state.hour}</p>
                            <span>:</span>
                            <p>{this.state.minute}</p>
                            <span>:</span>
                            <p>{this.state.second}</p>
                        </div>
                        <TouchBox tagName={'p'}
                                  className={style.deadlinePrice}
                                  activeClass={style.active}
                                  tab={() => this.props.clickAdObject({...{type: 'leftBig'}, ...this.props.adObject})}>
                            <span>¥</span>{this.props.deadLinePrice}
                        </TouchBox>
                    </div>
                    <div>
                        <TouchBox className={style.rightTop}
                                  activeClass={style.active}
                                  style={{backgroundImage: `url('${this.props.adObject.rightTopSrc || ''}')`}}
                                  tab={() => this.props.clickAdObject({...{type: 'rightTop'}, ...this.props.adObject})}>
                        </TouchBox>
                        <div style={{display: 'flex'}}>
                            <TouchBox className={style.rightSmall}
                                      activeClass={style.active}
                                      style={{backgroundImage: `url('${this.props.adObject.rightBottomLeftSrc || ''}')`}}
                                      tab={() => this.props.clickAdObject({...{type: 'rightBottomLeft'}, ...this.props.adObject})}>
                            </TouchBox>
                            <TouchBox className={style.rightSmall}
                                      activeClass={style.active}
                                      style={{backgroundImage: `url('${this.props.adObject.rightBottomRightSrc || ''}')`}}
                                      tab={() => this.props.clickAdObject({...{type: 'rightBottomRight'}, ...this.props.adObject})}>
                            </TouchBox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.stopTimer();
    }
}

AdArea.propTypes = {
    adObject: PropTypes.shape({
        galleryId: PropTypes.string,            //顶部宣传图
        gallerySrc: PropTypes.string,
        leftBigId: PropTypes.string,            //左侧大图
        leftBigSrc: PropTypes.string,
        rightTopId: PropTypes.string,           //右侧顶部中图
        rightTopSrc: PropTypes.string,
        rightBottomLeftId: PropTypes.string,    //右侧底部左小图
        rightBottomLeftSrc: PropTypes.string,
        rightBottomRightId: PropTypes.string,   //右侧底部右小图
        rightBottomRightSrc: PropTypes.string,
    }),
    deadline: PropTypes.number,                 //秒杀时间搓
    deadLinePrice: PropTypes.string,            //秒杀价
    enterDeadLine: PropTypes.func,              //已到达

    clickAdObject: PropTypes.func,              //点击ad宣传图
};

AdArea.defaultProps = {
    adObject: {
        galleryId: '',
        gallerySrc: '',
        leftBigId: '',                         //左侧大图
        leftBigSrc: '',
        rightTopId: '',                        //右侧顶部中图
        rightTopSrc: '',
        rightBottomLeftId: '',                 //右侧底部左小图
        rightBottomLeftSrc: '',
        rightBottomRightId: '',                //右侧底部右小图
        rightBottomRightSrc: ''
    },

    clickAdObject: (() => {
    }),
    deadLinePrice: '0',
    enterDeadLine: (() => {
    })
};

export default AdArea;

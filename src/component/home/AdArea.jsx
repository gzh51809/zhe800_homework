import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './AdArea.scss';

import {TouchBox} from '../public';
import TimeCounter from './TimeCounter';

class AdArea extends Component {

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
                        <TimeCounter deadline={this.props.deadline} enterDeadLine={this.props.enterDeadLine}/>
                        <TouchBox tagName={'p'}
                                  className={style.deadlinePrice}
                                  activeClass={style.active}
                                  tab={() => this.props.clickAdObject({...{type: 'leftBig'}, ...this.props.adObject})}>
                            <span>&yen;</span>{this.props.deadLinePrice}
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
    deadLinePrice: PropTypes.string,            //秒杀价
    deadline: PropTypes.number,                 //秒杀时间搓
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

    clickAdObject: (() => {}),
    deadLinePrice: '0',
    enterDeadLine: (() => {
    })
};

export default AdArea;

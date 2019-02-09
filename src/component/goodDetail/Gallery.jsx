import React, {
    Component
} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

import {Carousel as UICarousel} from 'antd-mobile';

import {TouchBox} from '../public';

import icon from '../../scss/iconfont.css';
import style from './Gallery.scss';
import classNames from 'classnames';

class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            imageHeight: '0',
            displayNavLink: false
        }
    }

    render() {
        let images = this.props.goodBanner.map((item) => (
            <TouchBox key={item.bannerSrc}
                      activeClass={style.active}
                      tab={() => {}}>
                <img src={item.bannerSrc}
                     style={{height: this.state.imageHeight}}
                     alt="加载失败"
                     onLoad={() => this.setState({imageHeight: `${findDOMNode(this.refs.wrapper).offsetWidth}px`})}/>
            </TouchBox>
        ));

        let navLink = this.state.displayNavLink && (
            <div className={style.navLink}>
                <i></i>
                {
                    this.props.navItem.map(item => (
                        <TouchBox activeClass={style.active}
                                  key={item.id}
                                  tab={() => this.props.clickNav(item)}>
                            <i className={icon[item.icon]}></i>
                            <p>{item.name}</p>
                        </TouchBox>
                    ))
                }
            </div>
        );

        return (
            <div className={style.Gallery}
                 ref={'wrapper'}>
                <div>
                    <UICarousel>
                        {images}
                    </UICarousel>
                </div>
                <TouchBox tagName={'span'}
                          activeClass={style.active}
                          tab={() => this.props.clickBack()}
                          className={classNames(icon["icon-jiantou-zuo"], style.back)}>
                </TouchBox>
                <TouchBox tagName={'p'}
                          activeClass={style.active}
                          tab={() => this.props.clickDetail()}
                          className={style.tuwen}>
                    图文详情
                </TouchBox>
                <TouchBox className={classNames(style.nav, icon["icon-shengluehao"])}
                          tagName={'i'}
                          tab={() => this.setState({displayNavLink: !this.state.displayNavLink})}
                          activeClass={style.active}>
                </TouchBox>
                {navLink}
            </div>
        );
    }
}

Gallery.propTypes = {
    goodBanner: PropTypes.arrayOf(PropTypes.shape({
        bannerId: PropTypes.string,
        bannerSrc: PropTypes.string
    })),
    navItem: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        name: PropTypes.string
    })),
    clickNav: PropTypes.func,
    clickBack: PropTypes.func,
    clickDetail: PropTypes.func
};

Gallery.defaultProps = {
    goodBanner: [],
    navItem: [],
    clickNav: () => {},
    clickBack: () => {},
    clickDetail: () => {},
};

export default Gallery;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Carousel.scss';

import {Carousel as UICarousel} from 'antd-mobile';
import {TouchBox} from '../public';

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            carouselClass: style.hiddenCargousel,
        };
    }

    render() {
        let images = this.props.data.map((item, index) => (
            <TouchBox key={index}
                      className={style.member}
                      activeClass={style.active}
                      tab={() => this.props.clickBanner(item)}>
                <img src={item.bannerSrc}
                     onLoad={() => this.setState({carouselClass: style.Carousel})}
                     alt="加载失败"
                />
            </TouchBox>

        ));

        return (
            <div className={this.state.carouselClass}>
                <UICarousel autoplay infinite>
                    {images}
                </UICarousel>
            </div>
        );
    }
}

Carousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        bannerId: PropTypes.string,
        bannerSrc: PropTypes.string
    })),
    clickBanner: PropTypes.func
};

Carousel.defaultProps = {
    data: [],
    clickBanner: (() => {})
};

export default Carousel;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox, PoperContainer} from '../public'
import icon from '../../scss/iconfont.css';
import style from './Service.scss';

class Service extends Component {
    render() {
        let services = this.props.services.reduce((target, item) => {
            target.push((<span key={item.id}>{item.name}</span>));
            target.push((<i key={item.id + 'interval'}>|</i>));
            return target;
        }, []);
        services.pop();

        let content = this.props.services.map(item => (
            <TouchBox className={style.poperContent}
                      activeClass={style.active}
                      key={item.id}>
                <span>•</span>
                <div>
                    <h2>{item.name}</h2>
                    <h3>{item.content}</h3>
                </div>
                <i className={icon["icon-jiantou-you"]}></i>
            </TouchBox>
        ));

        return (
            <div className={style.Service}>
                <TouchBox className={style.item}
                          activeClass={style.active}
                          tab={() => this.refs.poper.showPoper()}>
                    <p>服务</p>
                    <div className={style.itemWrapper}>
                        {services}
                    </div>
                    <i className={icon["icon-jiantou-you"]}></i>
                </TouchBox>
                <PoperContainer ref={'poper'} title={'服务说明'}>
                    {content}
                </PoperContainer>
            </div>
        );
    }
}

Service.propTypes = {
    services: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        content: PropTypes.string
    }))
};

Service.defaultProps = {
    services: []
};

export default Service;

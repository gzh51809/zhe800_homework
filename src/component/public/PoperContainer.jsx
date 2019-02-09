import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'
import style from './PoperContainer.scss';
import base from '../../scss/base.scss';

class PoperContainer extends Component {
    constructor() {
        super();
        this.state = {
            theClass: base.disappear,
            wrapperTransform: 'translateY(100%)'
        };

        this.showPoper = this.showPoper.bind(this);
        this.hidePoper = this.hidePoper.bind(this);
    }

    showPoper() {
        this.setState({
            theClass: style.PoperContainer
        }, () => setTimeout(() => this.setState({
            wrapperTransform: 'translateY(0%)'
        }), 0));
    }

    hidePoper() {
        setTimeout(() => this.setState({
            wrapperTransform: 'translateY(100%)'
        }, () => setTimeout(() => this.setState({
                theClass: base.disappear
        }), 200)), 0);
    }

    render() {
        return (
            <div className={this.state.theClass}>
                <div className={style.wrapper}
                     style={{transform: this.state.wrapperTransform}}>
                    <p className={style.top}>{this.props.title}</p>
                    <div className={style.center}>
                        {this.props.children}
                    </div>
                    <TouchBox activeClass={style.active}
                              className={style.bottom}
                              tab={() => this.hidePoper()}
                              tagName={'p'}>
                        关闭
                    </TouchBox>
                </div>
            </div>
        );
    }
}

PoperContainer.propTypes = {
    title: PropTypes.string,
};

PoperContainer.defaultProps = {
    title: '温馨提示'
};

export default PoperContainer;

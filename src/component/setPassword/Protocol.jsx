import React, {
    Component
} from 'react';
import {TouchBox} from '../public';
import PropTypes from 'prop-types';

import style from './Protocol.scss';
import icon from '../../scss/iconfont.css';
import classNames from 'classnames';

class Protocol extends Component {
    render() {
        return (
            <div className={style.Protocol}>
                <TouchBox tagName={'h3'}
                          tab={() => this.props.checkAction()}>
                    <i className={this.props.check ? classNames(icon["icon-dagou"], style.checked) : classNames(icon["icon-dagou"], style.unchecked)}></i>
                </TouchBox>
                <p>同意</p>
                <TouchBox tagName={'a'}
                          tab={() => {}}
                          activeClass={style.active}>
                    折800用户服务协议
                </TouchBox>
            </div>
        )
    }
}

Protocol.propTypes = {
    check: PropTypes.bool,
    checkAction: PropTypes.func,
    protocolSrc: PropTypes.string
};

Protocol.defaultProps = {
    check: false,
    checkAction: () => {},
    protocolSrc: ''
};

export default Protocol


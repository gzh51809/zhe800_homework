import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './BottomLink.scss';

import {
    TouchBox
} from '../public';

class BottomLink extends Component {

    render() {
        switch (this.props.type) {
            case 'mobile':
            default:
                return (
                    <div className={style.BottomLinkMobile}>
                        <p>收不到短信？使用</p>
                        <TouchBox tagName={'a'}
                                  tab={() => this.props.clickRight()}
                                  activeClass={style.active}>
                            语音验证码
                        </TouchBox>
                    </div>
                );
            case 'account':
                return (
                    <div className={style.BottomLinkAccount}>
                        <TouchBox tagName={'a'}
                                  tab={() => this.props.clickRight()}
                                  activeClass={style.active}>
                            忘记密码
                        </TouchBox>
                    </div>
                )
        }
    }
}

BottomLink.propTypes = {
    type: PropTypes.oneOf(['mobile', 'account']),
    clickRight: PropTypes.func,
    clickLeft: PropTypes.func,
};

BottomLink.defaultProps = {
    type: 'mobile',
    clickRight: () => {},
    clickLeft: () => {},
};

export default BottomLink;

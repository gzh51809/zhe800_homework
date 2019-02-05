import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Header.scss';

import {
    TouchBox,
    Header as UIHeader
} from '../public';

class Header extends Component {
    render() {
        return (
            <div className={style.Header}>
                <UIHeader className={style.UIHeader}
                          title={'个人中心'}
                />
                <div className={style.buttonContainer}>
                    <div className={style.loginReg}>
                        <TouchBox tagName={'p'}
                                  className={style.button}
                                  activeClass={style.active}
                                  tab={this.props.clickLogin}>
                            登录
                        </TouchBox>
                        <p>|</p>
                        <TouchBox tagName={'p'}
                                  className={style.button}
                                  activeClass={style.active}
                                  tab={this.props.clickRegister}>
                            注册
                        </TouchBox>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.shape({

    }),
    clickLogin: PropTypes.func,
    clickRegister: PropTypes.func
};

Header.defaultProps = {
    user: {},
    clickLogin: (() => {}),
    clickRegister: (() => {})
};

export default Header;

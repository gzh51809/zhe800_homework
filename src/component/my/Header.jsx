import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Header.scss';
import icon from '../../scss/iconfont.css';

import {
    TouchBox,
    Header as UIHeader
} from '../public';

class Header extends Component {
    constructor() {
        super();
        this.renderLoginRegister = this.renderLoginRegister.bind(this);
        this.renderUser = this.renderUser.bind(this);
    }

    renderLoginRegister() {
        return (
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
        );
    }

    renderUser() {
        return (
            <TouchBox className={style.userInfo}
                      activeClass={style.active}>
                <div className={style.left}>
                    <h2>{(() => {
                        let mobileArray = [...this.props.user.mobile];
                        mobileArray.splice(3, 4, '****');
                        return mobileArray.join('');
                    })()}</h2>
                    <p>账户信息、收货地址设置</p>
                </div>
                <i className={icon["icon-jiantou-you"]}></i>
            </TouchBox>
        )
    }

    render() {
        return (
            <div className={style.Header}>
                <UIHeader className={style.UIHeader}
                          rightConfig={Boolean(this.props.user.mobile) ? [{title: '退出'}] : []}
                          title={'个人中心'}
                          clickHeaderButton={() => this.props.clickLogout()}
                />
                {Boolean(this.props.user.mobile) ? this.renderUser() : this.renderLoginRegister()}
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.shape({
        mobile: PropTypes.string
    }),
    clickLogin: PropTypes.func,
    clickLogout: PropTypes.func,
    clickRegister: PropTypes.func
};

Header.defaultProps = {
    user: {},
    clickLogin: (() => {
    }),
    clickLogout: (() => {
    }),
    clickRegister: (() => {
    })
};

export default Header;

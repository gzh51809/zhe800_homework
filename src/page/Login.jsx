import React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import cipher from '../js/oneWayCipher';

import {
    Header,
    ScrollContainer,
    InputBox,
    SubmitButton,
} from '../component/public';

import {ToastEle} from '../component/global';

import {Tab, BottomLink} from '../component/login';

import {
    requestAuth,
    requestLogin
} from '../api';

import userTop from '../image/userTop.png';

import style from '../component/login/Login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            selectTab: {id: 'mobile', name: '手机快捷登录'},
            tab: [
                {id: 'mobile', name: '手机快捷登录'},
                {id: 'account', name: '账号登录'}
            ],
            formMobile: {
                icon: 'icon-yonghu',
                placeholder: '手机号',
                inputType: 'tel',
                value: '',
                regExp: /^1\d{10}$/,
                toast: '手机号必须是11位数字',
            },
            authCode: {
                icon: 'icon-yaoshi',
                placeholder: '动态验证码',
                inputType: 'tel',
                value: '',
                regExp: /^\d{4}$/,
                toast: '验证码必须是4位数字',
                rightButton: '获取验证码',
                rightButtonEnable: false,
                countEndDate: 0
            },
            user: {
                icon: 'icon-yonghu',
                placeholder: '手机/邮箱/用户名',
                inputType: 'text',
                value: '',
                regExp: /^[\d\@a-zA-Z\-\_\.]{11,}$/,
                toast: '手机/邮箱/用户名必须是11个字符以上',
            },
            password: {
                icon: 'icon-suo',
                placeholder: '登录密码',
                inputType: 'password',
                value: '',
                regExp: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\?\(\)]).*$/,
                toast: '密码必须含有一个大写、一个小写、一个特殊字符，一个数字长度为6到16位',
                rightIcon: 'icon-biyanjing',
            },
            enableSubmit: false
        };

        this.clickHeaderAction = this.clickHeaderAction.bind(this);
        this.selectTab = this.selectTab.bind(this);
    }

    //-----------交互逻辑-----------
    clickHeaderAction(item) {
        switch (item.id) {
            case 'back':
                this.props.history.goBack();
                break;
            case 'help':
                this.props.history.push('/help');
                break;
        }
    }

    selectTab(item) {
        let {formMobile, authCode, enableSubmit, user, password} = this.state;
        switch (item.id) {
            case 'mobile':
                enableSubmit = formMobile.regExp.test(formMobile.value) && authCode.regExp.test(authCode.value);
                break;
            case 'account':
                enableSubmit = user.regExp.test(user.value) && password.regExp.test(password.value);
                break;
        }
        this.setState({selectTab: item, enableSubmit}, () => {
            if (this.state.selectTab.id === 'mobile') {
                authCode.rightButtonEnable = formMobile.regExp.test(formMobile.value);
                this.setState({authCode});
                this.refs.auth.counterStart();
            }
        });
    }

    renderForm() {
        let mobileItem = (
            <InputBox key={'mobile'}
                      ref={'mobile'}
                      item={this.state.formMobile}
                      input={value => {
                          let {formMobile, authCode, enableSubmit} = this.state;
                          formMobile.value = value;

                          authCode.rightButtonEnable = formMobile.regExp.test(formMobile.value);
                          enableSubmit = formMobile.regExp.test(formMobile.value) && authCode.regExp.test(authCode.value);
                          this.setState({formMobile, authCode, enableSubmit});
                      }}/>
        );

        let authCode = (
            <InputBox key={'auth'}
                      ref={'auth'}
                      item={this.state.authCode}
                      input={value => {
                          let {formMobile, authCode, enableSubmit} = this.state;
                          authCode.value = value;
                          enableSubmit = formMobile.regExp.test(formMobile.value) && authCode.regExp.test(authCode.value);
                          this.setState({authCode, enableSubmit});
                      }}
                      clickRightButton={() => requestAuth({mobile: this.state.formMobile.value})
                          .then(
                              data => {
                                  //开始倒计时
                                  ToastEle.showToast(`验证码是:${data.authCode}`);
                                  let {authCode} = this.state;
                                  authCode.rightButtonEnable = false;
                                  authCode.countEndDate = Date.now() + 120 * 1000;
                                  this.setState({authCode});
                                  this.refs.auth.counterStart();
                              })
                          .catch(error => ToastEle.showToast(error.message))
                      }
                      timerStop={() => {
                          let {formMobile, authCode} = this.state;
                          authCode.rightButtonEnable = formMobile.regExp.test(formMobile.value);
                          this.setState({authCode});
                      }}/>
        );

        let user = (
            <InputBox key={'user'}
                      ref={'user'}
                      item={this.state.user}
                      input={value => {
                          let {user, password, enableSubmit} = this.state;
                          user.value = value;
                          enableSubmit = user.regExp.test(user.value) && password.regExp.test(password.value);
                          this.setState({user, enableSubmit});
                      }}/>
        );

        let password = (
            <InputBox key={'password'}
                      ref={'password'}
                      item={this.state.password}
                      input={value => {
                          let {user, password, enableSubmit} = this.state;
                          password.value = value;
                          enableSubmit = user.regExp.test(user.value) && password.regExp.test(password.value);
                          this.setState({password, enableSubmit});
                      }}
                      clickRightIcon={() => {
                          let {password} = this.state;
                          switch (password.inputType) {
                              case 'text':
                                  password.inputType = 'password';
                                  password.rightIcon = 'icon-biyanjing';
                                  break;
                              case 'password':
                                  password.inputType = 'text';
                                  password.rightIcon = 'icon-zhangyanjing';
                                  break;
                          }
                          this.setState({password});
                      }}/>
        );

        let submit = (
            <SubmitButton key={'submit'}
                          title={'登录'}
                          enable={this.state.enableSubmit}
                          submit={() => {
                              let {formMobile, authCode, user, password} = this.state;
                              let query = {};
                              switch (this.state.selectTab.id) {
                                  case 'mobile':
                                      query = {type: 'mobile', mobile: formMobile.value, authCode: authCode.value};
                                      break;
                                  case 'account':
                                      query = {type: 'account', name: user.value, password: cipher(password.value)};
                                      break;
                              }

                              requestLogin(query)
                                  .then(data => {
                                      //为注册，进入手机注册流程
                                      if (data.register === '0') {
                                          this.props.history.push('/setPassword');
                                      } else {
                                          this.props.history.push('/');
                                      }
                                  })
                                  .catch(error => ToastEle.showToast(error.message));
                          }}/>
        );

        let bottomLink = (
            <BottomLink key={'bottomLink'}
                        type={this.state.selectTab.id}
                        clickLeft={() => this.props.history.push('/register')}/>
        );

        switch (this.state.selectTab.id) {
            case 'mobile':
                return [mobileItem, authCode, submit, bottomLink];
            case 'account':
                return [user, password, submit, bottomLink];
        }
    }

    //-----------渲染逻辑-----------
    render() {
        return (
            <ScrollContainer>
                <Header title={'登录'}
                        leftConfig={[{id: 'back', icon: 'icon-jiantou-zuo'}]}
                        rightConfig={[{id: 'help', title: '帮助'}]}
                        clickHeaderButton={this.clickHeaderAction}/>
                <img style={{display: 'block', width: '100%'}} src={userTop} alt="加载失败"/>
                <div className={style.formContainer}>
                    <Tab items={this.state.tab}
                         selectItem={this.state.selectTab}
                         clickTab={item => this.selectTab(item)}/>
                    {this.renderForm()}
                </div>
            </ScrollContainer>
        );
    }
}

Login = connect(() => ({}))(Login);

export default Login;

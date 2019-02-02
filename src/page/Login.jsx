import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer,
    InputBox,
    SubmitButton,
} from '../component/public';

import {
    ToastEle
} from '../component/global';

import {
    Tab,
} from '../component/login';

import * as action from '../action/Login';

import userTop from '../image/userTop.png';

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
                toast: '密码必须含有一个大写、一个小写、一个特殊字符，长度为6到16位',
                rightIcon: 'icon-biyanjing',
            },
            enableSubmit: false
        };

        this.clickHeaderAction = this.clickHeaderAction.bind(this);
        this.selectTab = this.selectTab.bind(this);
    }

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
                this.refs.auth.counterStart()
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
                      clickRightButton={() => {
                          let {authCode} = this.state;
                          authCode.rightButtonEnable = false;
                          authCode.countEndDate = Date.now() + 120 * 1000;
                          this.setState({authCode});
                          this.refs.auth.counterStart();
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

        switch (this.state.selectTab.id) {
            case 'mobile':
                return [mobileItem, authCode];
            case 'account':
                return [user, password];
        }
    }

    render() {
        return (
            <ScrollContainer>
                <Header title={'登录'}
                        leftConfig={[{id: 'back', icon: 'icon-jiantou-zuo'}]}
                        rightConfig={[{id: 'help', title: '帮助'}]}
                        clickHeaderButton={this.clickHeaderAction}/>
                <img style={{display: 'block', width: '100%'}} src={userTop} alt="加载失败"/>
                <div style={{padding: '10px 60px'}}>
                    <Tab items={this.state.tab}
                         selectItem={this.state.selectTab}
                         clickTab={item => this.selectTab(item)}/>
                    {this.renderForm()}
                    <SubmitButton title={'登录'}
                                  enable={this.state.enableSubmit}
                                  submit={() => console.log('点击登录')}/>
                </div>
            </ScrollContainer>
        );
    }
}

export default Login;

import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer,
    InputBox,
    SubmitButton
} from '../component/public';
import {ToastEle} from "../component/global";

import {
    Protocol
} from '../component/setPassword';

import cipher from '../js/oneWayCipher';

import {requestRegister} from "../api";
import style from '../component/setPassword/setPassword.scss';

class SetPassword extends Component {
    constructor() {
        super();
        this.state = {
            password: {
                icon: 'icon-suo',
                placeholder: '登录密码',
                inputType: 'password',
                value: '',
                regExp: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\?\(\)]).*$/,
                toast: '密码必须含有一个大写、一个小写、一个特殊字符，一个数字长度为6到16位',
                rightIcon: 'icon-biyanjing',
            },
            check: false,
            enableSubmit: false
        };

        this.renderForm = this.renderForm.bind(this);
    }

    renderForm() {
        let password = (
            <InputBox key={'password'}
                      ref={'password'}
                      item={this.state.password}
                      input={value => {
                          let {password, enableSubmit, check} = this.state;
                          password.value = value;
                          enableSubmit = password.regExp.test(password.value) && check;
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
                          title={'注册'}
                          enable={this.state.enableSubmit}
                          submit={() =>
                              requestRegister({
                                  type: 'mobile',
                                  password: cipher(this.state.password.value)
                              }).then(
                                  () => this.props.history.push('/')
                              ).catch(error => ToastEle.showToast(error.message))
                          }/>
        );

        let protocol = (
            <Protocol key={'protocol'}
                      check={this.state.check}
                      checkAction={() => {
                          let {password, enableSubmit, check} = this.state;
                          check = !check;
                          enableSubmit = password.regExp.test(password.value) && check;
                          this.setState({check: check, enableSubmit});
                      }}/>
        );

        return [password, submit, protocol];
    }

    render() {
        return (
            <ScrollContainer>
                <Header title={'设置密码'}
                        leftConfig={[{icon: 'icon-jiantou-zuo'}]}
                        clickHeaderButton={() => this.props.history.goBack()}/>
                <div className={style.formContainer}>
                    <p className={style.tips}>为了保障账号安全，请设置密码</p>
                    {this.renderForm()}
                </div>
            </ScrollContainer>
        );
    }
}

export default SetPassword;

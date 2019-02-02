import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer
} from '../component/public';

import {
    Form
} from '../component/setPassword'

class SetPassword extends Component {
    render() {
        return (
            <ScrollContainer>
                <Header title={'设置密码'}
                        leftConfig={[{icon: 'icon-jiantou-zuo'}]}
                        clickHeaderButton={() => this.props.history.goBack()}/>
                <Form/>
            </ScrollContainer>
        );
    }
}

export default SetPassword;

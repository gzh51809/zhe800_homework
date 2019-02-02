import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer,
    InputBox,
    SubmitButton
} from '../component/public';

class Register extends Component {
    render() {
        return (
            <ScrollContainer>
                <Header title={'注册'}
                        leftConfig={[{icon: 'icon-jiantou-zuo'}]}
                        clickHeaderButton={() => this.props.history.goBack()}/>
            </ScrollContainer>
        );
    }
}

export default Register;

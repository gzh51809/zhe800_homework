import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer
} from '../component/public';

class Register extends Component {
    render() {
        return (
            <ScrollContainer>
                <Header title={'分类搜索'}
                        leftConfig={[{icon: 'icon-jiantou-zuo'}]}
                        clickHeaderButton={() => this.props.history.goBack()}/>
            </ScrollContainer>
        );
    }
}

export default Register;


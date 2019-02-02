import React, {
    Component
} from 'react';

import {
    Header,
    ScrollContainer
} from '../component/public';

class Help extends Component {
    render() {
        return (
            <ScrollContainer>
                <Header title={'帮助中心'}
                        leftConfig={[{id: 'back', icon: 'icon-jiantou-zuo'}]}
                        clickHeaderButton={() => this.props.history.goBack()}/>
            </ScrollContainer>
        );
    }
}

export default Help;

import React, {
    Component
} from 'react';
import {ReactReduxContext} from "react-redux";

import * as action from '../action/My';

import {TabBarContainer} from "../component/public";

class My extends Component {
    render() {
        return (
            <TabBarContainer tabId={'my'}
                             selectTab={(item) => this.props.history.push(item.id)}>

            </TabBarContainer>
        );
    }
}

My.contextType = ReactReduxContext;

export default My;

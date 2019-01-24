import React, {
    Component
} from 'react';
import {ReactReduxContext} from "react-redux";

import * as action from '../action/Discount';

import {TabBarContainer} from "../component/public";

class Discount extends Component {
    render() {
        return (
            <TabBarContainer tabId={'discount'}
                             selectTab={(item) => this.props.history.push(item.id)}>

            </TabBarContainer>
        );
    }
}

Discount.contextType = ReactReduxContext;

export default Discount;

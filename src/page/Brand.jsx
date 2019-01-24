import React, {
    Component
} from 'react';
import {ReactReduxContext} from "react-redux";

import * as action from '../action/Brand';

import {TabBarContainer} from "../component/public";

class Brand extends Component {
    render() {
        return (
            <TabBarContainer tabId={'brand'}
                             selectTab={(item) => this.props.history.push(item.id)}>

            </TabBarContainer>
        );
    }
}

Brand.contextType = ReactReduxContext;

export default Brand;

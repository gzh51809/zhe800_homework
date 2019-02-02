import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import * as action from '../action/Car';

import {TabBarContainer} from "../component/public";

class Car extends Component {
    render() {
        return (
            <TabBarContainer tabId={'car'}
                             tabs={this.props.tabs}
                             selectTab={(item) => this.props.history.push(item.id)}>

            </TabBarContainer>
        );
    }
}

Car = connect(state => state.car)(Car);

export default Car;

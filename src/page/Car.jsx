import React, {
    Component
} from 'react';
import {ReactReduxContext} from "react-redux";

import * as action from '../action/Car';

import {TabBarContainer} from "../component/public";

class Car extends Component {
    render() {
        return (
            <TabBarContainer tabId={'car'}
                             selectTab={(item) => this.props.history.push(item.id)}>

            </TabBarContainer>
        );
    }
}

Car.contextType = ReactReduxContext;

export default Car;

import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import * as action from '../action/My';

import {TabBarContainer} from "../component/public";
import {
    Header,
    Cell,
    CellIcon
} from '../component/my'

class My extends Component {
    render() {
        let cells = this.props.config.map(item => {
            switch (item.type) {
                case 'cell':
                    return (
                        <Cell key={item.id}
                              item={item}
                              clickCell={() => this.props.dispatch({type: action.clickItem, payload: item})}/>
                    );
                case 'cellIcon':
                    return (
                        <CellIcon key={item.id}
                                  item={item}
                                  clickIcon={icon => this.props.dispatch({type: action.clickIcon, payload: icon})}/>
                    );
            }
        });

        return (
            <TabBarContainer tabId={'my'}
                             tabs={this.props.tabs}
                             selectTab={(item) => this.props.history.push(item.id)}>
                <Header clickLogin={() => this.props.history.push('/login')}
                        clickRegister={() => this.props.history.push('/login')}/>
                {cells}
            </TabBarContainer>
        );
    }
}

My = connect(state => state.my)(My);

export default My;

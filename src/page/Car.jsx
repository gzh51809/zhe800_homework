import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import {
    NewComer,
    SelectAll,
    CellItem
} from '../component/car';

import * as action from '../action/Car';

import {
    TabBarContainer,
    Header,
    ScrollContainer
} from "../component/public";

class Car extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            headerButton: '编辑'
        }
    }

    render() {
        return (
            <TabBarContainer tabId={'car'}
                             tabs={this.props.tabs}
                             selectTab={(item) => this.props.history.push(item.id)}>
                <Header title={'购物车'}
                        rightConfig={[{title: this.state.headerButton}]}
                        clickHeaderButton={() => this.setState({
                            isEdit: !this.state.isEdit,
                            headerButton: !this.state.isEdit ? '完成' : '编辑'
                        })}/>
                <NewComer/>
                <div style={{flex: '1'}}>
                    <ScrollContainer needScrollToTop={true}>
                        <CellItem/>
                    </ScrollContainer>
                </div>
                <SelectAll/>
            </TabBarContainer>
        );
    }
}

Car = connect(state => state.car)(Car);

export default Car;

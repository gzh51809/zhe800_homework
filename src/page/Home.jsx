import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import {
    TopBar,
    TabBarContainer,
} from '../component/public';

import {
    SearchBar,
    TopTab,
    Carousel,
    IconArea
} from '../component/home';

import * as action from '../action/Home';

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(action.requestKind());
    }

    render() {
        return (
            <TabBarContainer tabId={'home'}
                             selectTab={item => this.props.history.push(item.id)}>
                <TopBar download={() => this.props.dispatch({type: action.downloadApp})}/>
                <SearchBar clickBar={() => this.props.history.push('/search')}/>
                <TopTab leftTab={this.props.selectTab}
                        tabs={this.props.topTabWrapperData}
                        clickTab={item => this.props.dispatch({type: action.clickTab, payload: item})}
                />
                <Carousel data={this.props.currentBanner}
                          clickBanner={item => this.props.dispatch({
                              type: action.clickBanner,
                              payload: item
                          })}/>
                <IconArea data={this.props.currentIcon}
                          clickIcon={item => this.props.dispatch({
                              type: action.clickIcon,
                              payload: item
                          })}/>
            </TabBarContainer>
        );
    }
}

Home = connect(state => state.home)(Home);

export default Home;

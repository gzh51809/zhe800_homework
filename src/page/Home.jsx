import React, {
    Component
} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from "react-redux";
import base from '../scss/base.scss';

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

import {ListContainer, GoodItem1} from '../component/good';

import * as action from '../action/Home';
import AdArea from "../component/home/AdArea";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isSticky: false
        };

        this.scrollSticky = this.scrollSticky.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(action.requestKind());
        this.props.dispatch(action.requestList({
            kindIds: [
                'tuijian', 'nvzhuang', 'xiebao',
                'jujia', 'muyinertong', 'meishi',
                'nanzhuang', 'neiyi', 'peishi',
                'shumajiadian', 'meizhuang', 'jiafang',
                'yundong'
            ]
        }));
    }

    scrollSticky(event) {
        let scrollTop = Number(event.currentTarget.scrollTop);
        let listOffsetTop = Number(findDOMNode(this.refs.list).offsetTop);
        if (scrollTop > listOffsetTop && this.state.isSticky === false) {
            this.setState({isSticky: true});
        } else if (scrollTop < listOffsetTop && this.state.isSticky === true) {
            this.setState({isSticky: false});
        }

    }

    render() {
        let listElements = this.props.currentList.map((json, index) => (
            <GoodItem1 key={index} good={json}
                       clickItem={item => this.props.dispatch({
                           type: action.clickGood,
                           payload: item
                       })}/>
        ));

        return (
            <TabBarContainer tabId={'home'}
                             selectTab={item => this.props.history.push(item.id)}
                             scroll={this.scrollSticky}>
                <TopBar download={() => this.props.dispatch({type: action.downloadApp})}/>
                <SearchBar clickBar={() => this.props.history.push('/search')}/>
                <div className={this.state.isSticky ? base.stickTop : null}>
                    <TopTab leftTab={this.props.selectTab}
                            tabs={this.props.topTabWrapperData}
                            clickTab={item => this.props.dispatch({type: action.clickTab, payload: item})}
                    />
                </div>
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
                <AdArea adObject={this.props.currentAd}
                        deadline={Date.parse(new Date()) + 1000 * 60 * 60 * 2}
                        deadLinePrice={'95.8'}
                        clickAdObject={item => this.props.dispatch({
                            type: action.clickAd,
                            payload: item
                        })}/>
                <ListContainer ref={'list'}>
                    {listElements}
                </ListContainer>
            </TabBarContainer>
        );
    }
}

Home = connect(state => state.home)(Home);

export default Home;

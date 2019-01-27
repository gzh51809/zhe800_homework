import React, {
    Component
} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import {connect} from "react-redux";
import base from '../scss/base.scss';
import style from './Home.scss';

import {
    TopBar,
    TabBarContainer,
    ScrollToTop
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
            isSticky: false,
            needScrollToTop: false
        };

        this.scrollSticky = this.scrollSticky.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.timer = null;
    }

    componentWillMount() {
        this.props.dispatch(action.requestData({
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
            this.setState({
                isSticky: true,
                needScrollToTop: true
            });
        } else if (scrollTop < listOffsetTop && this.state.isSticky === true) {
            this.setState({
                isSticky: false,
                needScrollToTop: false
            });
        }

    }

    scrollToTop() {
        let scrollContainer = findDOMNode(this.refs.tabbar.refs.scrollContainer);

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            scrollContainer.scrollTop = Math.max(scrollContainer.scrollTop - 50, 0);
            if (scrollContainer.scrollTop === 0) {
                clearInterval(this.timer);
            }
        }, 10);
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
                             ref={'tabbar'}
                             selectTab={item => this.props.history.push(item.id)}
                             scroll={this.scrollSticky}>
                <div className={this.state.needScrollToTop ? classNames(style.scrollToTop, base.visible) : classNames(style.scrollToTop, base.hidden)}>
                    <ScrollToTop clickAction={this.scrollToTop}/>
                </div>
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

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

Home = connect(state => state.home)(Home);

export default Home;

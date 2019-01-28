import React, {
    Component
} from 'react';
import {connect} from "react-redux";
import {findDOMNode} from "react-dom";

import * as action from '../action/Discount';

import {
    TabBarContainer,
    Header,
    Carousel,
    TopTab,
    IconArea, ScrollToTop
} from "../component/public";
import {
    AdArea,
    GoodBestCollection
} from '../component/discount';
import {
    GoodItem3,
    ListContainer
} from '../component/good';
import base from "../scss/base.scss";
import classNames from "classnames";
import style from "./Home.scss";


class Discount extends Component {
    constructor() {
        super();
        this.state = {
            isJinxuan: true,
            isSticky: false
        };

        this.scrollSticky = this.scrollSticky.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(action.requestData({
            kindIds: [
                'jingxuan', 'fuzhaung',
                'jiajubaihuo', 'xiebaopeishi',
                'muyingertong', 'meishi'
            ]
        }));
    }

    scrollSticky(event) {
        let scrollTop = Number(event.currentTarget.scrollTop);
        let headerOffsetHeight = Number(findDOMNode(this.refs.header).offsetHeight);
        if (scrollTop > headerOffsetHeight && this.state.isSticky === false) {
            this.setState({
                isSticky: true,
            });
        } else if (scrollTop < headerOffsetHeight && this.state.isSticky === true) {
            this.setState({
                isSticky: false,
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
        let goods = this.props.currentList.map(item => (
            <GoodItem3 key={item._id}
                       good={item}/>
        ));

        return (
            <TabBarContainer tabId={'discount'}
                             scroll={this.scrollSticky}
                             ref={'tabbar'}
                             selectTab={(item) => this.props.history.push(item.id)}>
                <Header ref={'header'} title={'淘特价'}/>
                <div className={this.state.isSticky ? base.stickTop : null}>
                    <TopTab leftTab={this.props.selectTab}
                            tabs={this.props.topTapData}
                            clickTab={item => this.props.dispatch({type: action.clickTab, payload: item})}
                    />
                </div>
                <Carousel data={this.props.currentBanner}
                          clickBanner={item => this.props.dispatch({
                              type: action.clickBanner,
                              payload: item
                          })}
                />
                <div className={this.props.selectTab.kindId === 'jingxuan' ? base.appear : base.disappear}>
                    <IconArea data={this.props.iconData}
                              iconRow={this.props.iconData.length}
                              clickIcon={item => this.props.dispatch({
                                  type: action.clickIcon,
                                  payload: item
                              })}
                    />
                    <AdArea ads={this.props.adData}
                            clickItem={item => this.props.dispatch({
                                type: action.clickAd,
                                payload: item
                            })}
                    />
                    <GoodBestCollection goods={this.props.collectionData}
                                        clickItem={item => this.props.dispatch({
                                            type: action.clickDetail,
                                            payload: item
                                        })}
                    />
                    <ListContainer>
                        {goods}
                    </ListContainer>
                </div>
            </TabBarContainer>
        );
    }
}

Discount = connect(state => state.discount)(Discount);

export default Discount;

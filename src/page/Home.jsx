import React, {
    Component
} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from "react-redux";
import base from '../scss/base.scss';

import {
    TopBar,
    TabBarContainer,
    Carousel,
    TopTab,
    IconArea
} from '../component/public';

import {
    SearchBar,
    AdArea
} from '../component/home';

import {ListContainer, GoodItem1} from '../component/good';

import * as action from '../action/Home';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isSticky: false,
            needScrollToTop: false
        };

        this.scrollSticky = this.scrollSticky.bind(this);
        this.clickAdArea = this.clickAdArea.bind(this);
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

        this.props.dispatch({type: action.scrollHome, payload:{scrollTop: event.currentTarget.scrollTop}});
    }

    clickAdArea(item) {
        switch (item.type) {
            case 'rightTop':
                this.props.history.push({pathname: 'brand'});
                break;
        }
    }

    render() {
        let listElements = this.props.currentList.map(json => (
            <GoodItem1 key={json._id}
                       good={json}
                       clickItem={item => {
                           this.props.history.push({pathname: 'brandDetail', search: `brandId=${item.brandId}`});
                       }}/>
        ));

        return (
            <TabBarContainer tabId={'home'}
                             tabs={this.props.tabs}
                             ref={'tabbar'}
                             selectTab={item => this.props.history.push(item.id)}
                             scroll={this.scrollSticky}
                             scrollTop={this.props.scrollTop}
                             needScrollToTop={true}>
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
                          iconRow={this.props.currentIcon.length}
                          clickIcon={item => this.props.dispatch({
                              type: action.clickIcon,
                              payload: item
                          })}/>
                <AdArea adObject={this.props.currentAd}
                        deadline={Date.parse(new Date()) + 1000 * 60 * 60 * 2}
                        deadLinePrice={'95.8'}
                        clickAdObject={item => this.clickAdArea(item)}/>
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

import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import * as action from '../action/Brand';

import {
    TabBarContainer,
    Header,
    TopTab,
    ScrollContainer
} from "../component/public";

import {Icon, BrandCard} from '../component/brand';

import base from "../scss/base.scss";
import {findDOMNode} from "react-dom";

class Brand extends Component {
    constructor() {
        super();

        this.state = {
            isSticky: false
        };

        this.scrollSticky = this.scrollSticky.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(action.requestKind({
            kindIds: ['zhengzaireqiang']
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

        this.props.dispatch({type: action.scrollBrand, payload:{scrollTop: event.currentTarget.scrollTop}});
    }

    render() {
        let icons = this.props.currentIcon.map(item => (
            <Icon icon={item}
                  key={item.iconId}
                  clickItem={() => this.props.dispatch({
                      type: action.clickIcon,
                      payload: item
                  })}/>
        ));

        let currentList = this.props.currentList.map(item => (
            <BrandCard brand={item}
                       key={item.brandId}
                       clickItem={() => this.props.history.push({
                           pathname: 'brandDetail',
                           search: `brandId=${item.brandId}`
                       })}/>
        ));

        return (
            <TabBarContainer tabId={'brand'}
                             tabs={this.props.tabs}
                             scroll={this.scrollSticky}
                             scrollTop={this.props.scrollTop}
                             selectTab={(item) => this.props.history.push(item.id)}
                             needScrollToTop={true}>
                <Header ref={'header'} title={'品牌团'}/>
                <div className={this.state.isSticky ? base.stickTop : null}
                     style={{background: '#FFF'}}>
                    <TopTab leftTab={this.props.selectTab}
                            tabs={this.props.topTapData}
                            clickTab={item => this.props.dispatch({type: action.clickTab, payload: item})}
                    />
                    <ScrollContainer direction={'horizontal'}>
                        {icons}
                    </ScrollContainer>
                </div>
                {currentList}
            </TabBarContainer>
        );
    }
}

Brand = connect(state => state.brand)(Brand);

export default Brand;

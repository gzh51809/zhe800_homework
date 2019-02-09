import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import * as action from '../action/BrandDetail';

import {
    ScrollContainer,
    TopTab
} from "../component/public";

import {
    ListContainer,
    GoodItem4
} from '../component/good';

import {
    Header,
    BrandSubject,
    NoData,
    Footer
} from '../component/brandDetail';

class BrandDetail extends Component {
    componentWillMount() {
        this.props.dispatch(action.requestData(
            {brandId: location.hash.match(/brandId=(\d*)/)[1]}
        ));
    }

    render() {
        let tab = (
            <TopTab leftTab={this.props.selectTab}
                    tabs={this.props.tabs}
                    clickTab={item => this.props.dispatch({
                        type: action.clickTab,
                        payload: item
                    })}/>
        );

        let goods = this.props.currentList.map(item => (
            <GoodItem4 key={item.goodId}
                       good={item}
                       clickItem={() => this.props.history.push({
                           pathname: 'goodDetail',
                           search: `goodId=${item.goodId}`
                       })}/>
        ));

        return (
            <ScrollContainer needScrollToTop={true}
                             scroll={event => this.props.dispatch(
                                 {
                                     type: action.scrollBrandDetail,
                                     payload: {scrollTop: event.currentTarget.scrollTop}
                                 })}
                             scrollTop={this.props.scrollTop}>
                <Header endTime={this.props.brandDetail.endTime}
                        clickBack={() => {
                            this.props.dispatch({type: action.brandDetailReset, payload: {}});
                            this.props.history.goBack();
                        }}/>
                <BrandSubject brand={this.props.brandDetail} isCollect={false}/>
                {goods.length === 0 ? null : tab}
                {
                    goods.length === 0 ? <NoData/> : (
                        <ListContainer ref={'list'}>
                            {goods}
                        </ListContainer>
                    )
                }
                <Footer/>
            </ScrollContainer>
        );
    }
}

BrandDetail = connect(state => state.brandDetail)(BrandDetail);

export default BrandDetail;

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
    BrandSubject
} from '../component/brandDetail';

class BrandDetail extends Component {
    componentWillMount() {
        this.props.dispatch(action.requestData(
            {brandId: location.hash.match(/brandId=(\d*)/)[1]}
        ));
    }

    render() {
        return (
            <ScrollContainer needScrollToTop={true}>
                <Header endTime={this.props.brandDetail.endTime}
                        clickBack={() => this.props.history.goBack()}/>
                <BrandSubject brand={this.props.brandDetail} isCollect={false}/>
                <TopTab leftTab={{
                    kindId: 'jinribiqiang',
                    kindName: '今日必抢'
                }} tabs={[
                    {kindId: 'jinribiqiang', kindName: '今日必抢'},
                    {kindId: 'nvxue', kindName: '红蜻蜓女靴'},
                    {kindId: 'nvxie', kindName: '红蜻蜓女鞋'},
                    {kindId: 'nanxie', kindName: '红蜻蜓男鞋'},
                    {kindId: 'baokuan', kindName: '超值爆款'},
                ]}/>
                <ListContainer ref={'list'}>
                    <GoodItem4 good={{
                        fengmianSrc: 'https://z3.tuanimg.com/imagev2/trade/800x800.7b3946bdacdc071208f023bf68df6eec.380x380.jpg.webp',
                        isShockingPrice: '惊爆价',
                        originPrice: '558',
                        name: '尼班诗2018秋新款女装chic打底套头上衣白色喇叭袖毛衣针织衫女霖',
                        price: '119',
                        saleAmount: '182'
                    }}/>
                </ListContainer>
            </ScrollContainer>
        );
    }
}

BrandDetail = connect(state => state.brandDetail)(BrandDetail);

export default BrandDetail;

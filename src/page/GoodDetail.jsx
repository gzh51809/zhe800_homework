import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import {
    ScrollContainer
} from '../component/public';

import {
    ToastEle
} from '../component/global'

import {
    Gallery,
    Subject,
    Service,
    GoodParam,
    GoodAttribute,
    GoodDetailContent,
    BottomNavBar
} from '../component/goodDetail';

import {
    requestAddToCar
} from '../api';

import * as action from '../action/GoodDetail';
import style from '../component/goodDetail/GoodDetail.scss';

class GoodDetail extends Component {
    constructor() {
        super();
        this.addToCar = this.addToCar.bind(this);
        this.clickNavItem = this.clickNavItem.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(action.requestData(
            {goodId: location.hash.match(/goodId=(.*)/)[1]}
        ));
    }

    addToCar() {
        if (this.props.selectValidate) {
            let attribute = this.props.goodAttribute
                .filter(json => json.select)
                .sort((first, second) => first._id - second._id)
                .map(item => item._id)
                .join('|');

            let query = {
                goodId: this.props.goodAttribute[0].goodId,
                buyAmount: this.props.buyAmount,
                attribute: attribute
            };
            requestAddToCar(query).then(
                data => {
                    if (data.code === '2') {
                        this.props.dispatch({type: action.goodDetailReset, payload: {}});
                        setTimeout(() => this.props.history.push('/login'), 500);
                    } else {
                        ToastEle.showToast('加入购物车成功');
                    }
                }
            ).catch(error => ToastEle.showToast(error.message));
        } else {
            ToastEle.showToast(this.props.validateString);
        }
    }

    clickNavItem(item) {
        switch (item.id) {
            case 'home': {
                this.props.dispatch({type: action.goodDetailReset, payload: {}});
                this.props.history.push('/home');
            }
                break;
        }
    }

    render() {
        let {goodDetail} = this.props;
        let {goodAttribute} = this.props;

        return (
            <div className={style.Container}>
                <ScrollContainer className={style.scrollWrapper}
                                 needScrollToTop={true}>
                    <Gallery goodBanner={this.props.banners}
                             navItem={this.props.navItems}
                             clickNav={this.clickNavItem}
                             clickBack={() => {
                                 this.props.dispatch({type: action.goodDetailReset, payload: {}});
                                 this.props.history.goBack();
                             }}/>
                    <Subject good={goodDetail}/>
                    <Service services={this.props.services}/>
                    <GoodAttribute attributes={goodAttribute}
                                   good={goodDetail}
                                   buyAmount={this.props.buyAmount}
                                   addAmount={() => this.props.dispatch({type: action.addAmount, payload: {}})}
                                   minusAmount={() => this.props.dispatch({type: action.minusAmount, payload: {}})}
                                   selectAttribute={item => this.props.dispatch({
                                       type: action.selectAttribute,
                                       payload: item
                                   })}
                                   addToCar={this.addToCar}/>
                    <GoodParam params={goodDetail.params}/>
                    <GoodDetailContent shopkeeperNote={goodDetail.shopkeeperNote}
                                       goodParams={goodDetail.params}
                                       authorization={goodDetail.authorization}
                                       detailImage={goodDetail.detailImage}/>
                </ScrollContainer>
                <BottomNavBar shopCar={() => {
                    this.props.dispatch({type: action.goodDetailReset, payload: {}});
                    this.props.history.push('/car');
                }} addToCar={this.addToCar}/>
            </div>
        );
    }
}

GoodDetail = connect(state => state.goodDetail)(GoodDetail);

export default GoodDetail;

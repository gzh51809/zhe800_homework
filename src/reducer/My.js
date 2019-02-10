import {
    clickIcon,
    clickItem,
    responseData,
} from '../action/My';

let defaultState = {
    user: {
        mobile: ''
    },
    tabs: [
        {id: 'home', icon: "icon-jinritemai", name: '今日特卖'},
        {id: 'discount', icon: "icon-taotejia", name: '淘特价'},
        {id: 'brand', icon: "icon-pinpaituan", name: '品牌团'},
        {id: 'car', icon: "icon-gouwuche", name: '购物车'},
        {id: 'my', icon: "icon-wode", name: '我的'},
    ],
    config: [
        {id: 'order', type: 'cell', left: '我的订单', right: '查看全部', needBoldBottom: false},
        {
            id: 'icon', type: 'cellIcon', needBoldBottom: true, icons: [
                {id: 'daifukuan', name: '待付款', icon: 'icon-daifukuan'},
                {id: 'daifahuo', name: '待发货', icon: 'icon-daifahuo'},
                {id: 'daishouhuo', name: '待收货', icon: 'icon-daishouhuo'},
                {id: 'daipingjia', name: '待评价', icon: 'icon-daipingjia'},
                {id: '退款', name: '退款/售后', icon: 'icon-tuikuan'}
            ]
        },
        {id: 'car', type: 'cell', left: '购物车', right: '', needBoldBottom: false},
        {id: 'coupon', type: 'cell', left: '优惠卷', right: '', needBoldBottom: true},
        {id: 'collection', type: 'cell', left: '收藏夹', right: '', needBoldBottom: false},
        {id: 'track', type: 'cell', left: '足迹', right: '', needBoldBottom: true},
        {id: 'helpCenter', type: 'cell', left: '帮助与客服', right: '', needBoldBottom: false},
        {id: 'download', type: 'cell', left: '下载折800APP', right: '', needBoldBottom: false}
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case responseData:
        {
            let cloneState = {...state};
            cloneState.user.mobile = action.payload.mobile;
            cloneState.user = Object.assign({}, cloneState.user);
            return cloneState;
        }
        case clickIcon:
            return {...state};
        case clickItem:
            return {...state};
        default:
            return {...state};
    }
};

let defaultState = {
    tabs: [
        {id: 'home', icon: "icon-jinritemai", name: '今日特卖'},
        {id: 'discount', icon: "icon-taotejia", name: '淘特价'},
        {id: 'brand', icon: "icon-pinpaituan", name: '品牌团'},
        {id: 'car', icon: "icon-gouwuche", name: '购物车'},
        {id: 'my', icon: "icon-wode", name: '我的'},
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return {...state};
    }
};

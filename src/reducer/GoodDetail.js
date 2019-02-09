import {
    responseData,
    scrollBrand,
    addAmount,
    minusAmount,
    selectAttribute,
    goodDetailReset
} from '../action/GoodDetail';
import apiConfig from "../api/config";

let defaultState = {
    needData: true,
    scrollTop: 0,
    goodDetail: {
        fengmianSrc: '',
        title: '',
        price: '',
        originPrice: '',
        saleAmount: '',
        endTime: '',
        detailImage: '',
        authorization: ''
    },
    banners: [],
    services: [
        {
            id: 'baoyou',
            name: '包邮',
            content: '折800支持全国绝大部分地区包邮（偏远地区除外，如新疆、西藏、甘肃、宁夏、青海、内蒙古等）'
        },
        {
            id: 'baotui',
            name: '7天包退，退货补运费',
            content: '折800严格按照消费者保障服务，接受卖家7天无理由退货.（签收7天内且商品完好）。选择7天无理由退货成功后可获得5-8元优惠卷补贴'
        },
        {
            id: 'yanhuo',
            name: '人工验货',
            content: '部分商家会向折800寄送活动样品供查验，同时，折800对平台上线的重点活动或重点品牌商品也会不定期进行随机抽样检查'
        },
        {
            id: 'maihou',
            name: '买后评价最多送6积分',
            content: '购买且评价最多可送6积分，会员等级越高所送积分越多（特殊情况不返还积分）。积分可用于：购买商城商品时，抵扣一部分现金，在积分商城兑换商品或在领劵中心兑换平台优惠卷，参与签到页游戏、积分、优惠卷等'
        },
        {
            id: 'huabei',
            name: '支持花呗分期',
            content: '使用蚂蚁花呗可享30天免息。实际结算金额满200及以上支持花呗分期购买'
        }
    ],
    goodAttribute: [],
    selectValidate: false,
    validateString: '',
    buyAmount: '1',
    navItems: [
        {id: 'home', icon: 'icon-fangzi', name: '首页'},
        {id: 'xiaoxi', icon: 'icon-xiaoxi', name: '消息'},
        {id: 'shoucang', icon: 'icon-shoucang', name: '收藏夹'},
        {id: 'zuji', icon: 'icon-zuji', name: '足迹'},
        {id: 'jiucuo', icon: 'icon-dengpao', name: '商品纠错'}
    ]
};

function handelKindData(state, action) {
    let cloneState = {...state};
    cloneState.goodDetail = action.payload.detail[0];

    let bannerAmount = Number(cloneState.goodDetail.bannerAmount);
    let goodId = cloneState.goodDetail.goodId;
    for (let i = 0; i < bannerAmount; i++){
        cloneState.banners.push({
            bannerId: String(i),
            bannerSrc: `http://${location.hostname}:${apiConfig.serverPort}/zhe800/goodDetail/${goodId}/${i}.jpg`
        })
    }
    cloneState.goodDetail.fengmianSrc = cloneState.banners[0].bannerSrc;
    cloneState.goodDetail.authorization = `http://${location.hostname}:${apiConfig.serverPort}/zhe800/goodDetail/${goodId}/authorization.jpg`;
    cloneState.goodDetail.detailImage = `http://${location.hostname}:${apiConfig.serverPort}/zhe800/goodDetail/${goodId}/detail.png`;

    action.payload.attribute.forEach(json => json.select = false);

    let regularAttr = action.payload.attribute.reduce((target, item) => {
        if (!Boolean(target[item.kindId])) {
            target[item.kindId] = [];
        }
        target[item.kindId].push(item);

        return target;
    }, {});
    cloneState.validateString = '请选择 ' + Object.values(regularAttr).map(item => item[0].name).join('、')

    cloneState.goodAttribute = action.payload.attribute;

    cloneState.needData = false;
    return cloneState;
}

export default (state = JSON.parse(JSON.stringify(defaultState)), action) => {
    switch (action.type) {
        case responseData:
            return handelKindData(state, action);
        case scrollBrand:
        {
            let cloneState = {...state};
            cloneState.scrollTop = action.payload.scrollTop;
            return cloneState;
        }
        case addAmount:
        {
            let cloneState = {...state};
            cloneState.buyAmount = String(Number(cloneState.buyAmount) + 1);
            return cloneState;
        }
        case minusAmount:
        {
            let cloneState = {...state};
            cloneState.buyAmount = String(Math.max(1, Number(cloneState.buyAmount) - 1));
            return cloneState;
        }
        case selectAttribute:
        {
            let cloneState = {...state};
            let memberAttr = action.payload;
            cloneState.goodAttribute
                .filter(item => item.kindId === memberAttr.kindId)
                .forEach(item => item.select = false);

            cloneState.goodAttribute
                .filter(item => item._id === memberAttr._id)
                .forEach(item => item.select = true);

            let regularAttr = cloneState.goodAttribute.reduce((target, item) => {
                if (!Boolean(target[item.kindId])) {
                    target[item.kindId] = [];
                }
                target[item.kindId].push(item);

                return target;
            }, {});

            cloneState.validateString = '请选择 ' + Object.values(regularAttr).reduce((target, item) => {
                let kindSelect = item.some(member => member.select);
                if (!kindSelect) {
                    target.push(item[0].name);
                }
                return target;
            }, []).join('、');

            cloneState.selectValidate = Object.values(regularAttr).reduce((target, item) => {
                target.push(item.some(member => member.select));
                return target;
            }, []).every(item => item);

            cloneState.goodAttribute = [].concat(cloneState.goodAttribute);
            return cloneState;
        }
        case goodDetailReset:
        {
            let cloneState = {...state};
            cloneState = JSON.parse(JSON.stringify(defaultState));
            return cloneState;
        }
        default:
            return {...state};
    }
};

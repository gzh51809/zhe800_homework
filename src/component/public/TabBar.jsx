import React, {
    Component
} from 'react';
import PropType from 'prop-types';
import TouchBox from './TouchBox';

import style from './TabBar.scss';
import iconfont from "../../scss/iconfont.css";

class TabBar extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {id: 'home', icon: iconfont["icon-jinritemai"], name: '今日特卖'},
                {id: 'discount', icon: iconfont["icon-taotejia"], name: '淘特价'},
                {id: 'brand', icon: iconfont["icon-pinpaituan"], name: '品牌团'},
                {id: 'car', icon: iconfont["icon-gouwuche"], name: '购物车'},
                {id: 'my', icon: iconfont["icon-wode"], name: '我的'},
            ]
        };
    }

    render() {
        let tabs = this.state.tabs.map(member => {
            return (
                <TouchBox key={member.id}
                          tab={() => this.props.clickTab(member)}
                          className={member.id === this.props.selectId ? style.select : ''}
                          activeClass={style.select}>
                    <i className={member.icon}></i>
                    <span>{member.name}</span>
                </TouchBox>
            );
        });


        return (
            <div className={style.TabBar}>
                {tabs}
            </div>
        );
    }
}

TabBar.propTypes = {
    selectId: PropType.string,
    clickTab: PropType.func
};

TabBar.defaultProps = {
    selectId: 'home',
    clickTab: (() => {})
};

export default TabBar;

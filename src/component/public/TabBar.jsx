import React, {
    Component
} from 'react';
import PropType from 'prop-types';
import TouchBox from './TouchBox';

import style from './TabBar.scss';
import iconfont from "../../scss/iconfont.css";

class TabBar extends Component {
    render() {
        let tabs = this.props.tabs.map(member => {
            return (
                <TouchBox key={member.id}
                          tab={() => this.props.clickTab(member)}
                          className={member.id === this.props.selectId ? style.select : ''}
                          activeClass={style.select}>
                    <i className={iconfont[member.icon]}></i>
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
    tabs: PropType.array,
    selectId: PropType.string,
    clickTab: PropType.func
};

TabBar.defaultProps = {
    tabs: [],
    selectId: 'home',
    clickTab: (() => {})
};

export default TabBar;

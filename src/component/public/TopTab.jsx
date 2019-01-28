import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './TopTab.scss';
import icon from '../../scss/iconfont.css'

import {ScrollContainer, TouchBox} from '../public';

class TopTab extends Component {
    render() {
        let tabs = this.props.tabs.map((item, index) => {
            return (
                <TouchBox key={index}
                          tab={() => this.props.clickTab(item)}
                          activeClass={style.active}
                          className={style.tab}>
                    {item.kindName}
                </TouchBox>
            );
        });


        return (
            <div className={style.TobTab}>
                <TouchBox tagName={'p'}
                          tab={() => this.props.clickTab(this.props.leftTab)}
                          className={classNames(style.tab, style.select)}>
                    {this.props.leftTab.kindName}
                </TouchBox>
                <ScrollContainer direction={'horizontal'}>
                    <div className={style.tabWrapper}>
                        {tabs}
                    </div>
                </ScrollContainer>
                {/*<TouchBox tagName={'p'}*/}
                          {/*tab={() => console.log('更多')}*/}
                          {/*className={classNames(style.more, icon["icon-jiantou-xia"])}*/}
                          {/*activeClass={style.moreActive}/>*/}
            </div>
        );
    }
}

TopTab.propTypes = {
    leftTab: PropTypes.shape({
        kindId: PropTypes.string,
        kindName: PropTypes.string
    }),
    tabs: PropTypes.arrayOf(PropTypes.shape({
        kindId: PropTypes.string,
        kindName: PropTypes.string
    })),
    clickTab: PropTypes.func,
};

TopTab.defaultProps = {
    leftTab: {kindId: '-', kindName: '-'},
    tabs: [{kindId: '-', kindName: '-'}],
    clickTab: (() => {})
};

export default TopTab;

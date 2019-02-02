import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './TopTab.scss';

import {ScrollContainer, TouchBox} from '../public';

class TopTab extends Component {
    render() {
        let tabs = this.props.tabs.map(item => {
            return (
                <TouchBox key={item.kindId}
                          tagName={'p'}
                          tab={() => this.props.clickTab(item)}
                          activeClass={style.active}
                          className={style.tab}>
                    {item.kindName}
                </TouchBox>
            );
        });


        return (
            <div className={style.TobTab}>
                <p className={classNames(style.tab, style.select)}>
                    {this.props.leftTab.kindName}
                </p>
                <ScrollContainer direction={'horizontal'}>
                    {tabs}
                </ScrollContainer>
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

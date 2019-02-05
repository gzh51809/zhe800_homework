import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Tab.scss';

import {
    TouchBox
} from '../public';
import classNames from 'classnames';

class Tab extends Component {

    render() {
        let tabElement = this.props.items.map(item => (
            <TouchBox key={item.id}
                      className={style.wrapper}
                      activeClass={style.active}
                      tab={() => this.props.clickTab(item)}>
                <p className={item.id === this.props.selectItem.id ? classNames(style.tab, style.tabActive) : style.tab}>
                    {item.name}
                </p>
            </TouchBox>
        ));

        return (
            <div className={style.Tab}>
                {tabElement}
            </div>
        );
    }
}

Tab.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    selectItem: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    clickTab: PropTypes.func,
};

Tab.defaultProps = {
    items: [],
    selectItem: {},
    clickTab: () => {},
};

export default Tab;

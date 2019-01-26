import React, {
    Component
} from 'react';
import PropType from 'prop-types';

import ScrollContainer from './ScrollContainer';
import TabBar from './TabBar';

import style from './TabBarContainer.scss';

class TabBarContainer extends Component {
    render() {
        return (
            <div className={style.TabBarContainer}>
                <ScrollContainer className={style.scrollWrapper}
                                 scroll={this.props.scroll}>
                    {this.props.children}
                </ScrollContainer>
                <TabBar selectId={this.props.tabId}
                        clickTab={(item) => {
                            item.id !== this.props.tabId && this.props.selectTab(item);
                        }}/>
            </div>
        );
    }
}

TabBarContainer.propTypes = {
    tabId: PropType.string,
    selectTab: PropType.func,
    scroll: PropType.func
};

TabBarContainer.defaultProps = {
    tabId: 'home',
    selectTab: (() => {}),
    scroll: (() => {})
};


export default TabBarContainer;

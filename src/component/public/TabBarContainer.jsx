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
                <ScrollContainer needScrollToTop={this.props.needScrollToTop}
                                 scrollTop={this.props.scrollTop}
                                 ref={'scrollContainer'}
                                 className={style.scrollWrapper}
                                 scroll={this.props.scroll}>
                    {this.props.children}
                </ScrollContainer>
                <TabBar selectId={this.props.tabId}
                        tabs={this.props.tabs}
                        clickTab={(item) => {
                            item.id !== this.props.tabId && this.props.selectTab(item);
                        }}/>
            </div>
        );
    }
}

TabBarContainer.propTypes = {
    tabs: PropType.arrayOf(PropType.shape({
        id: PropType.string,
        name: PropType.string
    })),
    tabId: PropType.string,
    selectTab: PropType.func,
    scroll: PropType.func,
    scrollTop: PropType.number,
    needScrollToTop: PropType.bool
};

TabBarContainer.defaultProps = {
    tabs: [],
    tabId: 'home',
    selectTab: (() => {}),
    scrollTop: 0,
    scroll: (() => {})
};


export default TabBarContainer;

import React, {
    Component
} from 'react';
import PropType from 'prop-types';

import style from './TopBar.scss';
import icon from '../../image/icon.png';
import TouchBox from './TouchBox';

class TopBar extends Component {
    render() {
        return (
            <div className={style.TopBar}>
                <img src={icon} alt="加载失败"/>
                <div>
                    <p>折800</p>
                    <p>更多折扣&nbsp;更好生活</p>
                </div>
                <TouchBox tagName={'p'}
                          tab={this.props.download}
                          className={style.download}
                          activeClass={style.downloadActive}>
                    下载
                </TouchBox>
            </div>
        );
    }
}

TopBar.propTypes = {
    download: PropType.func
};

TopBar.defaultProps = {
    download: () => {}
};

export default TopBar;

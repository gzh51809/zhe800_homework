import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'

import style from './AdArea.scss';

class AdArea extends Component {
    render() {
        let AdElements = this.props.ads.map(json => (
            <TouchBox key={json._id}
                      className={style.item}
                      activeClass={style.active}
                      tab={() => this.props.clickItem(json)}
                      style={{backgroundImage: `url('${json.adSrc || ''}')`}}>
            </TouchBox>
        ));

        return (
            <div className={style.AdArea}>
                {AdElements}
            </div>
        );
    }
}

AdArea.propTypes = {
    ads: PropTypes.array,
    clickItem: PropTypes.func
};

AdArea.defaultProps = {
    ads: [],
    clickItem: () => {}
};

export default AdArea;

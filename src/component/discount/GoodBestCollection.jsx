import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import style from './GoodBestCollection.scss';

import {ScrollContainer} from '../public';
import {GoodItem2} from '../good';

class GoodBestCollection extends Component {
    render() {
        let goods = this.props.goods.map(json => (
            <GoodItem2 key={json._id}
                       className={style.member}
                       good={{
                           fengmianSrc: json.fengmianSrc,
                           name: json.name,
                           price: json.price
                       }}/>
        ));

        return (
            <div className={style.GoodBestCollection}>
                <h2>精选好货</h2>
                <ScrollContainer direction={'horizontal'}>
                    {goods}
                </ScrollContainer>
            </div>
        );
    }
}

GoodBestCollection.propTypes = {
    goods: PropTypes.arrayOf(PropTypes.shape({
        fengmianSrc: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string
    })),
    clickItem: PropTypes.func
};

GoodBestCollection.defaultProps = {
    goods: [],
    clickItem: () => {}
};

export default GoodBestCollection;

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public'
import style from './AttributePoper.scss';
import base from '../../scss/base.scss';
import icon from '../../scss/iconfont.css';

class AttributePoper extends Component {
    constructor() {
        super();
        this.state = {
            theClass: base.disappear,
            wrapperTransform: 'translateY(100%)'
        };

        this.showPoper = this.showPoper.bind(this);
        this.hidePoper = this.hidePoper.bind(this);

        this.renderTopTitle = this.renderTopTitle.bind(this);
        this.renderAttribute = this.renderAttribute.bind(this);
        this.renderAmount = this.renderAmount.bind(this);
        this.renderBottomArea = this.renderBottomArea.bind(this);
    }

    //----------------UI交互相关----------------
    showPoper() {
        this.setState({
            theClass: style.AttributePoper
        }, () => setTimeout(() => this.setState({
            wrapperTransform: 'translateY(0%)'
        }), 0));
    }

    hidePoper() {
        setTimeout(() => this.setState({
            wrapperTransform: 'translateY(100%)'
        }, () => {
            setTimeout(() => this.setState({
                theClass: base.disappear
            }), 200);
        }), 0);
    }

    //---------------渲染节点相关---------------
    renderTopTitle() {
        let {good} = this.props;
        return (
            <div className={style.title}>
                <img src={good.fengmianSrc} alt="加载失败"/>
                <div>
                    <h2>¥{good.price}</h2>
                    <h3>{this.props.goodTitle}</h3>
                </div>
                <TouchBox tagName={'i'}
                          tab={() => this.hidePoper()}
                          className={icon["icon-guanbi"]}
                          activeClass={style.active}/>
            </div>
        );
    }

    renderAttribute() {
        let regular = this.props.attribute.reduce((target, item) => {
            if (!Boolean(target[item.kindId])) {
                target[item.kindId] = [];
            }
            target[item.kindId].push(item);
            return target;
        }, {});

        return Object.values(regular).reduce((target, subArray) => {
            let selectObjects = subArray.map(json => (
                <TouchBox key={json.attributeId}
                          activeClass={style.active}
                          tagName={'h3'}
                          tab={() => this.props.selectAttribute(json)}>
                    <p className={json.select ? style.select : null}>{json.attributeName}</p>
                </TouchBox>
            ));

            let kindCell = (
                <div key={subArray[0].kindId}
                     className={style.attribute}>
                    <p>{subArray[0].name}</p>
                    <div>
                        {selectObjects}
                    </div>
                </div>
            );


            target.push(kindCell);
            return target;
        }, []);
    }

    renderAmount() {
        return (
            <div className={style.amount}>
                <p>购买数量</p>
                <div>
                    <TouchBox
                        tagName={'p'}
                        activeClass={style.active}
                        tab={() => this.props.minusAmount()}>
                        -
                    </TouchBox>
                    <span>{this.props.buyAmount}</span>
                    <TouchBox
                        tagName={'p'}
                        activeClass={style.active}
                        tab={() => this.props.addAmount()}>
                        +
                    </TouchBox>
                </div>
            </div>
        )
    }

    renderBottomArea() {
        let carButton = (
            <TouchBox tagName={'p'}
                      activeClass={style.carActive}
                      tab={() => {
                          this.hidePoper();
                          this.props.addToCar(this.props.attribute)
                      }}
                      className={style.car}>
                加入购物车
            </TouchBox>
        );

        let buyButton = (
            <TouchBox tagName={'p'}
                      activeClass={style.buyActive}
                      tab={() => {
                          this.hidePoper();
                          this.props.buy(this.props.attribute)
                      }}
                      className={style.buy}>
                立即购买
            </TouchBox>
        );

        return (
            <div className={style.bottom}>
                {carButton}
                {buyButton}
            </div>
        );
    }

    render() {
        return (
            <div className={this.state.theClass}>
                <div className={style.wrapper} style={{transform: this.state.wrapperTransform}}>
                    <div className={style.center}>
                        {this.renderTopTitle()}
                        {this.renderAttribute()}
                        {this.renderAmount()}
                    </div>
                    {this.renderBottomArea()}
                </div>
            </div>
        );
    }
}

AttributePoper.propTypes = {
    good: PropTypes.shape({
        price: PropTypes.string,
        fengmianSrc: PropTypes.string
    }),
    attribute: PropTypes.arrayOf(PropTypes.shape({
        kindId: PropTypes.string,
        name: PropTypes.string,
        attributeId: PropTypes.string,
        attributeName: PropTypes.string,
        select: PropTypes.bool
    })),
    goodTitle: PropTypes.string,
    selectAttribute: PropTypes.func,
    addToCar: PropTypes.func,
    buyAmount: PropTypes.string,
    addAmount: PropTypes.func,
    minusAmount: PropTypes.func,
    buy: PropTypes.func,
};

AttributePoper.defaultProps = {
    good: {},
    attribute: [],
    goodTitle: '',
    selectAttribute: () => {},
    addToCar: () => {},
    buyAmount: '1',
    addAmount: () => {},
    minusAmount: () => {},
    buy: () => {}
};

export default AttributePoper;

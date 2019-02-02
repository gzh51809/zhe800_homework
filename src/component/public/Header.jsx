import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import TouchBox from './TouchBox'
import style from './Header.scss';
import icon from '../../scss/iconfont.css'
import classNames from 'classnames';

class Header extends Component {
    render() {
        let left = this.props.leftConfig.map((item, index) => (
            <TouchBox tagName={'span'}
                      key={index}
                      activeClass={style.active}
                      className={icon[item.icon]}
                      tab={() => this.props.clickHeaderButton({...item, ...{type: 'left'}})}>
                {item.title || ''}
            </TouchBox>
        ));

        let right = this.props.rightConfig.map((item, index) => (
            <TouchBox tagName={'span'}
                      key={index}
                      activeClass={style.active}
                      className={icon[item.icon]}
                      tab={() => this.props.clickHeaderButton({...item, ...{type: 'right'}})}>
                {item.title || ''}
            </TouchBox>
        ));

        if (right.length !== left.length) {
            let smaller = right.length < left.length ? right : left;
            for (let i = 0; i < Math.abs(right.length - left.length); i++) {
                smaller.push((
                    <TouchBox key={i} tagName={'span'}></TouchBox>
                ));
            }
        }

        return (
            <div className={classNames(this.props.className, style.Header)}>
                {left}
                <p>{this.props.title}</p>
                {right}
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
    leftConfig: PropTypes.array,
    rightConfig: PropTypes.array,
    clickHeaderButton: PropTypes.func
};

Header.defaultProps = {
    title: '--',
    leftConfig: [],
    rightConfig: [],
    clickHeaderButton: () => {}
};

export default Header;

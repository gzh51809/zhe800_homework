import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import style from './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className={style.Header}>
                <p>{this.props.title}</p>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
};

Header.defaultProps = {
    title: '--',
};

export default Header;

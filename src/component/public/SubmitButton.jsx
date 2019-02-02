import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {TouchBox} from '../public';
import style from './SubmitButton.scss';
import classNames from 'classnames';

class SubmitButton extends Component {
    render() {
        return (
            <TouchBox activeClass={this.props.enable ? style.active : null}
                      tab={() => this.props.enable && this.props.submit()}
                      tagName={'h3'}>
                <p className={this.props.enable ? classNames(style.SubmitButton, style.enable) : classNames(style.SubmitButton, style.disable)}>
                    {this.props.title}
                </p>
            </TouchBox>
        )
    }
}

SubmitButton.propTypes = {
    title: PropTypes.string,
    enable: PropTypes.bool,
    submit: PropTypes.func
};

SubmitButton.defaultProps = {
    title: '',
    enable: false,
    submit: () => {}
};

export default SubmitButton


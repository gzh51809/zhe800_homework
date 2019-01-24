import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TouchBox extends Component {
    constructor() {
        super();
        this.state = {
            theClass: ''
        };
        this.response = false;

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.touchCancel = this.touchCancel.bind(this);
    }

    componentWillMount() {
        this.setState({
            theClass: this.props.className
        })
    }

    touchStart() {
        this.response = true;
        this.setState({
            theClass: classNames(this.props.className, this.props.activeClass)
        });
    }

    touchMove() {
        this.response = false;
        this.setState({
            theClass: this.props.className
        });
    }

    touchEnd() {
        if (this.response) {
            this.props.tab();
        }
        this.response = false;
        this.setState({
            theClass: this.props.className
        });
    }

    touchCancel() {
        this.response = false;
        this.setState({
            theClass: this.props.className
        });
    }

    render() {
        let element = null;
        switch (this.props.tagName) {
            case 'div':
            default:
                element = (
                    <div className={this.state.theClass}
                         onTouchStart={this.touchStart}
                         onTouchMove={this.touchMove}
                         onTouchEnd={this.touchEnd}
                         onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </div>
                );
                break;
            case 'p':
                element = (
                    <p className={this.state.theClass}
                       onTouchStart={this.touchStart}
                       onTouchMove={this.touchMove}
                       onTouchEnd={this.touchEnd}
                       onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </p>
                );
                break;
            case 'span':
                element = (
                    <span className={this.state.theClass}
                       onTouchStart={this.touchStart}
                       onTouchMove={this.touchMove}
                       onTouchEnd={this.touchEnd}
                       onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </span>
                );
                break;
        }


        return element;
    }
}

TouchBox.propTypes = {
    tagName: PropTypes.oneOf(['div', 'p', 'span']),
    tab: PropTypes.func,
    activeClass: PropTypes.string
};

TouchBox.defaultProps = {
    tagName: 'div',
    tab: (() => {}),
    activeClass: ''
};

export default TouchBox;

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
        this.setState({
            theClass: this.props.className
        });
        if (this.response) {
            this.props.tab();
        }
        this.response = false;
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
                    <div className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                         style={this.props.style}
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
                    <p className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                       style={this.props.style}
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
                    <span className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                          style={this.props.style}
                          onTouchStart={this.touchStart}
                          onTouchMove={this.touchMove}
                          onTouchEnd={this.touchEnd}
                          onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </span>
                );
                break;
            case 'h3':
                element = (
                    <h3 className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                        style={this.props.style}
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                        onTouchEnd={this.touchEnd}
                        onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </h3>
                );
                break;
            case 'h4':
                element = (
                    <h4 className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                        style={this.props.style}
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                        onTouchEnd={this.touchEnd}
                        onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </h4>
                );
                break;
            case 'h5':
                element = (
                    <h5 className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                        style={this.props.style}
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                        onTouchEnd={this.touchEnd}
                        onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </h5>
                );
                break;
            case 'a':
                element = (
                    <a className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                       style={this.props.style}
                       onTouchStart={this.touchStart}
                       onTouchMove={this.touchMove}
                       onTouchEnd={this.touchEnd}
                       onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </a>
                );
                break;
            case 'i':
                element = (
                    <i className={Boolean(this.state.theClass) ? this.state.theClass : this.props.className}
                       style={this.props.style}
                       onTouchStart={this.touchStart}
                       onTouchMove={this.touchMove}
                       onTouchEnd={this.touchEnd}
                       onTouchCancel={this.touchCancel}>
                        {this.props.children}
                    </i>
                );
                break;
        }


        return element;
    }
}

/**
 * 注意：
 * 使用TouchBox时
 * className属性不可以成为外部响应式依赖
 * 但可以成为外部参数传入的接口
 *
 * 如果要成为响应式依赖的做法
 * 不使用className
 * 在非active时，通过标签选择器，选中包裹元素进行样式布局
 * 在active时，通过类选择器，选中包裹元素的样式，发生active变化
 */
TouchBox.propTypes = {
    tagName: PropTypes.oneOf(['div', 'p', 'span', 'h3', 'h4', 'h5', 'a', 'i']),
    tab: PropTypes.func,
    activeClass: PropTypes.string
};

TouchBox.defaultProps = {
    tagName: 'div',
    tab: (() => {
    }),
    activeClass: ''
};

export default TouchBox;

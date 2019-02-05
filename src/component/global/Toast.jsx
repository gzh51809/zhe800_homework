import React, {
    Component
} from 'react';
import {render} from 'react-dom';
import classNames from 'classnames';

import style from './Toast.scss';

class Toast extends Component {
    constructor() {
        super();
        this.state = {
            theClass: style.hideToast,
            toastString: ''
        };
        this.timer = null;
        this.toast = '';
        this.hideDate = Date.now();
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            let interval = Math.max(this.hideDate - Date.now(), 0);
            if (interval === 0 &&
                this.state.theClass === classNames(style.Toast, style.showToast)) {
                this.setState({
                    toastString: this.toast,
                    theClass: style.hideToast
                });
            } else if (interval !== 0 &&
                this.state.theClass === style.hideToast) {
                this.setState({
                    toastString: this.toast,
                    theClass: classNames(style.Toast, style.showToast),
                });
            }
        }, 200);
    }

    showToast(toastString) {
        this.toast = toastString;
        this.hideDate = Date.now() + 3000;
    }

    closeToast() {
        this.hideDate = Date.now() - 1000;
    }

    render() {
        return (
            <div className={this.state.theClass}
                 onTouchStart={() => this.closeToast()}>
                <p>{this.state.toastString}</p>
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

let div = document.createElement('div');
document.body.appendChild(div);
let ToastEle = render(<Toast/>, div);

export {
    ToastEle,
    Toast
};

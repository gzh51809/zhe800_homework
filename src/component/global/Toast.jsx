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
            theClass: classNames(style.Toast, style.hideToast)
        };
    }

    showToast(toastString) {
        this.setState({
            theClass: classNames(style.Toast, style.showToast),
            toastString
        });
        setTimeout(() => this.closeToast(), 3000);
    }

    closeToast() {
        this.setState({
            theClass: classNames(style.Toast, style.hideToast)
        })
    }

    render() {
        return (
            <div className={this.state.theClass}
                 onTouchStart={() => this.closeToast()}>
                <p>{this.state.toastString}</p>
            </div>
        );
    }
}

let div = document.getElementById('public');
let ToastEle = render(<Toast/>, div);

export {
    ToastEle,
    Toast
};

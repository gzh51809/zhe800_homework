import React, {
    Component
} from 'react';
import style from './Loading.scss';
import classNames from 'classnames';
import {render} from "react-dom";

class Loading extends Component {
    constructor(){
        super();
        this.state = {
            theClass: classNames(style.Loading, style.showLoading)
        }
    }

    showLoading() {
        this.setState({
            theClass: classNames(style.Loading, style.showLoading)
        });
    }

    hideLoading() {
        this.setState({
            theClass: classNames(style.Loading, style.hideLoading)
        });
    }

    render() {
        return (
            <div className={this.state.theClass}>
                <div>
                    <div className={style.rotate}></div>
                    <p>折800</p>
                </div>
            </div>
        )
    }
}

let div = document.getElementById('public');
let LoadingEle = render(<Loading/>, div);
LoadingEle.hideLoading();

export {
    Loading,
    LoadingEle
};


import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';

let store = null;

//在生产环境不使用redux调试
if (process.env.NODE_ENV === 'production') {
    store = createStore(reducer, applyMiddleware(thunk));
} else {
    let {composeWithDevTools} = require('redux-devtools-extension');
    store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;

import React from 'react';
import Loadable from "react-loadable";
import {Loading} from '../component/global';
import {
    HashRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Home from '../page/Home';
import Discount from '../page/Discount';
import Brand from '../page/Brand';
import Car from '../page/Car';
import My from '../page/My';

//二级页面Lazy Load
const Search = Loadable({
    loader: () => import(/* webpackChunkName: "Search" */ '../page/Search'),
    loading: Loading
});
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "Login" */ '../page/Login'),
    loading: Loading
});
const SetPassword = Loadable({
    loader: () => import(/* webpackChunkName: "SetPassword" */ '../page/SetPassword'),
    loading: Loading
});
const Register = Loadable({
    loader: () => import(/* webpackChunkName: "Register" */ '../page/Register'),
    loading: Loading
});
const Help = Loadable({
    loader: () => import(/* webpackChunkName: "Help" */ '../page/Help'),
    loading: Loading
});


export default (
    <HashRouter>
        <Switch>
            <Route key={'home'} path={'/home'} component={Home}/>
            <Route key={'discount'} path={'/discount'} component={Discount}/>
            <Route key={'brand'} path={'/brand'} component={Brand}/>
            <Route key={'car'} path={'/car'} component={Car}/>
            <Route key={'my'} path={'/my'} component={My}/>
            <Route key={'search'} path={'/search'} component={Search}/>
            <Route key={'login'} path={'/login'} component={Login}/>
            <Route key={'setPassword'} path={'/setPassword'} component={SetPassword}/>
            <Route key={'register'} path={'/register'} component={Register}/>
            <Route key={'help'} path={'/help'} component={Help}/>
            <Redirect from={'/'} to={'/home'}/>
        </Switch>
    </HashRouter>
);

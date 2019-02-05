import React from 'react';
import Loadable from "react-loadable";
import {Loading} from '../component/global';
import {
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
const Help = Loadable({
    loader: () => import(/* webpackChunkName: "Help" */ '../page/Help'),
    loading: Loading
});
const BrandDetail = Loadable({
    loader: () => import(/* webpackChunkName: "BrandDetail" */ '../page/BrandDetail'),
    loading: Loading
});

export default (
    <Switch>
        <Route key={'home'} path={'/home'} component={Home}/>
        <Route key={'discount'} path={'/discount'} component={Discount}/>
        <Route key={'brand'} path={'/brand'} component={Brand}/>
        <Route key={'car'} path={'/car'} component={Car}/>
        <Route key={'my'} path={'/my'} component={My}/>
        <Route key={'search'} path={'/search'} component={Search}/>
        <Route key={'login'} path={'/login'} component={Login}/>
        <Route key={'setPassword'} path={'/setPassword'} component={SetPassword}/>
        <Route key={'help'} path={'/help'} component={Help}/>
        <Route key={'brandDetail'} path={'/brandDetail'} component={BrandDetail}/>
        <Redirect from={'/'} to={'/home'}/>
    </Switch>
);

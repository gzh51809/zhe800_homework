import React from 'react';
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
import Search from '../page/Search';

export default (
    <Switch>
        <Route key={'home'} path={'/home'} component={Home}/>
        <Route key={'discount'} path={'/discount'} component={Discount}/>
        <Route key={'brand'} path={'/brand'} component={Brand}/>
        <Route key={'car'} path={'/car'} component={Car}/>
        <Route key={'my'} path={'/my'} component={My}/>
        <Route key={'search'} path={'/search'} component={Search}/>
        <Redirect from={'/'} to={'/home'}/>
    </Switch>
);

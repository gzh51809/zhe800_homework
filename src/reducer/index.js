import {combineReducers} from "redux";

import Home from './Home';
import Discount from './Discount';
import Brand from './Brand';
import Car from './Car';
import My from './My';
import BrandDetail from './BrandDetail';
import GoodDetail from './GoodDetail';

export default combineReducers({
    home: Home,
    discount: Discount,
    brand: Brand,
    car: Car,
    my: My,
    brandDetail: BrandDetail,
    goodDetail: GoodDetail
});

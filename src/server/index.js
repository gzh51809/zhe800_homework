"use strict";

const express = require('express');
const {server: {port, log}} = require('./config');
const {judgeToken, updateToken} = require('./crypto');

const requestKind = require('./requestKind');
const requestKindGoodList = require('./requestKindGoodList');
const requestDiscountKind = require('./requestDiscountKind');
const requestDiscountIcon = require('./requestDiscountIcon');
const requestDiscountAd = require('./requestDiscountAd');
const requestDiscountCollection = require('./requestDiscountCollection');
const requestDiscountList = require('./requestDiscountList');
const requestBrandKind = require('./requestBrandKind');
const requestBrandList = require('./requestBrandList');
const requestAuth = require('./requestAuth');
const requestLogin = require('./requestLogin');
const requestRegister = require('./requestRegister');
const requestBrandDetail = require('./requestBrandDetail');
const requestBrandGoodList = require('./requestBrandGoodList');
const requestGoodDetail = require('./requestGoodDetail');
const requestGoodAttribute = require('./requestGoodAttribute');
const requestAddToCar = require('./requestAddToCar');
const requestCarInfo = require('./requestCarInfo');
const requestUpdateCarInfo = require('./requestUpdateCarInfo');
const requestDeleteCarInfo = require('./requestDeleteCarInfo');

let app = express();
//某些特殊端口如6000   Google报unsafe_port
app.listen(port, () => console.log(log));
app.all('*', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requeted-With');
    response.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, OPTIONS');

    if (request.method === 'OPTIONS') {
        response.sendStatus(200);
    } else {
        next();
    }
});

//----------静态资源服务器----------
app.use('/zhe800/', express.static('./src/server/asset'));

//------------路由配置------------
app.use('/zhe800Interface/', (request, response, next) => {
    //每次接口调用返回时，更新token
    response.setHeader('Access-Control-Expose-Headers', 'Authorization');

    let token = request.headers.authorization;
    if (Boolean(token) && judgeToken({token})) {
        let updated = updateToken({token});
        response.setHeader('Authorization', updated);
    }

    next();
});

app.use('/zhe800Interface/', requestKind);
app.use('/zhe800Interface/', requestKindGoodList);
app.use('/zhe800Interface/', requestDiscountKind);
app.use('/zhe800Interface/', requestDiscountIcon);
app.use('/zhe800Interface/', requestDiscountAd);
app.use('/zhe800Interface/', requestDiscountCollection);
app.use('/zhe800Interface/', requestDiscountList);
app.use('/zhe800Interface/', requestBrandKind);
app.use('/zhe800Interface/', requestBrandList);
app.use('/zhe800Interface/', requestAuth);
app.use('/zhe800Interface/', requestLogin);
app.use('/zhe800Interface/', requestRegister);
app.use('/zhe800Interface/', requestBrandDetail);
app.use('/zhe800Interface/', requestBrandGoodList);
app.use('/zhe800Interface/', requestGoodDetail);
app.use('/zhe800Interface/', requestGoodAttribute);
app.use('/zhe800Interface/', requestAddToCar);
app.use('/zhe800Interface/', requestCarInfo);
app.use('/zhe800Interface/', requestUpdateCarInfo);
app.use('/zhe800Interface/', requestDeleteCarInfo);

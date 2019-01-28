"use strict";

const express = require('express');
const {server:{port, log}} = require('./config');

const requestKind = require('./requestKind');
const requestKindGoodList = require('./requestKindGoodList');
const requestDiscountKind = require('./requestDiscountKind');
const requestDiscountIcon = require('./requestDiscountIcon');
const requestDiscountAd = require('./requestDiscountAd');
const requestDiscountCollection = require('./requestDiscountCollection');
const requestDiscountList = require('./requestDiscountList');

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
app.use('/zhe800/', requestKind);
app.use('/zhe800/', requestKindGoodList);
app.use('/zhe800/', requestDiscountKind);
app.use('/zhe800/', requestDiscountIcon);
app.use('/zhe800/', requestDiscountAd);
app.use('/zhe800/', requestDiscountCollection);
app.use('/zhe800/', requestDiscountList);

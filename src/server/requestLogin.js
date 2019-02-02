const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find, updateOne} = require('./mongoDB');

router.post('/requestLogin', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        mobile: request.body.mobile,
        authCode: request.body.authCode,
        name: request.body.name,
        password: request.body.password
    };
    try {
        database = await connect();
        let result = {};

        //短信验证码方式
        if (request.body.type === 'mobile') {
            result = await find({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: query.mobile, authCode: query.authCode}
            });
            result = await updateOne({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: query.mobile},
                update: {$set: {authCode: ''}}
            });
            if (result.modifiedCount === 1) {
                response.send(responseSuccess());
                return;
            }
        }

        //账号密码方式
        if (request.body.type === 'account') {
            result = await find({
                collection: database.db('zhe800').collection('user'),
                query: {name: query.name, password: query.password}
            });
            if (result.length === 1) {
                response.send(responseSuccess());
                return;
            }
        }
        response.send(responseError());
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

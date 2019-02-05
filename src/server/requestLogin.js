const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find, updateOne} = require('./mongoDB');
const {encryptToken} = require('./crypto');

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
            let member = await find({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: query.mobile, authCode: query.authCode},
            });
            if (member.length === 1) {
                result = await updateOne({
                    collection: database.db('zhe800').collection('user'),
                    query: {mobile: query.mobile},
                    update: {$set: {authCode: ''}}
                });
                if (result.modifiedCount === 1) {
                    let token = encryptToken({mobile: member[0].mobile});
                    response.setHeader('Authorization', token);
                    response.send({...responseSuccess(), ...{register: member[0].register}});
                    return;
                }
            }
        }

        //账号密码方式
        if (request.body.type === 'account') {
            let nameResult = await find({
                collection: database.db('zhe800').collection('user'),
                query: {name: query.name, password: query.password}
            });

            let mobileResult = await find({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: query.name, password: query.password}
            });

            if (nameResult.length === 1 || mobileResult.length === 1) {
                let mobile = '';
                nameResult.length === 1 && (mobile = nameResult[0].mobile);
                mobileResult.length === 1 && (mobile = mobileResult[0].mobile);
                let token = encryptToken({mobile});
                response.setHeader('Authorization', token);
                response.send(responseSuccess());
                return;
            }
        }
        response.send(responseError('手机/邮箱/用户名或密码错误'));
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

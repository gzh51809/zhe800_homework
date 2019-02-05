const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError, responseTokenInvalid} = require('./validate');
const {connect, find, updateOne} = require('./mongoDB');
const {decryptToken, judgeToken} = require('./crypto');

router.post('/requestRegister', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        type: request.body.type,
        mobile: decryptToken({token: request.headers.authorization}).mobile,
        password: request.body.password
    };

    //超时判断
    if (!judgeToken({token: request.headers.authorization})) {
        response.send(responseTokenInvalid());
        return;
    }

    try {
        database = await connect();
        let result = {};

        //短信验证码方式注册
        if (request.body.type === 'mobile') {
            let member = await find({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: query.mobile, register: '0'},
            });
            if (member.length === 1) {
                result = await updateOne({
                    collection: database.db('zhe800').collection('user'),
                    query: {mobile: query.mobile},
                    update: {$set: {password: query.password, authCode: '', register: '1'}}
                });
                if (result.modifiedCount === 1) {
                    response.send(responseSuccess());
                    return;
                }
            }
        }

        response.send(responseError('该用户已注册'));
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

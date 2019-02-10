const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError, responseTokenInvalid} = require('./validate');
const {connect, find, deleteOne} = require('./mongoDB');
const {decryptToken, judgeToken} = require('./crypto');
const {ObjectId} = require('mongodb');

router.post('/requestDeleteCarInfo', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        mobile: decryptToken({token: request.headers.authorization}).mobile,
    };

    //超时判断
    if (!judgeToken({token: request.headers.authorization})) {
        response.send(responseTokenInvalid());
        return;
    }

    try {
        database = await connect();

        //用户注册判断
        let result = await find({
            collection: database.db('zhe800').collection('user'),
            query: {
                mobile: query.mobile,
                register: '1'
            }
        });
        if (result.length !== 1) {
            response.send(responseTokenInvalid());
            return;
        }

        for (let i = 0; i < request.body.list.length; i++) {
            let member = request.body.list[i];
            result = await deleteOne({
                collection: database.db('zhe800').collection('car'),
                query: {_id: ObjectId(member._id)}
            });
            if (result.deletedCount !== 1) {
                response.send(responseError());
                return;
            }
        }
        response.send(responseSuccess());
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

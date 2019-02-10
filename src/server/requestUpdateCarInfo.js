const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError, responseTokenInvalid} = require('./validate');
const {connect, find, updateOne} = require('./mongoDB');
const {decryptToken, judgeToken} = require('./crypto');
const {ObjectId} = require('mongodb');

router.post('/requestUpdateCarInfo', bodyParser.json(), async (request, response) => {
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

        result = await find({
            collection: database.db('zhe800').collection('car'),
            query: {_id: ObjectId(request.body._id)}
        });
        if (result.length === 1) {
            result = await updateOne({
                collection: database.db('zhe800').collection('car'),
                query: {_id: ObjectId(request.body._id)},
                update: {
                    $set: {
                        buyAmount: request.body.buyAmount,
                        attribute: request.body.attribute,
                        attributeName: request.body.attributeName
                    }
                }
            });
            if (result.modifiedCount === 1) {
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

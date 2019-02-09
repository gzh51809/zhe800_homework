const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError, responseTokenInvalid} = require('./validate');
const {connect, find, updateOne, insertOne} = require('./mongoDB');
const {decryptToken, judgeToken} = require('./crypto');

router.post('/requestAddToCar', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        ...request.body,
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

        //是否有重复的条目
        result = await find({
            collection: database.db('zhe800').collection('car'),
            query: {
                mobile: query.mobile,
                attribute: query.attribute,
                goodId: query.goodId
            }
        });

        //更新原条目
        if (result.length === 1) {
            result = await updateOne({
                collection: database.db('zhe800').collection('car'),
                query: {
                    mobile: query.mobile,
                    attribute: query.attribute,
                    goodId: query.goodId
                },
                update: {$set:{
                    buyAmount: String(Number(query.buyAmount) + Number(result[0].buyAmount))
                }}
            });
            if (result.modifiedCount === 1) {
                response.send(responseSuccess());
                return;
            }
        }

        //插入新的条目
        if (result.length === 0) {
            result = await insertOne({
                collection: database.db('zhe800').collection('car'),
                query
            });
            if (result.insertedCount === 1) {
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

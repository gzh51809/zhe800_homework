const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find, insertOne, updateOne} = require('./mongoDB');

router.post('/requestAuth', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        mobile: request.body.mobile,
        authCode: String(Date.now()).slice(-4),
        name: '',
        password: ''
    };
    try {
        database = await connect();
        let result = await find({collection: database.db('zhe800').collection('user'), query: {mobile: query.mobile}});
        if (result.length === 0) {
            result = await insertOne({
                collection: database.db('zhe800').collection('user'),
                query: query
            });
            if (result.insertedCount === 1) {
                response.send({...responseSuccess(), ...{authCode: query.authCode}});
            } else {
                response.send(responseError());
            }
        } else if (result.length === 1) {
            result = await updateOne({
                collection: database.db('zhe800').collection('user'),
                query: {mobile: request.body.mobile},
                update: {$set: query}
            });
            if (result.modifiedCount === 1) {
                response.send({...responseSuccess(), ...{authCode: query.authCode}});
            } else {
                response.send(responseError());
            }
        } else {
            response.send(responseError());
        }
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

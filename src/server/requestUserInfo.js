const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find} = require('./mongoDB');
const {decryptToken, judgeToken} = require('./crypto');

router.post('/requestUserInfo', bodyParser.json(), async (request, response) => {
    let database = null;
    let query = {
        mobile: decryptToken({token: request.headers.authorization}).mobile,
    };

    //超时判断，超时不返回任何数据
    if (!judgeToken({token: request.headers.authorization})) {
        response.send(responseSuccess());
        return;
    }

    try {
        database = await connect();
        let result = await find({collection: database.db('zhe800').collection('user'), query: query});
        if (result.length === 1) {
            response.send({...responseSuccess(), ...{mobile: result[0].mobile}});
            return;
        }
        response.send(responseError());
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

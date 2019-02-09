const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find} = require('./mongoDB');

router.post('/requestGoodAttribute', bodyParser.json(), async (request, response) => {
    let database = null;
    try {
        database = await connect();
        let result = await find({collection: database.db('zhe800').collection('goodAttribute'), query: request.body});
        response.send({...responseSuccess(), ...{list: result}});
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;


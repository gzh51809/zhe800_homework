const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find} = require('./mongoDB');

router.post('/requestDiscountAd', bodyParser.json(), async (request, response) => {
    let database = null;
    try {
        database = await connect();
        let result = await find({collection: database.db('zhe800').collection('discountAd'), query: {}});
        response.send({...responseSuccess(), ...{list: result}});
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

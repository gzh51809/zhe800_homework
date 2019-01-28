const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const {responseSuccess, responseError} = require('./validate');
const {connect, find} = require('./mongoDB');

router.post('/requestDiscountList', bodyParser.json(), async (request, response) => {
    let database = null;
    try {
        database = await connect();

        let kindIds = request.body.kindIds || [];
        let result = [];
        for (let i = 0; i < kindIds.length; i++) {
            let temp = await find({collection: database.db('zhe800').collection('discountList'), query: {kindId: kindIds[i]}});
            result = result.concat(temp);
        }
        response.send({...responseSuccess(), ...{list: result}});
    } catch (error) {
        response.send({...responseError(), ...{message: error.description}});
    } finally {
        database.close();
    }
});

module.exports = router;

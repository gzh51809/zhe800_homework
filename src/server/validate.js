"use strict";

exports.responseSuccess = function () {
    return {
        code: '0',
        message: 'Success'
    }
};

exports.responseError = function (errorLog) {
    return {
        code: '1',
        message: errorLog || 'error'
    }
};

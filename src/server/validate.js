"use strict";

exports.responseSuccess = function () {
    return {
        code: '0',
        message: 'Success'
    };
};

exports.responseTokenInvalid = function () {
    return {
        code: '2',
        message: 'token invalid'
    };
};

exports.responseError = function (errorLog) {
    return {
        code: '1',
        message: errorLog || 'error'
    };
};

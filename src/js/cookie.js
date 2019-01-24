"use strict";

/**
 * cookie
 * cookie存储增删改
 *
 * getObject        以对象方式返回key和value
 * setObject        以对象方式给cookie设置key和value，在value上可以指定expires时间，时间到对应的key和value会删除
 * deleteObject     以对象方式给cookie删除key和value
 */

export default {
    getObject: function () {
        return document.cookie.split(';').reduce(function (target, string) {
            var key = string.split('=')[0];
            var value = string.split('=')[1];
            if (key && value) {
                target[key.trim()] = decodeURIComponent(value.trim());
            }

            return target;
        }, {});
    },

    setObject: function (value) {
        value = value || {};
        Object.keys(value).forEach(function (key) {
            document.cookie = key + '=' + value[key];
        });
    },

    deleteObject: function (value) {
        value = value || {};
        Object.keys(value).forEach(function (key) {
            document.cookie = key + '=' + value[key] + ';max-age=0';
        });
    }
};

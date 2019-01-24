const mongodb = require('mongodb');
const {mongoDb: {host, port}} = require('./config');

//暴露连接数据库方法
let connect = () => {
    return new Promise((resolve, reject) => {
        mongodb.MongoClient.connect(`mongodb://${host}:${port}`, {useNewUrlParser: true}, (error, database) => {
            if (error) {
                reject(error);
            } else {
                resolve(database);
            }
        });
    });
};

let find = ({collection = {}, query = {}} = {}) => {
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

let deleteOne = ({collection = {}, query = {}} = {}) => {
    return new Promise((resolve, reject) => {
        collection.deleteOne(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

let deleteMany = ({collection = {}, query = {}} = {}) => {
    return new Promise((resolve, reject) => {
        collection.deleteMany(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

let insertOne = ({collection = {}, query = {}} = {}) => {
    return new Promise((resolve, reject) => {
        collection.insertOne(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

let updateOne = ({collection = {}, query = {}, update= {}} = {}) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(query, update, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    connect,
    find,
    deleteOne,
    deleteMany,
    insertOne,
    updateOne
};

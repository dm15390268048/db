var MongoClient = require('mongodb').MongoClient;
var Config = require('./config.js');

class Db {

    static getInstance() {  //单例
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        this.dbClient = '';//放db对象
        this.connect() //初始化连接数据库
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (!this.dbClient) {  //解决数据库多次连接问题
                MongoClient.connect(Config.dbUrl, (err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        this.dbClient = client.db(Config.dbName);
                        resolve(this.dbClient);
                    }
                })
            } else {
                resolve(this.dbClient);
            }
        })
    }

    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(function (db) {
                var result = db.collection(collectionName).find(json);
                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })
            })
        })
    }
    insert() {

    }

}

var myDb = Db.getInstance();
setTimeout(() => {
    console.time('start')
    myDb.find('student', {}).then(function (data) {
        // console.log(data);
        console.timeEnd('start')
    })
}, 100);
// setTimeout(() => {
//     console.time('start1')
//     myDb.find('student', {}).then(function (data) {
//         // console.log(data);
//         console.timeEnd('start1')
//     })
// }, 3000);

var yyDb = Db.getInstance();
setTimeout(() => {
    console.time('start2')
    yyDb.find('student', {}).then(function (data) {
        // console.log(data);
        console.timeEnd('start2')
    })
}, 4000);
setTimeout(() => {
    console.time('start3')
    yyDb.find('student', {}).then(function (data) {
        // console.log(data);
        console.timeEnd('start3')
    })
}, 5000);
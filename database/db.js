var mysql = require('mysql');
//创建connection连接
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: "root",
    password: "123456",
    database: "db_jvt"
});
connection.connect(function (err) {
    if (err) {
        console.log("[query]-:" + err);
        return;
    }
    console.log("[connection connect] succees!!!");
})

//执行SQL语句
connection.query('SELECT * FROM user_info', function (err, rows, fields) {
    if (err) {
        console.log("[query]-:" + err);
        return;
    }
    console.log("[connection query]-:" + JSON.stringify(rows));
})
//添加数据
/*
var insertSql = 'INSERT INTO user_info(ID,CODE,NAME,PASSWORD,EMAIL) VALUES(?,?,?,?,?)';
var insertParm = ["38oo-0000-09sd-s09s", "stacey", "stacey", "stacey", "sracey@163.com"];
connection.query(insertSql, insertParm, function (err, result) {
    if (err) {
        console.log("[insert data]-:" + err);
        return;
    }
    console.log("[insert ID]:" + JSON.stringify(result));
})*/
//关闭数据库
connection.end(function (err) {
    if (err) {
        return;
    }
    console.log("[connection end] succeed!!!");
})

function connectServer() {
    var client = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: "root",
        password: "123456",
        database: "db_jvt"
    })
    return client;
}

function selectFun(client, username, callback) {
    //client为一个mysql连接对象
    client.query('SELECT password FROM user_info where username="' + username + '"', function (err, results, fields) {
        if (err) throw err;
        callback(results);
    });
}

function insertFun(client, username, password, callback) {
    client.query('insert into user_info(id,username,password) value(?,?)', ["nnwejoimmlasd", username, password], function (err, result) {
        if (err) {
            console.log("error:" + err.message);
            return err;
        }
        callback(err);
    });
}

exports.connect = connectServer;
exports.select = selectFun;
exports.insert = insertFun;

var mysql = require('mysql');
var DB_NAME = 'db_jvt';

var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: "root",
    password: "123456"
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

function User(user) {
    this.username = user.username;
    this.userpass = user.password;
};
module.exports = User;

pool.getConnection(function (err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            name: this.username,
            password: this.password
        };
        var insertSql = 'INSERT INTO user_info(ID,CODE,NAME,PASSWORD,EMAIL) VALUES(?,?,?,?,?)';
        var insertUser_Sql = "INSERT INTO user_info(id,name,password) VALUES(123123,stacey1,?,?,sracey1@163.com)";
        console.log("USERINFO:" + user.name + user.password);
        connection.query(insertSql, ["123123", "stacey1", user.name, user.password, "sracey1@163.com"], function (err, result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }
            console.log("invoked[save]");
            callback(err, result);
        });
    };

    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(username, callback) {
        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM user_info WHERE name = ?";
        connection.query(getUserNumByName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }
            connection.release();
            console.log("invoked[getUserNumByName]");
            callback(err, result);
        });
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserByUserName(username, callback) {
        console.log(username);
        var getUserByUserName_Sql = "SELECT * FROM user_info WHERE name = ?";
        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }
            console.log("invoked[getUserByUserName]" + result);
            callback(err, result);
        });
    };

    User.getUserLists = function (callback) {
        var getUserListSql = "SELECT code,name,password,email FROM user_info";
        connection.query(getUserListSql, function (err, result) {
            if (err) {
                console.log("getUserLists Error: " + err.message);
                return;
            }
            console.log("invoked[getUserLists]" + JSON.stringify(result));
            callback(err, result);
        })
    }
});
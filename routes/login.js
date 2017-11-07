var express = require('express'),
    router = express.Router(),
    User = require('../model/User/user'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录';

router.get('/', function (req, res) {
    res.render('login', {title: TITLE_LOGIN});
});

router.post('/', function (req, res) {
    var userName = req.body['username'],
        userPwd = req.body['password'],
        md5 = crypto.createHash('md5');

    User.getUserByUserName(userName, function (err, results) {
        if (results) {
            if (results == '') {
                res.locals.error = '用户不存在';
                console.log("用户不存在！");
                res.render('login', {title: TITLE_LOGIN});
                return;
            }

            if (results[0].name != userName || results[0].PASSWORD != userPwd) {
                res.locals.error = '用户名或密码有误';
                res.render('login', {title: TITLE_LOGIN});
                console.log("login err:" + "用户名或密码有误");
                return;
            } else {
                console.log("user :" + userName + " login succeed!");
                res.redirect('/');
                return;
            }
        }
    });
});

module.exports = router;
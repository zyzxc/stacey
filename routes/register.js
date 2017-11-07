var User = require('../model/User/user');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var TITLE_REG = "用户信息注册";
router.get('/', function (req, res) {
    res.render('register', {title: TITLE_REG});
})
router.post('/', function (req, res) {
    console.log("request param:" + req.body.username);
    var userName = req.body.username;
    var password = req.body.password;
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    var newUser = new User({
        name: userName,
        password: password
    })

    User.getUserByUserName(userName, function (err, result) {
        console.log("getUserByUserName log" + result);
        if (err) {
            res.locals.error = err;
            res.render('reg', {title: TITLE_REG});
            return;
        }
        newUser.save(function (err, result) {
            if (err) {
                res.locals.error = err;
                res.render('reg', {title: TITLE_REG});
                return;
            }
            if (result.insertId > 0) {
                res.redirect('/login');
            }
            else {
                console.log("save result:" + JSON.stringify(result));
                res.redirect('/register')
            }
            res.render('reg', {title: TITLE_REG});
        });
    })
})

module.exports = router;
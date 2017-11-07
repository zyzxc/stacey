var express = require('express'),
    router = express.Router(),
    User = require('../model/User/user');

router.get('/', function (req, res) {
    res.render('index', {title: '主页'});
    User.getUserLists(function (err, result) {
        if (err) {
            return;
        }
        if (result) {
            console.log(users);
            res.render('index', {users: result});
        }
    })
});

module.exports = router;
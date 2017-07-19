/**
 * Created by lincoln on 2017/7/15.
 */
var express = require('express');
var router = express.Router();
var DB = require('../models/db.js');
var db = new DB();
var utility = require('utility');

router.get('/login', function(req, res, next){
    res.render('login', {'Message':'正确','ResultCode':1000,'Data':[]});
});

router.post('/login', function(req, res, next){
    var user = req.body;
    if(user == null)
        return res.render('login',{'ResultCode':1000,'Message':'用户不能为空',Data:[]});
    if(user.username == null || user.username =='')
        return res.render('login',{'ResultCode':1000,'Message':'用户名不能为空',Data:[]});
    if(user.password == null || user.password =='')
        return res.render('login',{'ResultCode':1000,'Message':'密码不能为空',Data:[]});
    var selectSql = 'select * from f_user where username = ? AND' +
        'password = ?';
    var values = [];

    var password = utility.md5(user.password);
    values.push(user.username);
    values.push(password);
    db.findByCondition(selectSql, values, function(result){
        if(result.ResultCode == 1000)
            res.redirect('/api/index');
        else
            res.render('login',{'ResultCode':1005,'Message':'用户名或者密码错误',Data:[]});
    })
});

router.get('/register', function(req, res, next){
    res.render('register',{'Message':'','ResultCode':1000,'Data':[]});

});

router.post('/register', function(req, res, next){
    var user = req.body;
    if(user == null)
        return res.render('login',{'ResultCode':1000,'Message':'用户不能为空',Data:[]});
    if(user.username == null || user.username =='')
        return res.render('login',{'ResultCode':1000,'Message':'用户名不能为空',Data:[]});
    if(user.password == null || user.password =='')
        return res.render('login',{'ResultCode':1000,'Message':'密码不能为空',Data:[]});
    var insertSql = 'insert into f_user values(?,?,?,?)';
    var values = [];
    values.push(user.username);
    db.insert(insertSql,values,function(e){

    })
});
module.exports = router;
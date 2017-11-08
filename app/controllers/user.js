var User = require('../models/user');

//删除用户信息
exports.del = function(req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({_id: id}, function(err,user) {
            if(err){console.log(err)}
            res.json({success: 1})
        })
    }
}
//注册
exports.signup = function(req, res) {
    var _user = req.body.user;
    console.log(_user)
    User.findOne({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user)
        if (user) {
            // res.end('<script>alert("this user has been signed")</script>');
            console.log('用户已存在!')
            // res.send({ifSigned: true})
            res.redirect('/signin')
        } else {
            var user = new User(_user);
            user.save(function(err, user){
                if (err) {
                    console.log(err);
                }
                console.log('注册成功！')
                console.log(user);
                res.redirect('/');
            })
        }
    })
}
exports.list = function(req,res) {
    User.fetch(function(err, users) {
        if (err) { console.log(err);}
        res.render('userlist', {
            title: '用户 列表页',
            movies: users
        })
    })
}
//登录
exports.signin = function(req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function(err, user) {
        if (err) { console.log(err);}
        if (!user) {
            console.log('用户不存在!');
            return res.redirect('/signup');
        }
        user.comparePassword(_user.password, function(err,isMatch) {
            if (err) { console.log(err);}
            if (isMatch) {
                console.log('登陆成功!');
                req.session.user = user;
                return res.redirect('/');
            } else {
                console.log('密码错误!');
                return res.redirect('/');
            }
        })
    })
}
exports.logout = function(req, res) {
    delete req.session.user
    res.redirect('/');
}

exports.signinPage = function(req, res) {
    res.render('signin',{
        title: '登录'
    })
}
exports.signupPage = function(req, res) {
    res.render('signup',{
        title: '注册'
    })
}
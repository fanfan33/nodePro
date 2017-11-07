var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');    //中间件，处理post解析
var mongoose = require('mongoose');
var underscore = require('underscore');     //新对象替换旧对象
var cookieParser = require('cookie-parser');    //cookie-parser
var session = require('express-session');        //cookie-session
var mongoStore = require('connect-mongo')(session);
var favicon = require('serve-favicon');         //favicon

var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;
var app = express();

var dbUrl = 'mongodb://localhost/demodb';
app.locals.moment = require('moment');             //时间插件
mongoose.Promise = global.Promise; 

mongoose.connect(dbUrl,{useMongoClient:true});

app.set('views', './views/pages');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(path.join(__dirname,'favicon.ico')));

//保持用户身份持久操作
app.use(cookieParser());
app.use(session({
    secret: 'fullPro',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

app.use(function(req, res, next) {
    var _user = req.session.user;

    app.locals.user = _user ? _user : '';
    return next();
})

app.set('port', port);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
})
// app.locals.user = '';
app.get('/',function(req,res) {
    console.log('user in session');
    console.log(req.session.user)

    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'full project 首页',
            movies: movies
        })
    })
    
})

app.get('/movie/:id',function(req,res) {
    var id = req.params.id;
    Movie.findById(id,function(err, movie) {
        res.render('detail', {
            title: 'full project 详情页',
            movie: movie
        })
    })
})

app.get('/admin/movie',function(req,res) {
    res.render('admin', {
        title: 'full project 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== '') {
        Movie.findById(id, function(err, movie) {
            _movie = underscore.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) { console.log(err);}
                res.redirect('/movie/'+ movie._id);
            })
        })
    } else {
        _movie = new Movie({
            title: movieObj.title,
            doctor: movieObj.doctor,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary,
            language: movieObj.language
        })
        _movie.save(function(err, movie) {
            if (err) { console.log(err);}
            res.redirect('/movie/'+ movie.id);
        })
    }
})
app.get('/admin/list',function(req,res) {
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err);}
        res.render('list', {
            title: 'full project 列表页',
            movies: movies
        })
    })
})
app.get('/admin/update/:id',function(req,res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie
            })
        })
    }
})
//删除电影记录信息
app.delete('/admin/list', function(req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id},function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
})
//删除用户信息
app.delete('/admin/userDel', function(req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({_id: id}, function(err,user) {
            if(err){console.log(err)}
            res.json({success: 1})
        })
    }
})
//注册
app.post('/user/signup', function(req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user)
        if (user) {
            // res.end('<script>alert("this user has been signed")</script>');
            console.log('用户已存在!')
            res.send({ifSigned: true})
            // return res.redirect('/');
        } else {
            var user = new User(_user);
            user.save(function(err, user){
                if (err) {
                    console.log(err);
                }
                console.log('注册成功！')
                console.log(user);
                res.redirect('/admin/userlist');
            })
        }
    })
})
app.get('/admin/userlist',function(req,res) {
    User.fetch(function(err, users) {
        if (err) { console.log(err);}
        res.render('userlist', {
            title: '用户 列表页',
            movies: users
        })
    })
})
//登录
app.post('/user/signin', function(req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function(err, user) {
        if (err) { console.log(err);}
        if (!user) {
            console.log('用户不存在!');
            return res.redirect('/');
        }
        user.comparePassword(_user.password, function(err,isMatch) {
            if (err) { console.log(err);}
            if (isMatch) {
                console.log('登陆成功!');
                req.session.user = user;
                return res.redirect('/');
            } else {
                console.log('密码错误!');
            }
        })
    })
})
app.get('/logout', function(req, res) {
    delete req.session.user
    app.locals.user = '';

    res.redirect('/');
})
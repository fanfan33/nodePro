var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');    //中间件，处理post解析
var mongoose = require('mongoose');
var underscore = require('underscore');     //新对象替换旧对象

var Movie = require('./models/movie');

var port = process.env.PORT || 3000;
var app = express();

app.locals.moment = require('moment');             //时间插件
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/demodb',{useMongoClient:true});
app.set('views', './views/pages');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.listen(port);
console.log("server start at localhost:"+port);

app.get('/',function(req,res) {
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
    console.log(movieObj);
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


var Movie = require('../models/movie');
var underscore = require('underscore');
var Comment = require('../models/comment');

exports.detail = function(req,res) {
    var id = req.params.id;
    Movie.findById(id,function(err, movie) {
        Comment
        .find({movie: id})
        .populate("from","name")
        .exec(function(err, comments) {
            console.log(comments)
            res.render('detail', {
                title: 'full project 详情页',
                movie: movie,
                comments: comments
            })
        })
    })
}

exports.movieIn = function(req,res) {
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
}
exports.movieNew = function(req, res) {
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
}
exports.list = function(req,res) {
    Movie.fetch(function(err, movies) {
        if (err) { console.log(err);}
        res.render('list', {
            title: 'full project 列表页',
            movies: movies
        })
    })
}
exports.update = function(req,res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie
            })
        })
    }
}
//删除电影记录信息
exports.movieDel = function(req, res) {
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
}
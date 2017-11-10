var Movie = require('../models/movie');
var underscore = require('underscore');
var Comment = require('../models/comment');
var Catetory = require('../models/catetory');

exports.detail = function(req,res) {
    var id = req.params.id;
    console.log(req.params);
    Movie.findById(id,function(err, movie) {
        Comment
        .find({movie: id})
        .populate("from","name")
        .populate("reply.from reply.to", "name")
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
    Catetory.fetch(function(err,catetories) {
        res.render('admin', {
            title: 'full project 后台录入页',
            catetories: catetories,
            movie: {}
        })
    })
}
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            Catetory.find({}, function(err, catetories) {
                res.render('admin',{
                    title: '后台电影更新页',
                    movie: movie,
                    catetories: catetories
                })
            })
        })
    } else {
        
    }

}
exports.movieNew = function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id) {
        Movie.findById(id, function(err, movie) {
            _movie = underscore.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) { console.log(err);}
                res.redirect('/movie/'+ movie._id);
            })
        })
    } else {
        _movie = new Movie(movieObj)
        var catId = _movie.catetory;
        _movie.save(function(err, movie) {
            if (err) { console.log(err);}
            Catetory.findById(catId, function(err, catetory) {
                catetory.movies.push(movie._id);
                catetory.save(function(err, catetory){
                    res.redirect('/movie/'+ movie._id);
                })
            })
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
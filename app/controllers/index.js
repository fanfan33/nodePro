var Movie = require('../models/movie');
var Catetory = require('../models/catetory');
exports.index = function(req, res){
        // console.log('user in session：'+ req.session.user.name ? req.session.user.name : '');
    Catetory
    .find({})
    .populate({path: 'movies',limit: 5})
    .exec(function(err, catetories){
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'full project 首页',
            catetories: catetories
        })
    })
}

exports.results = function(req, res) {
    var catId = req.query.cat_id;
    var page = parseInt(req.query.page) || 0;
    var count = 2;
    var index = page * count;
    var content = req.query.content;

    if (!catId) {
        // 搜索
        Movie
        .find({title: new RegExp(content +'.*','i') })
        .exec(function(err,movies) {
            var movieLen = movies.length;
            var movieShow = movies.slice(index, index + count);
            res.render('results',{
                title: '搜索页',
                countPage: Math.ceil(movieLen/count),
                keyWord: content,
                query: 'content='+content,
                movieToshow: movieShow,
                currentPage: page 
            })
        })
    } else {
        Catetory
        .find({_id: catId})
        .populate({
            path: 'movies',
            select: 'title poster'
        })
        .exec(function(err,catetories) {
            var _movies = catetories[0].movies
            var len = _movies.length;
            var countPage = Math.ceil(len/count);
            var movieShow = _movies.slice(index, index + count);
            console.log(len)
    
            res.render('results',{
                title: '分类结果列表页',
                keyWord: catetories[0].name,
                countPage: countPage,
                query: 'cat_id='+catId,
                movieToshow: movieShow,
                currentPage: page 
            })
        })
    }
}
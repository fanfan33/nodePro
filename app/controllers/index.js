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
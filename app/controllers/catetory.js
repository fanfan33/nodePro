var Catetory = require('../models/catetory');

exports.new = function(req, res) {
    res.render('catetory_admin',{
        title: '电影分类录入页',
        catetory: {}
    })
}
exports.save = function(req, res) {
    var _catetory = req.body.catetory;
    console.log('------------------'+_catetory)
    var catetory = new Catetory(_catetory);
    catetory.save(function(err, catetory) {
        if(err){console.log(err)};

        res.redirect('/admin/catetory/list')
    })
}
exports.list = function(req, res){
    Catetory.fetch(function(err, catetories) {
        res.render('catetory_list',{
            title: '分类列表页',
            catetories: catetories
        })
    })
}
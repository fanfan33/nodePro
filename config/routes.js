var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Catetory = require('../app/controllers/catetory');
var multer = require('multer');
var upload = multer({dest: '../public/upload'})

module.exports = function(app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        return next();
    })

    app.get('/', Index.index)

    app.get('/results', Index.results)
    
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie/new', Index.signInRequired, Index.adminRequired, Movie.movieIn)
    app.post('/admin/movie/new',upload.single('fileUpload'), Movie.fileUpload, Movie.movieNew)
    app.get('/admin/movie/list', Index.signInRequired, Index.adminRequired, Movie.list)
    app.get('/admin/movie/update/:id', Movie.update)
    app.delete('/admin/movie/list', Movie.movieDel)

    app.get('/admin/catetory/new', Catetory.new)
    app.post('/admin/catetory', Catetory.save)
    app.get('/admin/catetory/list', Catetory.list)
    app.delete('/admin/catetory/del', Catetory.catetoryDel)


    //删除用户信息
    app.delete('/user/del', User.del)
    app.post('/user/signup',User.signup)
    app.get('/user/list', Index.signInRequired, Index.adminRequired, User.list)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/signin', User.signinPage)
    app.get('/signup', User.signupPage)

    app.post('/user/comment', Comment.save);
}
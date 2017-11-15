var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Catetory = require('../app/controllers/catetory');

module.exports = function(app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        return next();
    })

    app.get('/', Index.index)

    app.get('/results', Index.results)
    
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie/new', Movie.movieIn)
    app.post('/admin/movie/new', Movie.movieNew)
    app.get('/admin/movie/list', Movie.list)
    app.get('/admin/movie/update/:id', Movie.update)
    app.delete('/admin/movie/list', Movie.list)

    app.get('/admin/catetory/new', Catetory.new)
    app.post('/admin/catetory', Catetory.save)
    app.get('/admin/catetory/list', Catetory.list)


    //删除用户信息
    app.delete('/user/del', User.del)
    app.post('/user/signup',User.signup)
    app.get('/user/list', User.list)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/signin', User.signinPage)
    app.get('/signup', User.signupPage)

    app.post('/user/comment', Comment.save);
}
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');    //中间件，处理post解析
var mongoose = require('mongoose');
var multer = require('multer');

var cookieParser = require('cookie-parser');    //cookie-parser
var session = require('express-session');        //cookie-session
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');             //日志处理
var favicon = require('serve-favicon');         //favicon


var port = process.env.PORT || 3000;
var app = express();

var dbUrl = 'mongodb://localhost/demodb';
app.locals.moment = require('moment');             //时间插件
mongoose.Promise = global.Promise; 

mongoose.connect(dbUrl,{useMongoClient:true});

app.set('views', './app/views/pages');
app.set('view engine', 'ejs');
app.set('env', 'development');

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


console.log(app.get('env'));
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', false);
}

require('./config/routes')(app);

app.set('port', port);
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
})
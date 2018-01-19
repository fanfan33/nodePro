var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');    //处理post解析
var mongoose = require('mongoose');
var multer = require('multer');             //处理multipart/form-data类型的表单数据

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

app.set('views', './app/views/pages');
app.set('view engine', 'ejs');
// app.set('env', 'development');

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
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
    app.locals.pretty = true;
    mongoose.set('debug', false);
}

require('./config/routes')(app);

app.set('port', port);
mongoose.connect(dbUrl,{useMongoClient:true}, (err)=> {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        var server = app.listen(app.get('port'), ()=> {
            console.log('Express server listening on port ' + server.address().port);
        })
    }
    
});

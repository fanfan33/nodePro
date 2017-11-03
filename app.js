var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);
console.log("server start at localhost:3000");

app.get('/',function(req,res) {
    res.render('index', {
        title: 'full project 首页',
        movies: [{
            title: '机械战警',
            _id: 1,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        },{
            title: '机械战警',
            _id: 2,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        },{
            title: '机械战警',
            _id: 3,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        },{
            title: '机械战警',
            _id: 4,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        },{
            title: '机械战警',
            _id: 5,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        },{
            title: '机械战警',
            _id: 6,
            poster: 'http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png'
        }]
    })
})

app.get('/movie/:id',function(req,res) {
    res.render('detail', {
        title: 'full project 详情页',
        movie: {
            title: '机械战警',
            doctor: '何塞.帕德里亚',
            country: '美国',
            year: 2014,
            language: 'english',
            poster: 'http://image.yingccn.com/image/59f2ae1dd6c9b651421ac3d5.png',
            flash: 'http://player.youku.com/player.php/sid/XMjgzNzg2MzMyOA==/v.swf',
            summary: '这里是电影详情描述 啦啊啊啊啊啊啊啊啊啊这里是电影详情描述 啦啊啊啊啊啊啊啊啊啊这里是电影详情描述 啦啊啊啊啊啊啊啊啊啊这里是电影详情描述 啦啊啊啊啊啊啊啊啊啊这里是电影详情描述 啦啊啊啊啊啊啊啊啊啊'
        }
    })
})

app.get('/admin/movie',function(req,res) {
    res.render('admin', {
        title: 'full project 后台录入页'
    })
})

app.get('/admin/list',function(req,res) {
    res.render('list', {
        title: 'full project 列表页',
        movies: [{
            title: '机械战警',
            _id: 1,
            doctor: '何塞.帕德里亚',
            country: '美国',
            year: 2014,
            language: 'english',
            flash: 'http://image.yingccn.com/image/59f2ae1dd6c9b651421ac3d5.png'
        }]
    })
})


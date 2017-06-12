var express = require('express');
var app = express();

// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 2048);

// app.get('/', function(req, res) {
//     res.sendfile('./public/2048.html');
// });

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
    res.sendfile('./public/2048.html');
});

app.listen(app.get('port'));


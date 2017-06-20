var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session'); //add
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./public'));

var user_manager = require('./routes/user_manager');

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.post('/login', function(req, res) {
    if( req.body.type === "login" ){
        user_manager.login(req.body.username,req.body.password,function(msg){
            res.send(msg);
        });
    }
    // user_manager.closeDB();
});

app.post('/setBestScore', function(req, res) {
    if( req.body.type === "setBestScore" ){
        console.log("App setBestScoring~~~~~~");
        user_manager.setBestScore(req.body.username,req.body.score,function(msg){
            res.send(msg);
        });
    }
});

app.post('/register', function(req, res) {
    if( req.body.type === "register" ){
        user_manager.register(req.body.username, req.body.password, function(msg){
            res.send(msg);
        });
    }
    // user_manager.closeDB();
});

app.post('/rank', function(req, res) {
    if( req.body.type === "getRank" ){
        user_manager.getRank(req.body.username, function(msg){
            res.send(msg);
        });
    }
    // else
    //     res.sendfile('rank.html');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.post('/user',function(req,res){
//     if(req.body.type==="login"){
//         user.login(req.body.username,req.body.password,function(msg){
//             res.send(msg);
//         });
//     }
//     else if(req.body.type==="register"){
//         user.register(req.body.username, req.body.password,function(msg){
//             res.send(msg);
//         });
//     }
// });

app.listen(2048, function () {
    console.log(' Running , listening on port 2048!');
});


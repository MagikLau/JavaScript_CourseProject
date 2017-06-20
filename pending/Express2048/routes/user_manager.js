var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306 ,
    user     : 'root',
    password : '12qwas',
    database : 'DBtest'
});

connection.connect();

var loginUser = { userid: null, username: null, score: 0 };
var loginInfo = { loginUser: loginUser, loginState: false };

var login = function( username, password, fn ){
    var sql = 'SELECT userid, username, password, score FROM jsuser WHERE username = ? ';
    var  sqlParams = [ username ];
    connection.query(sql,sqlParams,function (err, result) {
        if(err){
            console.log('[Login ERROR] - ',err.message);
            return;
        }
        console.log('-----------------------------Login-------------------------------');
        // console.log('result:',result);
        if( result.length === 0 ){ //结果为空
            console.log('没有此账户！');
            return ;
        }
        if( password !== result[0].password ){
            console.log('密码错误！');
            return;
        }
        console.log('登陆成功！正在获取当前用户信息……');
        loginUser.userid = result[0].userid;
        loginUser.username = result[0].username;
        loginUser.score = result[0].score;
        console.log('当前用户'+loginUser.username+', 分数：'+loginUser.score);
        loginInfo.loginState = true;
        loginInfo.loginUser = loginUser;
        console.log('-------------------------Send to Client-----------------------------\n');
        fn( {   result:"true",
                username: loginUser.username,
                score: loginUser.score});

    });
};

exports.login = login;

var setBestScore = function ( username, score, fn ){
    var sql = 'UPDATE jsuser SET score = ? WHERE username = ? ';
    var  sqlParams = [ score, username ];
    console.log('-------------------------Execute SQL-------------------------------');
    connection.query(sql,sqlParams,function (err, result) {
        if(err){
            console.log('[setBestScore ERROR] - ',err.message);
            return;
        }
        console.log('-------------------------setBestScore-------------------------------'+score);
        loginInfo.loginUser.score = score;
        console.log('-------------------------Send to Client-----------------------------\n');
        if(result.length===0) {
            fn({result:"false"});
        }else fn( {   result:"true",
            username: loginUser.username,
            score: loginUser.score});
    });

};
exports.setBestScore = setBestScore;


var closeDB = function () {
    connection.end();
};

exports.closeDB = closeDB;

/*
var user = {
    login: {
        load:function(){
            $("#txtPwd").keypress(function(){
                if(event.which === 13){
                    $("#loginSubmitBtn").click();
                }
            });
            $("#loginSubmitBtn").click(function(){
                user.login.next();
            });
        },
        next:function(){
            var username = $("#txtName").val();
            var password = $("#txtPwd").val();
            if(username.length === 0){
                dialog.load("User ID can not be empty.",1,null);
            }
            else if(password.length === 0){
                dialog.load("Password can not be empty.",1,null);
            }
            else {
                $.ajax({
                    type: "post",
                    url: "user",
                    dataType: "JSON",
                    data: "type=login&username="+username+"&password="+password,
                    success: function(data){
                        if(data.result === "true"){
                            sessionStorage.username = username;
                            sessionStorage.password = data.password;
                            sessionStorage.Score    = data.Score;
                            user.login.ok();
                        }
                        else {
                            dialog.load("用户名或密码错误！", 1, null);
                        }
                    }
                });
            }
        },
        ok:function(){
            // runGame(data_maps, DOMDisplay);
            $("#LoginBox").remove();
            // userInfo.load();
            // gameTop.load();
            // helper.load();
        }
    },
    register: {
        load: function(){
            $("#RegistCheckPwd").keypress(function(){
                if(event.which === 13){
                    $("#RegistSubmitBtn").click();
                }
            });
            $("#RegistSubmitBtn").click(function(){
                if($(".dialog").length === 0)
                    user.register.next();
            });
        },
        next: function(){
            var username = $("#RegistName").val();
            var password = $("#RegistPwd").val();
            var cPassword = $("#RegistCheckPwd").val();
            if(username.length === 0){
                dialog.load("Username can not be empty.",1,null);
            }
            else if(password.length === 0){
                dialog.load("Password can not be empty.",1,null);
            }
            else if(password !== cPassword){
                dialog.load("Two password inputs are different.",1,null);
            }
            else {
                $.ajax({
                    type: "post",
                    url: "user",
                    dataType: "JSON",
                    data: "type=register&username="+username+"&nickname="+nickname+"&password="+password,
                    success: function(data){
                        if(data.result === "true"){
                            sessionStorage.username = username;
                            user.register.ok();
                        }
                        else if(data.result === "false") {
                            dialog.load("用户名已存在.", 1, null);
                        }
                    }
                });
            }
        },
        ok: function(){
            // runGame(data_maps, DOMDisplay);
            $("#RegistBox").remove();
            // userInfo.load();
            // gameTop.load();
            // helper.load();
        }
    }
};

//提示框

var dialog = {
    load: function(content,type,fn){
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var html = "";
        var source;
        switch(type){
            case 1:{
                html=document.getElementById("page_dialog_1").innerHTML;
                source = html.replace(reg, function (node, key) { return {"content":content}[key]; });
                $("body").append(source);
                break;
            }
            case 2:{
                html=document.getElementById("page_dialog_2").innerHTML;
                source = html.replace(reg, function (node, key) { return {"title":content}[key]; });
                $("body").append(source);
                $(".dialog_input div .cancel").click(function(){
                    $("#dialog_page").click();
                });
                $(".dialog_input div .ok").click(function(){
                    fn($(".dialog_input input").val());
                });
                break;
            }
        }
        $("#dialog_page").click(function(){
            $("#dialog_page").remove();
        });
        $("#dialog_page").children("div").click(function(){
            event.stopPropagation();
        });
    }
};
*/


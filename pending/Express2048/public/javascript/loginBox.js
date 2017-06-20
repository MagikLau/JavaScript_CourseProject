var loginUser = { userid: null, username: null, score: 0 };
var loginInfo = { loginUser: null, loginState: false };

var switchButton =  function () {
    // console.log("switchButton-------"+loginInfo.loginUser);
    if( loginInfo.loginState === false || loginInfo.loginUser === null ){
        //根据是否已登陆来设置默认隐藏
        console.log("switchButton-------"+loginInfo.loginState);
        $("#logoutbtn").text("Log out.").hide();
        $("#loginbtn").show();
        $("#registerbtn").show();
    }else{
        console.log("switchButton-------"+loginInfo.loginUser.username);
        $("#logoutbtn").text("User "+loginUser.username+" . Log out.").show();
        $("#loginbtn").hide();
        $("#registerbtn").hide();
    }
    $("#LoginBox").fadeOut("fast");
    $("#RegisterBox").fadeOut("fast");
    $("#mask").css({ display: 'none' });
};

var setServerBestScore = function ( username, score ) {
    console.log("setBestScore-------"+username);
    $.ajax({
        type: "post",
        url: "setBestScore",
        dataType: "JSON",
        data: "type=setBestScore&username="+username+"&score="+score,
        success: function(data){
            if(data.result === "true"){
                console.log(username+" setBestScore success.");
            }
            else {
                alert("Modify failed. Please try it later!");
            }
        }
    });

};

var updateBestScore = function () {
    console.log("updateBestScore-------"+loginInfo.loginUser.username);

    if( window.localStorage.getItem("bestScore") > loginInfo.loginUser.score ){
        loginUser.score = window.localStorage.getItem("bestScore");
    }else{
        window.localStorage.setItem("bestScore",loginInfo.loginUser.score);
    }
    setServerBestScore(loginUser.username, loginInfo.loginUser.score);
};

$(function ($) {
    switchButton();
    //弹出Login
    $("#loginbtn").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.6'
        }, 1000);
    }).on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
        $("#LoginBox").fadeIn("slow");
    });
    //按钮的透明度
    $("#registerbtn").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.8'
        }, 1000);
    }).on('click', function () {
        $("body").append("<div id='mask'></div>");
        $("#mask").addClass("mask").fadeIn("slow");
        $("#RegisterBox").fadeIn("slow");
    });
    $("#loginSubmitBtn").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.8'
        }, 1000);
    }).on('click', function () {
        var username = $("#txtName").val();
        var password = $("#txtPwd").val();

        //向服务器发起登陆请求
        $.ajax({
            type: "post",
            url: "login",
            dataType: "JSON",
            data: "type=login&username="+username+"&password="+password,
            success: function(data){
                if(data.result === "true"){
                    loginUser.username = data.username;
                    // loginUser.userid = data.userid;
                    loginUser.score = data.score;
                    loginInfo.loginUser = loginUser;
                    loginInfo.loginState = true;

                    alert("User: "+loginInfo.loginUser.username+", welcome back.\nYour best score in server is "+loginUser.score+"\nNow update your local score to server...");
                    $("#logoutbtn").text("User "+loginInfo.loginUser.username+" . Log out.");
                    sessionStorage.setItem("username",loginUser.username);

                    $(".best-container").text(loginUser.score);
                    console.log("After login switchButton-------"+loginInfo.loginUser.username);
                    switchButton();
                    $("#txtPwd").val("");
                    updateBestScore();
                }
                else {
                    alert("Login failed. Please check your username, password and try again!");
                }
            }
        });


    });
    $("#RegisterSubmitBtn").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.8'
        }, 1000);
    }).on('click', function () {
        var username = $("#RegisterName").val();
        var password = $("#RegisterPwd").val();
        var checkPwd = $("#RegisterCheckPwd").val();
        if( password !== checkPwd ){
            alert("两次输入的密码不同！请重新输入 "+password+" "+checkPwd);
            $("#RegisterPwd").val("");
            $("#RegisterCheckPwd").val("");
            return;
        }
        //向服务器发起注册请求
        $.ajax({
            type: "post",
            url: "register",
            dataType: "JSON",
            data: "type=register&username="+username+"&password="+password,
            success: function(data){
                if(data.result === "true"){
                    alert("Register success. Please login.");
                    switchButton();
                    $("#RegisterName").val("");
                    $("#RegisterPwd").val("");
                    $("#RegisterCheckPwd").val("");
                }
                else {
                    alert("Register failed. Please check your input and try again!");
                }
            }
        });
    });
    $("#logoutbtn").hover(function () {
        $(this).stop().animate({
            opacity: '1'
        }, 600);
    }, function () {
        $(this).stop().animate({
            opacity: '0.8'
        }, 1000);
    }).on('click', function () {
        loginInfo.loginUser = null;
        switchButton();
        alert("User "+loginUser.username+" Log out. Good bye~");
        window.localStorage.setItem("bestScore",0);
        sessionStorage.setItem("user",null);
        $(".restart-button")[0].click();
    });
    //关闭
    $(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
        $("#LoginBox").fadeOut("fast");
        $("#RegisterBox").fadeOut("fast");
        $("#mask").css({ display: 'none' });
    });
});

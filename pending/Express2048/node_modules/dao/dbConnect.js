var mysql=require('mysql');

function connectServer(){

    var client=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'12qwas',
        database:'dbTest'
    })

    return client;
}


function  selectFun(client, username, callback){
    //client为一个mysql连接对象
    client.query('select password from jsuser where username="'+username+'"',function(err,results,fields){
        if(err) throw err;

        callback(results);
    });
}

function insertFun(client , username, password, callback){
    client.query('insert into jsuser(username,password) value(?,?)', [username, password], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
          callback(err);
    });
}

function updateScore(client , username, score, callback){
	client.query('update jsuser set score = ? where username = ?', [score, username], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
          callback(err);
    });
}

exports.connect = connectServer;
exports.selectFun  = selectFun;
exports.insertFun = insertFun;
exports.updateScore = updateScore;
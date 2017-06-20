var getRank = function (username) {
    //向服务器发起查询请求
    $.ajax({
        type: "post",
        url: "rank",
        dataType: "JSON",
        data: "type=getRank",
        success: function(data){
            if(data.result === "true"){
                // alert("Rank got.");
                var ranks = JSON.parse(data.ranks);
                var boxes = $(".box");
                var colnames = $(".col_3");
                var colscores= $(".col_4");
                var ranknum = 0;
                var score = 0;
                for( var i = 0 ; i < ranks.length ; i++ ){
                    console.log(ranks[i].username+": "+ranks[i].score);
                    if( i < 5 ){
                        colnames[i].textContent = ranks[i].username;
                        colscores[i].textContent = ranks[i].score;
                        if( username === ranks[i].username ){
                            boxes[i].setAttribute("class", boxes[i].getAttribute("class")+" cur" );
                            ranknum = i+1;
                            score = ranks[i].score;
                        }
                    }else{
                        if( username === ranks[i].username ){
                            ranknum = i+1;
                            score = ranks[i].score;
                        }
                    }

                }
                if( ranknum !== 0 ){
                    $("#currentUser")[0].textContent = ranknum;
                    colnames[5].textContent = username;
                    colscores[5].textContent = score;
                    $("#ranking_title")[0].textContent = "Rank："+ranknum;
                }else{
                    console.log("ranknum: "+ranknum);
                }

            }
            else {
                alert("Can not get rank yet, please try again!");
            }
        }
    });
};
$(function() {
var text=$(".right a").html();
var title=$("#title").html();
if(text=="录/注册"){
  $(".un_login").show();
}else{
  $(".on_login").show();
}




$(".thumbs_up").click(function(){
  if(text=="登录/注册"){
      alert("请登录");
  }else{
    // 点赞

    var num=$("#num").html()+1;
    text=$(".user_box a").html();
    $(".thumbs_up").click(function() {

                //用ajax提交
                    $.ajax({
                        type: 'POST',
                        url: "{:url('login/checkLogin')}",
                        data: {"username":text,"num":1,"title":title},
                        dataType: 'json',
                        success: function(data){
                            if(data.status==1){
                              $(".thumbs img").attr("src","images/nice_on.png");
                                alert(data.message);
                                $("#num").html(num);
                                // window.location.href = "{:url('index/index')}";
                            }else{
                                alert(data.message);
                            }
                        }
                    });

            });
          }
      });

      function timestampToTime(timestamp) {
              var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
              Y = date.getFullYear() + '-';
              M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              D = date.getDate() + ' ';
              h = date.getHours() + ':';
              m = date.getMinutes() + ':';
              s = date.getSeconds();
              return Y+M+D+h+m+s;
          }

      $("#tijiao").click(function(){
        if(text=="登录/注册"){
            alert("请登录");
        }else{
          var comment=$("#comment").html();
          $(".thumbs_up").click(function() {
                      //用ajax提交
                    if(!comment){
                      alert("请输入内容");
                    }else{


                          $.ajax({
                              type: 'POST',
                              url: "{:url('login/checkLogin')}",
                              data: {"comment":comment,"title":title},
                              dataType: 'json',
                              success: function(data){
                                  if(data.status==1){
                                    alert(date.message);
                                    var comment_length=$(".comment_content").length;
                                    var comment_all=comment_length+"条评论";
                                    $("comment_num").html(comment_all);
                                    var time=timestampToTime(data.time);

                                  var div_box="<div class='comment_content'><h3>"+username +"</h3><p>"+comment+"</p><h5>"+time+"</5></div>";
                                    $(".comment_content_box").prepend(div_box);


                                  }else{
                                      alert(data.message);
                                  }
                              }
                          });
                        }
                      });
                }
            });









  // 排行榜切换
  $(".head_left").click(function() {
    $(".charts_content_1").css("display", "block");
    $(".charts_content_2").css("display", "none");
  });
  $(".head_right").click(function() {
    $(".charts_content_2").css("display", "block");
    $(".charts_content_1").css("display", "none");
  });


});

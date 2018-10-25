$(window).bind("scroll", function() {
  var top = $(this).scrollTop(); //当前窗口的滚动距离,即滚轮位置
  //所在盒子的位置-盒子的高度
  var bg_top = $(".bg_under_box").offset().top - $(".bg_under_box").height();
  if (top > bg_top) {
    $(".bg_under_1").animate({
      left: "0"
    }, 1000);
    $(".bg_under_2").animate({
      left: "50%"
    }, 1000);
  }
  var width = $("html").width();
  $(window).resize(function() {
    width = $("html").width();
    if(width<800){
      $(".three").children().css(
        "left", "5%");
    }

  });
  if (width>=800) {
    var three_top = $(".three").offset().top - $(".three").height();
    if (top > three_top) {
      $(".three").children().animate({
        left: "0",
        top: "10px"
      }, 800);
    }

  }
});



// 推荐景点
$(function(){

var i=0;
var arr=[];
arr[0]="recommend_1.png";
arr[1]="recommend_2.jpg";
arr[2]="recommend_3.jpg";

var test=function(){
  i++;
  if(i==3){i=0;}

  $(".feature_content_pic").find("img").attr("src","images/"+arr[i]);


};
setInterval(test,3000);
});

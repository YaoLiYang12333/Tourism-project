$(function(){
  var a=1;
var b=1;
var c=1;
  function changRed(){
    if(a==1){
      $(".chang_width_red").stop(true,false).animate({width:"90%"},1000);
      a=0;
    }
    else if(a==0){
      $(".chang_width_red").stop(true,false).animate({width:"60%"},1000);
      a=1;
    }
  }
setInterval(changRed,1000);
function changYellow(){
  if(b==1){
    $(".chang_width_yellow").stop(true,false).animate({width:"100%"},1000);
    b=0;
  }
  else if(b==0){
    $(".chang_width_yellow").stop(true,false).animate({width:"40%"},1000);
    b=1;
  }
}
setInterval(changYellow,1000);
function changBlue(){
  if(c==1){
    $(".chang_width_blue").stop(true,false).animate({width:"50%"},1000);
    c=0;
  }
  else if(c==0){
    $(".chang_width_blue").stop(true,false).animate({width:"80%"},1000);
    c=1;
  }
}
setInterval(changBlue,1000);

});

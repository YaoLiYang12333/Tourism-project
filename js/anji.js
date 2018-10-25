$(function(){
  $(".list").hover(function(){
    $(this).find("ul").stop(true,false).slideDown();
  },function(){
    $(this).find("ul").stop(true,false).slideUp();
  });
});


$(function(){
  var httpRequest=new XMLHttpRequest();
  var login_button_1=document.getElementById('login_1');
  login_button_1.onclick=handleButtonPress;
  function handleButtonPress(e){
    e.preventDefault();
    var form1=document.getElementsByClassName('login_content_1')[0];
    var formData1={};
    var inputElements=form1.getElementsByTagName('input');
    for(var i=0;i<inputElements.length;i++){
      formData1[inputElements[i].name]=inputElements[i].value;
    }
    var text1=inputElements[2].value.toLowerCase();
    var text2=text.toLowerCase();
    if(text1==text2){
      handleResponse();
        httpRequest.open('post','login.php','true');
        httpRequest.setRequestHeader("Content-Type","application/json");
        httpRequest.send(JSON.stringify(formData1));
      }
      else{
        alert("验证码输入错误");
      }
    }
  function handleResponse(){
    var text={"status":1,"message":"ssss","str":[]};
    if(httpRequest.readyState==4&&httpRequest.status==200){
        document.getElementById('result').innerHTML=httpRequest.responseText;
      }
    }
    login_button_1.onclick=handleButtonPress;
  });


$(function() {
  // 用户名验证
  var num = 0;
  var register = [];
  var user = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
  $("input[name='username_2']").blur(function() {
    if (!$("input[name='username_2']").val()) {
      $(this).next().html("请输入6-18位的数字和字母");
      register[0] = 0;
    } else if (!user.test($("input[name='username_2']").val())) {
      $(this).next().html("用户名格式有误");
      register[0] = 0;
      // return  register[0];
    } else {
      // 验证用户名是否存在
      $(this).next().html("该用户名可用");
      register[0] = 1;
      // return  register[0];
    }
  });
  // 密码验证
  var psd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
  $("input[name='password_2']").blur(function() {
    if (!$("input[name='password_2']").val()) {
      $(this).next().html("请输入8-18位的数字和字母");
      register[1] = 0;
    } else if (!psd.test($("input[name='password_2']").val())) {
      $(this).next().html("密码格式有误");
      register[1] = 0;
    } else {
      $(this).next().html("该密码可用");
      register[1] = 1;
    }
  });
  // 再次密码验证
  $("input[name='password_3']").blur(function() {
    if (!$("input[name='password_3']").val()) {
      $(this).next().html("请输入相同的密码");
      register[2] = 0;
    } else if ($("input[name='password_3']").val() != $("input[name='password_2']").val()) {
      $(this).next().html("密码不一致");
      register[2] = 0;
    } else {
      $(this).next().html("密码一致");
      register[2] = 1;
    }
  });
  // 邮箱验证
  var email = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
  $("input[name='email']").blur(function() {
    if (!$("input[name='email']").val()) {
      $(this).next().html("请输入邮箱地址");
      register[3] = 0;
    } else if (!email.test($("input[name='email']").val())) {
      $(this).next().html("邮箱格式有误");
      register[3] = 0;
    } else {

      $(this).next().html("该邮箱可用");
      register[3] = 1;
    }
  });
  // 手机验证
  var tel = /^[1][3,4,5,7,8][0-9]{9}$/;
  $("input[name='telephone']").blur(function() {
    if (!$("input[name='telephone']").val()) {
      $(this).next().html("请输入手机号码");
      register[4] = 0;
    } else if (!tel.test($("input[name='telephone']").val())) {
      $(this).next().html("手机号格式有误");
      register[4] = 0;
    } else {
      $(this).next().html("该手机号可用");
      register[4] = 1;
    }
  });
  document.getElementById('login_2').onclick = function(e) {

    for (var i = 0; i < 5; i++) {
      if (register[i] == 1) {
        num++;
      }

    }
    console.log(num);
    if (num != 5) {
      e.preventDefault();
    } else {
      // window.location.href(anji.html);
      e.preventDefault();
      var httpRequest = new XMLHttpRequest();
      var login_button_2 = document.getElementById('login_2');
      handleButtonPress();
    }
    num = 0;
  };

  function handleButtonPress(e) {
    var httpRequest1 = new XMLHttpRequest();
    var form2 = document.getElementsByClassName('login_content_2')[0];
    var formData2 = {};
    var inputElements = form2.getElementsByTagName('input');
    for (var i = 0; i < inputElements.length; i++) {
      formData2[inputElements[i].name] = inputElements[i].value;
    }
    console.log(formData2);
    httpRequest1.open('post', 'login.php', 'true');
    httpRequest1.setRequestHeader("Content-Type", "application/json");
    httpRequest1.send(JSON.stringify(formData2));
  }
});


// 生成验证码
    $(function(){
      /**生成一个随机数**/
     function randomNum(min,max){
       return Math.floor( Math.random()*(max-min)+min);
     }
      /**生成一个随机色**/
      function randomColor(min,max){
        var r = randomNum(min,max);
        var g = randomNum(min,max);
        var b = randomNum(min,max);
        return "rgb("+r+","+g+","+b+")";
      }
      drawPic();
      $("canvas").click(function(e){
        e.preventDefault();
        drawPic();
        randomNum();
        randomColor();
      });
      $(".code_move").click(function(e){
        e.preventDefault();
        drawPic();
        randomNum();
        randomColor();
      });

      /**绘制验证码图片**/
      function drawPic(){
        var canvas=document.getElementById("canvas");
        var width=canvas.width;
        var height=canvas.height;
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'bottom';

        /**绘制背景色**/
        ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
        ctx.fillRect(0,0,width,height);
        /**绘制文字**/
        var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
        text="";
        for(var i=0; i<4; i++){
          var txt = str[randomNum(0,str.length)];
          text+=txt;//验证码的值
          ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
          ctx.font = randomNum(25,40)+'px SimHei'; //随机生成字体大小
          var x = 10+i*25;
          var y = randomNum(25,45);
          var deg = randomNum(-45, 45);
          //修改坐标原点和旋转角度
          ctx.translate(x,y);
          ctx.rotate(deg*Math.PI/180);
          ctx.fillText(txt, 0,0);
          //恢复坐标原点和旋转角度
          ctx.rotate(-deg*Math.PI/180);
          ctx.translate(-x,-y);

        }

        /**绘制干扰线**/
        for(var a=0; a<3; a++){
          ctx.strokeStyle = randomColor(40,180);
          ctx.beginPath();
          ctx.moveTo( randomNum(0,width), randomNum(0,height) );
          ctx.lineTo( randomNum(0,width), randomNum(0,height) );
          ctx.stroke();
        }
        /**绘制干扰点**/
        for(var j=0;j<20;j++){
          ctx.fillStyle = randomColor(0,255);
          ctx.beginPath();
          ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
          ctx.fill();
        }

     }

    });


// 轮播图
$(function(){
  var index=0;
  var pic=$('.pic>img');
  var text=$('.content');
  pic.eq(0).fadeIn();
  pic.eq(0).animate({width:"120%",height:"120%",top:'-10%',left:'-10%'},5000);
  pic.eq(0).siblings().css({width:"140%",height:"140%",top:'-20%',left:'-20%'},1000);
  pic.eq(0).fadeOut();
  var transform=function(){
      if(index==3){
        index=0;
      }else{
        index++;
      }
      pic.eq(index).fadeIn(2000);
      pic.eq(index).animate({width:"120%",height:"120%",top:'-10%',left:'-10%'},5000);
      pic.eq(index).siblings().css({width:"140%",height:"140%",top:'-20%',left:'-20%'},1000);
      pic.eq(index).fadeOut();
      setTimeout(transform,5000);
    };
    setTimeout(transform,5000);
});
// 按钮
$(function(){
  var log1=$(".login_content_1");
  var log2=$(".login_content_2");
  $("#login").click(function(){
    log1.css("display","block").siblings().css("display","none");
    $("#login").css({borderBottomWidth:'4px',borderBottomStyle:'solid',borderBottomColor:'rgb(252, 151, 0)'}).siblings().css("border","none");
  });
  $("#register").click(function(){
    log2.css("display","block").siblings().css("display","none");
    $("#register").css({borderBottomWidth:'4px',borderBottomStyle:'solid',borderBottomColor:'rgb(252, 151, 0)'}).siblings().css("border","none");
  });
});

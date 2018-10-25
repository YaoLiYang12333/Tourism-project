var httpRequest;

function handleButtonPress(e) {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handleResponse;
  httpRequest.open("GET", "http://restapi.amap.com/v3/weather/weatherInfo?key=90ffd09913d1b47d05b3b51fe56bd7f3&city=%E6%B7%B3%E5%AE%89");
  httpRequest.send();
}

function handleResponse() {
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    var jsontext = httpRequest.responseText;
    var contact = JSON.parse(jsontext);
    document.getElementById('weather').innerHTML = contact.lives[0].weather;
    document.getElementById('temperature').innerHTML = contact.lives[0].temperature + "°C";
    document.getElementById('city').innerHTML = contact.lives[0].city;
  }
}
handleButtonPress();


// 退出
$(function() {
  $(".user_box").hover(function() {
    $(this).find("ul").slideDown(200);
  }, function() {
    $(this).find("ul").slideUp(200);
  });
});


//图片展示
$(function() {
  var height = $(".pic").height();
  $(window).resize(function() {
    height = $(".pic").height();
  });
  $(".pic_content ul").height(height);
  for (var t = 0; t < 5; t++) {
    $(".pic_content").find("img").eq(t).height(height);
  }
  pic_content = $(".pic_content");
  Width = $(".pic").width();
  $(".pic_content img").width(Width);
  pictureWidth = $(".pic_content img").width();
  picturelength = $(".pic_content img").length;
  picWidth = pictureWidth * picturelength;
  var index = -1;
  $(".pic_content").css("width", picWidth + "px");

  $(window).resize(function() {
    pic_content = $(".pic_content");
    Width = $(".pic").width();
    $(".pic_content img").width(Width);
    pictureWidth = $(".pic_content img").width();
    picturelength = $(".pic_content img").length;
    picWidth = pictureWidth * picturelength;
    $(".pic_content").css("width", picWidth + "px");
    $(".pic_content").css("left", "0px");
    index = -1;
  });
  var button_left = $(".pic .button_left");
  var button_right = $(".pic .button_right");
  var button_left_img = $(".pic .button_left img");
  var button_right_img = $(".pic .button_right img");
  button_left.hover(function() {
    button_left_img.attr('src', "images/left_hover.png");
    button_left.css("cursor", "pointer");
  }, function() {
    button_left_img.attr('src', "images/left.png");
  });
  button_right.hover(function() {
    button_right_img.attr('src', "images/right_hover.png");
    button_right.css("cursor", "pointer");
  }, function() {
    button_right_img.attr('src', "images/right.png");
  });

  button_left.click(function() {
    index--;
    if (index == -1) {
      index = 4;
      $(".pic_content").css("left", -index * pictureWidth);
      index = 3;
    }
    $(".pic_content").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 1200);
    Word_t();
  });
  button_right.click(function() {
    index++;
    if (index == 5) {
      $(".pic_content").css("left", "0");
      index = 1;
    }
    $(".pic_content").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 1200);
    Word_t();
  });
  var timer = setInterval(picMove, 6000);
  $(".pic").hover(function(e) {
    e.preventDefault();
    clearInterval(timer);
    $(".pic div[class*=button]").show();
  }, function() {
    timer = setInterval(picMove, 6000);
    $(".pic div[class*=button]").hide();
  });

  picMove();

  function picMove() {
    index++;
    if (index == picturelength) {
      $(".pic_content").css("left", "0px");
      index = 1;
    } else if (index == -1) {
      index = picturelength - 1;
      $(".pic_content").css("left", -index * pictureWidth + "px");
    }
    $(".pic_content").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 1200);
    Word_t();
  }

  function Word_t() {
    $(".pic_content li").eq(index).find(".Sopt_name").animate({
      left: "20%"
    }, 2000);
    $(".pic_content li").eq(index).find(".Sopt_content").animate({
      left: "30%"
    }, 2000);
    $(".pic_content li").eq(index).siblings().find(".Sopt_name").css("left", "-50%");
    $(".pic_content li").eq(index).siblings().find(".Sopt_content").css("left", "-50%");
  }
});


// 指针导航点
$(function() {
  var i = 0;
  var index;
  var height = $("body").height();
  $(window).resize(function() {
    height = $("body").height();
  });
  $(".guide li").click(function() {
    index = $(this).index();
    index += 1;
    var sum = index * height;
    $(window).scrollTop(sum);
    // $(this).find("img").attr("src","images/circle2.png");
    // $(this).siblings().find("img").attr("src","images/circle1.png");
  });
  var circle = [];
  circle[0] = "资讯新闻";
  circle[1] = "特色景点";
  circle[2] = "特色美食";
  circle[3] = "历史文化";
  circle[4] = "交通路线";
  circle[5] = "视频欣赏";

  $(".guide li").hover(function() {
    index = $(this).index();
    var title = "<div class='title_text'>" + circle[index] + "</div>";
    $(this).append(title);
  }, function() {
    $(".title_text").remove();
    $(this).remove("title_text");
  });


  //滚轮事件
  //   $(document).on("mousewheel DOMMouseScroll", function (e) {
  // var a=0;
  //       var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
  //                   (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
  //
  //       var num= $(window).scrollTop();
  //       console.log(num);
  //       if (delta > 0) {
  //           // 向上滚
  //         num-=height;
  //         a++;
  //         if(a==1)
  //         $(window).scrollTop(num);
  //         a=0;
  //       } else if (delta < 0) {
  //           // 向下滚
  //           num+=height;
  //           a++;
  //           if(a==1)
  //           $(window).scrollTop(num);
  //           a=0;
  //       }
  //   });

});


// 新闻资讯
$(function() {
  var index = 0;
  var pictureWidth = $(".new_content_pic img").width();
  var picturelength = $(".new_content_pic img").length;
  $(window).resize(function() {
    Width = $(".new_content_left").width();
    $(".new_content_pic img").width(Width);
    pictureWidth = $(".new_content_pic img").width();
    picturelength = $(".new_content_pic img").length;
    picWidth = pictureWidth * picturelength;
    $(".new_content_pic").css("width", picWidth + "px");
    index = 0;
    i = 0;
    $(".new_content_pic").css("left", "0px");
    $(".new_content_left li img").attr("src", "images/pic_unchecked.png");
    $(".new_content_left li img").eq(i).attr("src", "images/pic_checked.png");
  });
  picMove_1();
  var m = 0;
  $(".new_content_left li").click(function() {
    var y = $(".new_content_left li").index(this);
    index = y;
    i = y;
    $(".new_content_pic").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 200);
    $(".new_content_left li img").attr("src", "images/pic_unchecked.png");
    $(".new_content_left li img").eq(i).attr("src", "images/pic_checked.png");
  });

  function picMove_1() {
    index++;
    if (index == picturelength) {
      $(".new_content_pic").css("left", "0px");
      index = 1;
    }
    $(".new_content_pic").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 200);
    time1 = setTimeout(picMove_1, 11000);
  }
  var i = 0;
  spotMove();

  function spotMove() {
    i++;
    if (i == 4) {
      i = 0;
    }
    $(".new_content_left li img").attr("src", "images/pic_unchecked.png");
    $(".new_content_left li img").eq(i).attr("src", "images/pic_checked.png");
    setTimeout(spotMove, 11000);
  }

});


// 特色景点
$(".feature_spot_content .mask img").click(function() {
  $(".screen").css("display", "block");
  $(".big_pic").css("display", "block");
  var src = $(this).parent().next().find("img").attr("src");
  $("#fangdatu").attr("src", src);
});
$("#guanbi").click(function() {
  $(".screen").hide();
  $(".big_pic").hide();
});
// 特色景点遮罩层
$(function() {
  $(".feature_spot_box").hover(function() {
    $(this).find(".mask").stop(true, false).animate({
      height: "100%"
    }, 100).slideDown();
    $(this).find(".fea_pic img").stop(true, false).animate({
      height: "140%",
      width: "140%",
      left: "-10%",
      top: "-10%"
    }, 500);
  }, function() {
    $(this).find(".mask").stop(true, false).animate({
      height: 0
    }, 100).slideUp();
    $(this).find(".fea_pic img").stop(true, false).animate({
      height: "120%",
      width: "120%",
      left: 0,
      top: 0
    }, 500);
  });
});

$(window).bind("scroll", function() {
  var top = $(this).scrollTop(); //当前窗口的滚动距离,即滚轮位置
  //所在盒子的位置-盒子的高度
  var food_top = $(".feature_food").offset().top - $(".feature_food").height();
  var news_top = $(".news").offset().top - $(".news").height() - 100;
  //特色美食显示
  if (top > food_top) {
    $(".feature_food_top").animate({
      left: "0"
    }, 1000);
    $(".feature_food_bottom").animate({
      left: "0"
    }, 1200);
  }
  //新闻资讯显示
  if (top > news_top) {
    $(".new_content_left").animate({
      left: "0"
    }, 1000);
    $(".new_content_right").animate({
      right: "0"
    }, 1000);
  }
  if (top > 700) {
    $("#start_point").css("display", "block");
  } else {
    $("#start_point").css("display", "none");
  }
});
// 回到顶端
$(function() {
  $("#start_point").click(function() {
    $("html").animate({
      scrollTop: "0"
    }, 1000);
  });
});


// 打开视频
$(function() {
  $(".evaluation_video").click(function() {
    $(".video").show();
    $(".screen").show();
  });
  $(".video img,.screen").click(function() {
    $(".video").hide();
    $(".screen").hide();
    $(".big_pic").hide();
  });
});


// 气泡效果
(function() {
  this.Bubble = (function() {
    class Bubble {
      constructor(x, y, r, createdAt) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.createdAt = createdAt;
      }

      velocity() {
        return this.r / 20 * Bubble.MAX_V;
      }

      grow(now) {
        if (!this.rising && this.r <= Bubble.MAX_R) {
          return this.r += Bubble.GROWTH_RATE * (now - this.createdAt);
        }
      }

      move(now) {
        if (this.rising) {
          return this.y -= (now - this.startedRisingAt) * this.velocity();
        }
      }

      rise() {
        if (!this.rising && this.r > 2) {
          this.rising = Math.random() < 0.15 * (this.r / Bubble.MAX_R);
          if (this.rising) {
            return this.startedRisingAt = new Date().getTime();
          }
        }
      }

    };

    Bubble.MAX_R = 20;

    Bubble.MAX_V = 0.02;

    Bubble.GROWTH_RATE = 0.00005;

    return Bubble;

  }).call(this);

  this.RisingBubbles = (function() {
    var rand, randInt;

    class RisingBubbles {
      constructor(id, maxBubbles) {
        var elem, i, j, ref;
        this.maxBubbles = maxBubbles;
        this.canvas = document.getElementById(id);
        elem = $('#' + id);
        elem.css('background-color', 'rgb(153,204,255)');
        elem.click(() => {
          var b, j, len, ref, results, ts;
          ts = new Date().getTime();
          ref = this.bubbles;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            b = ref[j];
            if (!b.rising) {
              b.rising = true;
              results.push(b.startedRisingAt = ts);
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = '#FFFFFF';
        this.bubbles = [];
        this.lastFrame = new Date().getTime();
        for (i = j = 1, ref = randInt(0, this.maxBubbles); 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
          this.bubbles.push(new Bubble(randInt(0, this.canvas.width), randInt(0, this.canvas.height), rand(0, Bubble.MAX_R), new Date().getTime()));
        }
      }

      draw() {
        return this.run(new Date().getTime());
      }

      run(now) {
        var bubble, j, len, ref;
        this.update(now);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ref = this.bubbles;
        for (j = 0, len = ref.length; j < len; j++) {
          bubble = ref[j];
          this.ctx.moveTo(bubble.x, bubble.y);
          this.ctx.beginPath();
          this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
          this.ctx.fill();
        }
        return requestAnimationFrame(() => {
          return this.run(new Date().getTime());
        });
      }

      update(now) {
        var b, i, j, k, len, ref, ref1, results;
        ref = this.bubbles;
        for (j = 0, len = ref.length; j < len; j++) {
          b = ref[j];
          b.grow(now);
          b.rise();
          b.move(now);
        }
        this.bubbles = (function() {
          var k, len1, ref1, results;
          ref1 = this.bubbles;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            b = ref1[k];
            if (b.y + b.r >= 0) {
              results.push(b);
            }
          }
          return results;
        }).call(this);
        if (this.maxBubbles - this.bubbles.length > 0) {
          results = [];
          for (i = k = 1, ref1 = randInt(0, this.maxBubbles - this.bubbles.length); 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
            results.push(this.bubbles.push(new Bubble(randInt(0, this.canvas.width), randInt(0, this.canvas.height), 1, new Date().getTime())));
          }
          return results;
        }
      }

    };

    randInt = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };

    rand = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };

    return RisingBubbles;

  }).call(this);

  $((function() {
    var fizz;
    fizz = new RisingBubbles('fizz', 500);
    return fizz.draw();
  }));
}).call(this);

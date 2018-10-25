$(function() {
    $.ajax({
      type: 'POST',
      url: "{:url('food/getpic')}",
      data: {},
      dataType: 'json',
      success: function(data) {
        if (data.status == 1) {
          var num = data.count;
          var shang1 = parseFloat(num / 4);
          var shang2 = parseInt(num / 4);
          var yu = parseInt(num % 4);

          var odiv = "<div class='table'></div>";
          var a = 0;
          for (var i = 0; i < shang1; i++) {
            $(".menu_content_left").append(odiv);
            for (var b = 0; b < 4; b++) {
              var img1 = "<img src='__STATIC__" + data.date[a++].pic + "' alt=''>";
              $(".table").eq(i).append(img1);
            }

            if (shang1 > shang2) {
              $(".menu_content_left").append(odiv);
              for (var c = 0; c < yu; c++){
                var img2 = "<img src='__STATIC__" + data.date[a++].pic + "' alt=''>";
              $(".table").eq(shang1 + 1).append(img2);
              }

            }
          }
        } else {
          alert("没有相关的餐厅咯");
        }
      }
    });
  });




$(function() {
  $(".menu_content_left img").click(function() {
    var faindex = $(this).parent().index();
    var index = $(this).index() + 1;
    var num = faindex * 4 + index;
    alert(num);
    $.ajax({
      type: 'POST',
      url: "{:url('food/getid')}",
      data: {
        "index": index
      },
      dataType: 'json',
      success: function(data) {
        if (data.status == 1) {
          $("#restaurant_introduce").html(data.descriptionr);
          $("#restaurant_where").html(data.address);
          $("#restaurant_tel").html(data.tel);
          $("#restaurant_time").html(data.open);
          $("#food_img1").attr("src", data.foodpic);
          $("#food_name1").html(data.foodname[0]);
          $("#food_introduce1").html(data.fooddescription[0]);
          $("#food_name2").html(data.foodname[1]);
          $("#food_introduce2").html(data.fooddescription[1]);
          $("#food_name3").html(data.foodname[2]);
          $("#food_introduce3").html(data.fooddescription[2]);
        } else {
          alert(data.message);
        }
      }
    });
  });

});
// 点击页数
$(function() {

  // 上一页
  $("#ye_pre").click(function() {

    // 当前显示页
    var a = $('.table:visible').index();
    if (a == 0) {
      $(".table").eq(0).show().siblings().hide();
    } else {
      $(".table").eq(a - 1).show().siblings().hide();
    }

  });
  // 下一页
  $("#ye_next").click(function() {
    var length = $(".table").length - 1;

    var a = $('.table:visible').index();
    if (a == length) {
      $(".table").eq(length).show().siblings().hide();
    } else {
      $(".table").eq(a + 1).show().siblings().hide();
    }

  });
  // 首页
  $("#ye_first").click(function() {
    $(".table").eq(0).show().siblings().hide();
  });
  // 尾页
  $("#ye_last").click(function() {
    var length = $(".table").length - 1;
    $(".table").eq(length).show().siblings().hide();
  });
  //点击页
});


$(function() {
  $(".native_pic").hover(function() {
    var index = $(this).index();
    $(".native_pic").eq(index).find("p").stop(true, false).animate({
      left: "25%",
      top: "35%"
    }, 600);
  }, function() {
    $(".native_pic").find("p").stop(true, false).animate({
      left: "100%",
      top: "100%"
    }, 300);
  });
});

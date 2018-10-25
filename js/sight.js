$(function() {
  var index = 0;
  var pictureWidth = $(".Sowing_map_pic img").width();
  var picturelength = $(".Sowing_map_pic img").length;
  $(window).resize(function() {
    Width = $(".Sowing_map").width();
    $(".Sowing_map_pic img").width(Width);
    pictureWidth = $(".Sowing_map_pic img").width();
    picturelength = $(".Sowing_map_pic img").length;
    picWidth = pictureWidth * picturelength;
    $(".Sowing_map_pic").css("width", picWidth + "px");
    index = 0;
    i = 0;
    $(".Sowing_map_pic").css("left", "0px");
    $(".Sowing_map li img").attr("src", "../images/pic_unchecked.png");
    $(".Sowing_map li img").eq(i).attr("src", "../images/pic_checked.png");
  });
  picMove_1();
  var m = 0;
  $(".Sowing_map li").click(function() {
    var y = $(".Sowing_map li").index(this);
    index = y;
    i = y;
    $(".Sowing_map_pic").stop(true, false).animate({
      "left": -index * pictureWidth
    }, 500);
    $(".Sowing_map li img").attr("src", "../images/pic_unchecked.png");
    $(".Sowing_map li img").eq(i).attr("src", "../images/pic_checked.png");
  });

  function picMove_1() {
    index++;
    if (index == picturelength) {
      $(".Sowing_map_pic").css("left", "0px");
      index = 1;
    }
    $(".Sowing_map_pic").stop(true, false).animate({
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
    $(".Sowing_map li img").attr("src", "../images/pic_unchecked.png");
    $(".Sowing_map li img").eq(i).attr("src", "../images/pic_checked.png");
    setTimeout(spotMove, 11000);
  }
});



var map = new BMap.Map("allmap");    // 创建Map实例
  map.centerAndZoom(new BMap.Point(119.68,30.68),18);  // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map.addControl(new BMap.MapTypeControl({
    mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));

  map.setCurrentCity("安吉");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  var map_Scale = new BMap.ScaleControl({anchor:BMAP_UNIT_IMPERIAL,offset:new BMap.Size(80,15)});
  map.addControl(map_Scale);
  //缩略地图控件
  var size = new BMap.Size(100,100);//缩略图控件的参数
  var map_OverView = new BMap.OverviewMapControl({size:size,isOpen:true});
  map.addControl(map_OverView);

var map = new BMap.Map("allmap");    // 创建Map实例
var point = new BMap.Point(119.04,29.60);
map.centerAndZoom(point,12);  // 初始化地图,设置中心点坐标和地图级别
$("#return").click(function(){
  new BMap.Point(119.04,29.60);
  map.centerAndZoom(point,12);
});
  //添加地图类型控件
  map.addControl(new BMap.MapTypeControl({
    mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));

  map.setCurrentCity("千岛湖");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  var map_Scale = new BMap.ScaleControl({anchor:BMAP_UNIT_IMPERIAL,offset:new BMap.Size(80,15)});
  map.addControl(map_Scale);
  //缩略地图控件
  var size = new BMap.Size(100,100);//缩略图控件的参数
  var map_OverView = new BMap.OverviewMapControl({size:size,isOpen:true});
  // 标记关键字坐标
  map.addControl(map_OverView);
  var myKeys = ["酒店", "车站","服务区"];
  	var local = new BMap.LocalSearch(map, {
  		renderOptions:{map: map, panel:"r-result"},
  		pageCapacity:5
  	});
  	local.searchInBounds(myKeys, map.getBounds());

    var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
    	$("#result").click(function(){
        var start = $("#start").val();
          var end = $("#end").val();
    		map.clearOverlays();
        if(!end){

          local.search(start);
        }
    		var i=$("select").val();
    		search(start,end,routePolicy[i]);
    		function search(start,end,route){
    			var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true},policy: route});
    			driving.search(start,end);
    		}
        var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
          driving.search(start, end);
    	});

      var local = new BMap.LocalSearch(map, {
        renderOptions:{map: map}
      });


// 右键菜单
      // map.centerAndZoom(point,15);
      // 	var menu = new BMap.ContextMenu();
      // 	var txtMenuItem = [
      // 		{
      // 			text:'放大',
      //       callback:function(){map.zoomIn()}
      // 		},
      // 		{
      // 			text:'缩小',
      //       callback:function(){map.zoomOut()}
      // 		}
      // 	];
      // 	for(var i=0; i < txtMenuItem.length; i++){
      // 		menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
      // 	}
      // 	map.addContextMenu(menu);


// 输入提示
        var sc = new BMap.Autocomplete(    //建立一个自动完成的对象
        		{"input" : "start",
            "location" : map
        	});
          var ec = new BMap.Autocomplete(    //建立一个自动完成的对象
          		{"input" : "end",
              "location" : map
          	});


            var test=function(ac){
            ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
              var _value = e.fromitem.value;
              var value = "";
              if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              }
              str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

              value = "";
              if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              }
              str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
              G("searchResultPanel").innerHTML = str;
            });

            var myValue;
            ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
              myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
              G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

              setPlace();
            });

            function setPlace(){
              map.clearOverlays();    //清除地图上所有覆盖物
              function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
              }
              var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
              });
              local.search(myValue);
            }

            };

test(sc);
test(ec);

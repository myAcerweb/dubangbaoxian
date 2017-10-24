var Province = "";
var City = "";
var index = 0;
window.onload = function() {
	var addr = JSON.parse(sessionStorage.getItem("curaddr")) || {};
	Province = addr.province || "";
	City = addr.district || "";
	$(".addr").html(Province + City);
	//初始化
	initPage();
	//初始化省事列表
	initProvince();	
}

function initPage() {
	mui.init({
		pullRefresh: {
			container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				height: 50, //可选,默认50.触发下拉刷新拖动距离,
				auto: true, //可选,默认false.首次加载自动下拉刷新一次
				contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			},
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});
}
//下拉刷新
function pullfreshDown() {
	index = 0;
	$("#holder").html("");
	//下拉加载数据
	init_List();
}

//上拉加载
function pullfreshUp() {
	//上拉一次加载一页
	index++;
	//上拉加载数据
	init_List();
}

function init_List() {
	MobileApp.setUrl(_vehiclePc);
	//初始化参数
	var req = {
		"cmd": "ListStores",
		"province": Province.replace("省",""),
		"city": City.replace("市",""),
		"index": index,
		"size": 10,
	};
	MobileApp.sendRequest(req, function(res) {
		res = JSON.parse(res);
		if(res.result) {
			//显示网点
			showList(res.payload.listVo.storeVo);
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		} else {
			alertShow(res.error);
		}
	});
}

function showList(v) {
	var wdList = $("#holder");
	$(v).each(function(index, s) {
		var item = $("#card").clone();
		item.removeClass("none");
		item.find(".name").html(s.storeName);
		item.find(".addr").html(s.address);
		item.find(".tel").html(s.telephone);
		item.find(".tel").attr("href","tel:" + s.telephone);
		wdList.append(item);

		item.on("tap", function(e) {
			if(e.target.tagName !== "A"){
				sessionStorage.setItem("transfer",JSON.stringify(s));
				location.href = "ins_transfer.html";
			}
		})
	})
}
$("#selectArea").on("click", function() {
	$(".drop").show();
})
$("#select").on("click",function(){
	Province = $(".pro li.active").text();
	City = $(".city li.active").text();
	$("#selectArea .addr").html(Province + City);
	$(".drop").hide();
	sessionStorage.setItem("curaddr",JSON.stringify({'province':Province,'district':City}))
	pullfreshDown();
})
$("#cancel").on("click",function(){
	$(".drop").hide();
})
$(".search").on("focus",function(){
	$("#search").show();
})
$("#search").on("click",function(){
	Province = "";
	City = $(".search").val();
	$("#selectArea .addr").html(Province + City);
	$(this).hide();
	sessionStorage.setItem("curaddr",JSON.stringify({'province':Province,'district':City}))
	pullfreshDown()
})
function initProvince() {
	MobileApp.setUrl(_vehicle);
	var req = {
		"cmd": "ListCityByProvince"
	};
	MobileApp.sendRequest(req, function(res) {
		var res = JSON.parse(res);
		var v = res.payload.vo;
		var pro = {};
		var province = $("#provinces");
		for(var i = 0; i < v.length; i++) {
			(function(j) {
				var s = v[j];
				var _li = document.createElement("li");
				_li.classList = "mui-table-view-cell";
				_li.textContent = s.province;
				_li.onclick = function() {
					$("#provinces li").removeClass("active")
					_li.classList = "mui-table-view-cell active";
					initCity(s.citys)
				}
				province.append(_li);
			}(i));
		}
	});
}

function initCity(v) {
	var city = $("#citys");
	city.html('<li class="mui-table-view-cell">下属市</li>')
	for(var i = 0; i < v.length; i++) {
		(function(j) {
			var s = v[j];
			var _li = document.createElement("li");
			_li.classList = "mui-table-view-cell";
			_li.textContent = s.name;
			_li.onclick = function() {
				$("#citys li").removeClass("active")
				_li.classList = "mui-table-view-cell active";
			}
			city.append(_li);
		}(i));
	}
}
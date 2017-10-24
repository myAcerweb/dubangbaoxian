$(document).ready(function() {

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
	clickEven();
});

var index = 1;

function clickEven() {
	$('header').on('click', 'div', function(e) {
		$(this).css({
			backgroundColor: '#d3a27c',
			color: '#fff'
		}).siblings().css({
			backgroundColor: '#fff',
			color: '#d3a27c'
		});
		index = $(this).index();
		$('#items').html('');
		$('#members').html('');
		getmsg();
	})
}

function getmsg() {
	var account = MobileApp.getCookie("account");
	MobileApp.setUrl(_vehicle);
	var req = {
		"cmd": "OrderSummary",
		"sta_members": true,
		"account": account,
		"type": index.toString()
	};
	MobileApp.sendRequest(req, function(res) {
		mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		var res = JSON.parse(res);
		var orderSummary = res.payload.orderSummary;
		setmsg(orderSummary);
	});

	MobileApp.setUrl(_account);
	var req = {
		"cmd": "AccountSummary",
		"account": account,
		"type": index.toString()
	};
	MobileApp.sendRequest(req, function(res) {
		var res = JSON.parse(res);
		var total_account = res.payload.accountSummary.total_account;
		$('.groupNum').html(total_account);
	});
	
	MobileApp.setUrl(_vehicle);
	var req = {
		"cmd": "ListOrderSummary",
		"account": account,
		"type": index.toString()
	};
	MobileApp.sendRequest(req, function(res) {
		var res = JSON.parse(res);
		var members = res.payload.orderSummary || [];
		setMember(members);
	});
}

function setmsg(res) {
	var list = $('#item').clone();
	list.removeAttr('id');
	list.attr('class', 'list');
	if(index == 0) {
		list.find(".free").html(thousandBitSeparator(res.total_fee));
		list.find(".premium").prev().html("周保费");
		list.find(".premium").html(res.this_week_fee);
		list.find(".ordersNum").prev().html("周保单");
		list.find(".ordersNum").html(res.this_week_order);
	} else if(index == 1) {
		list.find(".free").html(thousandBitSeparator(res.total_fee));
		list.find(".premium").prev().html("月保费");
		list.find(".premium").html(res.this_month_fee);
		list.find(".ordersNum").prev().html("月保单");
		list.find(".ordersNum").html(res.this_month_order);
	} else if(index == 2) {
		list.find(".free").html(thousandBitSeparator(res.total_fee));
		list.find(".premium").prev().html("年保费");
		list.find(".premium").html(res.this_year_fee);
		list.find(".ordersNum").prev().html("年保单");
		list.find(".ordersNum").html(res.this_year_order);
	}
	$('#items').append(list);
	list.show();
}

function setMember(res){
	res.forEach(function(item){
		var member = $('#member').clone();
		member.removeAttr('id');
		member.find("img").attr("src",item.headurlImage);
		member.find(".name").html(item.nickname);
		member.find(".fee").html(item.total_fee + "<i>保费</i>");
		member.find(".order").html(item.total_order + "<i>单数</i>");
		member.find(".carfee").html(item.total_carfee + "<i>车船税</i>");
		$('#members').append(member);
		member.show();
	})
}
//下拉刷新
function pullfreshDown() {
	$('#items').html('');
	$('#members').html('');
	getmsg();
}

//上拉加载
function pullfreshUp() {
	$('#items').html('');
	$('#members').html('');
	getmsg()
}

function thousandBitSeparator(num) {
	return num && num
		.toString()
		.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
			return $1 + ",";
		});
}
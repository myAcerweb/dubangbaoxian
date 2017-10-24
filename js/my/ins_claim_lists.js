window.onload = function(){
	initPage();
	initEvent();
}

/*
 * 	页面初始化
 */
function initPage(){
	getData()
}

/*
 * 	装载事件
 */
function initEvent(){
	
}

//吊后台接口
function getData(){
	var baodanhao = MobileApp.getQueryString("baodanhao");
	var gonghao = MobileApp.getQueryString("gonghao");
	MobileApp.setUrl(_vehicle);
	var req = {
		"cmd": "QueryClaim",
		"policyno": baodanhao,
		"handlecode": gonghao,
		"reportstarttm":"",
		"reportendtm":""
	};
	loadingShow("查询中");
	MobileApp.sendRequest(req, function(res) {
		loadingHide()
		res = JSON.parse(res);
		if(res.result) {
			var v = res.payload.claimInfoVo.claimpays;
			fillData(v);
		} else {
			alert("查询错误");
		}
	});
}

//填充本页面数据
function fillData(v){
	for(var i=0;i<v.length;i++){
		localStorage.setItem(v[i].caseno,JSON.stringify(v[i]));
		var list = $("#list").clone();
		list.find(".name").html(v[i].insuredname);
		list.find(".vehicleId").html(v[i].lcnno);
		list.find(".jine").html("￥"+v[i].claimamt);
		list.find(".baoanhao").html(v[i].caseno);
		list.find(".riqi").html(v[i].accidenttm);
		list.show();
		$("body").append(list);
		(function(s){
			list.find(".item").click(function(){
				window.location.href = "ins_claim_info.html?action=nextPage&code="+s.caseno;
			});
		})(v[i]);
	}
}


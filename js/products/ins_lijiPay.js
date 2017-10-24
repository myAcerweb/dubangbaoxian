window.onload = function() {
	var title = '加载中,请稍候...';
	loadingShow(title);
	
	var app = new InsMbsVehicleOpeation();
	
	app.OnlinePay("3", "", function(res, vs) {
		loadingHide();
		if(res) {
			$("#sign").val(vs.map.sign);
			$("#sumPayFee").val(vs.map.sumPayFee);
			$("#orderSource").val(vs.map.orderSource);
			$("#outOrderNo").val(vs.map.outOrderNo);
			if(vs.map.callBackFlag == "1") {
				$("#callBackFlag1").val("需异步通知");
				$("#callBackFlag").val(vs.map.callBackFlag);
			} else {
				$("#callBackFlag1").val("无需通知");
				$("#callBackFlag").val(vs.map.callBackFlag);
			}
			$("#goods").val(vs.map.goods);
			$("#businessType").val(vs.map.businessType);
			$("#actionType").val(vs.map.actionType);
			$("#callBackUrl").val(vs.map.callBackUrl);

			var form = document.getElementById("formid");
			form.action = _allinPay + vs.url;
			form.submit();
		} else {
			alertShow("生成订单失败，请稍后重试！");
			return;
		}
	});
}
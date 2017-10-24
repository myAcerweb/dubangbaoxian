var isShare = false;
var link = location.href;
var title = '微信扫码支付'; // 分享标题
var desc = '请给您的爱车付款'; // 分享描述
var imgUrl = '';

window.onload = function(){
	initPage();

	//验证是否已付款   两秒刷新一次
	count();
}
function initPage(){
	// var base64 = MobileApp.getParameterValue("erweima");
	var base64 = localStorage.getItem("erweima");
	base64 = "data:image/png;base64,"+base64;
	$("#img").attr("src",base64);
}


var interval;
function count() {
	interval = window.setInterval("isPayment()",2000);//两秒加载
};

function isPayment(){
	//报价单号
	// var quotationNo = MobileApp.getParameterValue("sourceOrder");
	var quotationNo = localStorage.getItem("sourceOrder");

	var oper = new InsMbsVehicleOpeation();
	oper.quotation(quotationNo, function(vs) {
		if(vs) {
			var quotationVo = vs.quotationVo;
			if(quotationVo.status == "3" || quotationVo.status == "5"){
				window.clearInterval(interval);
				alertShow("支付成功!");
				window.location.href = 'products.html?action=newpage';
			}
		}
	});
}





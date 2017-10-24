window.onload = function() {
	var city_picker1 = new mui.PopPicker({
		layer: 2
	});
	city_picker1.setData(init_city_picker);
	$("#showCityPicker").on("click", function() {
		city_picker1.show(function(items) {
			$("#showCityPicker").html((items[0] || {}).text + " " + (items[1] || {}).text);
		});
	});
}
//判断是否是新增地址
let xinzeng = MobileApp.getQueryString("xinzeng");
if(xinzeng == "1") {
	$("title").html("新增保单邮寄地址");
	var add = JSON.parse(sessionStorage.getItem("accountAddress"));
	$("#showCityPicker").html(add.province + " " + add.city);
	$("#detailArea").val(add.address);
} else {
	$("title").html("修改地址");
	let v = JSON.parse(localStorage.getItem("bddzxg"));
	$("#name").val(v.name);
	$("#num").val(v.mobile);
	$("#detailArea").val(v.address);
	if(v.province && v.city){
		$("#showCityPicker").html(v.province + " " + v.city);
	}
}

//$("#num").change(function() {
//	var reg2 = /^1[34578]\d{9}$/;
//	var num = $("#num").val();
//	if(!reg2.test(num)) {
//		alertShow("你输入的手机号格式错误!");
//	}
//});
//
//$("#insureArea").css({
//	"background": "#d3a27c"
//});
//点击确定时保存地址信息
$("#insureArea").click(function() {
	//对名字和地址进行验证
	var name = $("#name").val();
	var phone = $("#num").val();
	var detailArea = $("#detailArea").val();
	if(!nameReg(name)) {
		return false
	}
	if(!phoneVerification(phone)) {
		return false
	}
	if(!detailAreaReg(detailArea)) {
		return false
	}

	var oper = new InsMbsVehicleOpeation();
	let xinzeng = MobileApp.getQueryString("xinzeng");
	var provCity = $("#showCityPicker").html();
	var province = "",
		city = "";
	if(provCity == "选择省市") {
		alertShow("请选择省市");
		return;
	}
	if(provCity != "选择省市") {
		province = provCity.split(" ")[0];
		city = provCity.split(" ")[1];
	}
	if($("#detailArea").val() == ""){
		alertShow("请输入详细地址");
		return;
	}
	if(xinzeng == "1") {
		var addr3 = {
			name: $("#name").val(),
			num: $("#num").val(),
			detailArea: $("#detailArea").val(),
			province: province,
			city: city
		}
		oper.AddCommonAddress(addr3, function(cb) {
			var quotationNo = MobileApp.getParameterValue("quotationNo");
			window.location.replace("ins_mail_address.html?quotationNo=" + quotationNo);
		});
	} else {
		let s = JSON.parse(localStorage.getItem("bddzxg"));
		var addr3 = {
			name: $("#name").val(),
			num: $("#num").val(),
			detailArea: $("#detailArea").val(),
			"addressNo": s.addressNo,
			province: province,
			city: city
		}
		oper.UpCommonAddress(addr3, function(cb) {
			var quotationNo = MobileApp.getParameterValue("quotationNo");
			window.location.replace("ins_mail_address.html?quotationNo=" + quotationNo);
		});
	}

});

function nameReg(str) {
	var regex = /^[\u4e00-\u9fa5]{2,}$/;
	if(!regex.test(str)) {
		alertShow("名字格式不正确");
		return false;
	}
	return true;
}

function detailAreaReg(str) {
	if(str.length != 0 && str.length < 4) {
		alertShow("地址太短");
		return false;
	}
	return true;
}
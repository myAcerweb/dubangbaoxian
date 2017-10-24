//页面初始化
window.onload = function() {
	initPage();
	//selectVehicleType是否调用报价页面
	var storage = window.localStorage;
	storage.selectVehicleType = false;
}

function initPage() {
	//设置date标签默认投保日期为当天
	//	var da = new Date().toFomatorString("YYYY-MM-DD");
	//	$("#enrollDate").val(da);

	wx.hideMenuItems({
		menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	});
	var app = new InsMbsVehicleObj();
	var vehicle = app.getVehicle();

	var vehicleOwner = app.getVehicleOwner();
	var owner = vehicleOwner.getName();
	var id = vehicleOwner.getLic_no();
	var plate = vehicle.getLic_no();
	var oper = new InsMbsVehicleOpeation();

	var app = new InsMbsVehicleObj();
	var vehicle = app.getVehicle();
	if(vehicle != "") {
		var cheJiaHao = vehicle.getVin_no().trim();
		var engine = vehicle.getEngine_no().trim();
		var model = vehicle.getBrandName();
		var date1 = vehicle.getEnrollDate();
		if(model != ""){
			$("#plate").val(model.split(" ")[0]);
		}
			
		if(cheJiaHao != ""){
			$("#cheJaHao").val(cheJiaHao);
		}
			
		if(engine){
			$("#vehicleEngine").val(engine);
		}
			
		if(date1 != "") {
			$("#enrollDate").val(date1);
		}
	}

	loadingShow();
	//车辆查询
	oper.serarchVehicle(plate, owner, id, function(vs) {
		loadingHide();
		if(vs) {
			if(!vs.getBrandName().isEmpty()) {
				$("#plate").val(vs.getBrandName());
			}
			if(!vs.getModelCode().isEmpty()) {
				$("#cheJaHao").val(vs.getModelCode());
			}
			if(!vs.getEngine_no().isEmpty()) {
				$("#vehicleEngine").val(vs.getEngine_no());
			}
			var date1 = vs.getEnrollDate();
			if(date1 == "") {
				//var da = new Date().toFomatorString("YYYY-MM-DD");
				//$("#enrollDate").val(da);
			} else {
				$("#enrollDate").val(date1);
			}
		}
	});
	//车架号和发动机号不为空就去后台查车型
	//	if($("#cheJaHao").val() != "" && $("#vehicleEngine").val() != "") {
	//		operVehicle();
	//	}
}

//点击在哪里查看车辆信息，跳出弹框
$(".tip-mess").click(function(){
	$(".modal").show();
})
$(".modal-btn").click(function(){
	$(".modal").hide();
})

//点击图片弹出选文件
function fileChange() {
	var app = new InsMbsVehicleObj();
	var vehicle = app.getVehicle();
	var lic_no = vehicle.getLic_no();
	if(lic_no == ""){
		alertShow("新车不允许识别")
	}else{
		document.getElementById('plateFile').click();
	}
}
$("#plateFile").on("change",function(){
	plateChange();
})
//输入框有变化时把里面的值变成大写
function plateOnChange() {
	var plate = $("#plate").val();
	plate = plate.toUpperCase();
	$("#plate").val(plate);
}

function cheJaHaoChange() {
	var cheJaHao = $("#cheJaHao").val().trim();
	cheJaHao = cheJaHao.toUpperCase();
	$("#cheJaHao").val(cheJaHao);
	var frameNoReg = /^[a-z||A-Z]{0,1}[0-9A-Z*]{16,}$/;
	if(!frameNoReg.test(cheJaHao)) {
		alertShow("车架号格式不正确");
	}
}

function vehicleEngineChange() {
	var vehicleEngine = $("#vehicleEngine").val().trim();
	vehicleEngine = vehicleEngine.toUpperCase();
	$("#vehicleEngine").val(vehicleEngine);
	var engineNoReg = /[\w]{5,20}/g;
	if(!engineNoReg.test(vehicleEngine)) {
		alertShow("发动机号格式不正确");
	}
}

//识别驾驶证信息
function plateChange() {
	loadingShow('识别中,请稍候...')
	var form = document.getElementById("plateForm");
	var oData = new FormData(form);
	$.ajax({
		url: _ocr,
		type: 'POST',
		data: oData,
		async: true, //异步，其他默认为false即可，xmlhttprequest自动处理
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(returndata) {
			loadingHide();
			$("#plateFile").val("")
			if(returndata.status != "OK") {
				if(returndata.info == undefined){
					alertShow("识别失败");
				}else{
					alertShow("识别失败:" + returndata.info);
				}
				return;
			}
			var vehicleOwner = returndata.data.item.name;
			var vehicleNum = returndata.data.item.cardno;
			var vehicleEngine = returndata.data.item.enginePN;
			var cheJaHao = returndata.data.item.vin;
			var vehicleModel = returndata.data.item.model;
			//var area = returndata.data.item.address;
			var vehicleEnroll = returndata.data.item.registerDate;
			if(cheJaHao.length == 0 && vehicleModel.length == 0){
				alertShow("识别失败,请换张图片");
				return;
			}
			//弹出弹框和修改弹框里内容
			$('.layer').removeClass('none');
			$('.user-message').removeClass('none');
			$('.layer').show();
			$('.user-message').show();
			$("#dirver_lic_close").click(function() {
				$('.layer').hide();
				$('.user-message').hide();
			});
			$("#vehicleNum_e").val(vehicleNum);
			$("#vehicleEngine_e").val(vehicleEngine);
			$("#cheJaHao_e").val(cheJaHao);
			$("#vehicleModel_e").val(vehicleModel);
			
			//点击确定时隐藏弹框，保存信息，并把信息填到主页里面去
			$('#insureVehicleMessage').click(function() {
				
				vehicleNum = $("#vehicleNum_e").val();
				vehicleNum = vehicleNum.toUpperCase();
				vehicleEngine = $("#vehicleEngine_e").val();
				cheJaHao = $("#cheJaHao_e").val();
				vehicleModel = $("#vehicleModel_e").val();
				
				//获取对象里的车主和车架号并判断是否一样
				var app = new InsMbsVehicleObj();
				var vehicle = app.getVehicle();
				var plate = vehicle.getLic_no();
				var iscross = false;
				if(plate != vehicleNum) {
					var area = app.getArea();
					var crossCity = area.getCrossCity();
					var carNoPrefix = area.getCarNoPrefix().trim();
					if(!crossCity){
						carNoPrefix = carNoPrefix.toUpperCase();
						var vCarNo = vehicleNum.substr(0,2);
						if((carNoPrefix.length == 1 && vehicleNum[0] != carNoPrefix) || (carNoPrefix.length > 1 && carNoPrefix.indexOf(vCarNo) < 0)){
							alertShow("您的车牌与上一页录入的不一致，请回上一页确认是否正确");
							iscross = true;
						}
					}
					
					if(!iscross){
						//弹出对话框
						Confirm({
							content: "您的车牌与上一页录入的不一致， 请确认当前车牌是否正确?",
							cancel: "取消",
							determine: "确定",
							callback: function(result) { //回调函数，传了cancel返回true，false,没传就没有返回值
								if(result) {
									saveVehicle(vehicleNum,vehicleEnroll,vehicleModel,cheJaHao,vehicleEngine);
								}
							}
						});
					}
				}else{
					saveVehicle(vehicleNum,vehicleEnroll,vehicleModel,cheJaHao,vehicleEngine);
				}
				$('.layer').hide();
				$('.user-message').hide();
			})
		},
		error: function(returndata) {
			loadingHide();
			alertShow("识别失败");
			$("#plateFile").val("")
		}
	});
}
function saveVehicle(vehicleNum,vehicleEnroll,vehicleModel,cheJaHao,vehicleEngine){
	var app = new InsMbsVehicleObj();
	var vehicle = app.getVehicle();
	vehicle.setLic_no(vehicleNum);
	app.setVehicle(vehicle);
	if(vehicleEnroll != null && vehicleEnroll.length >= 8){
		vehicleEnroll = vehicleEnroll.slice(0, 4) + "-" + vehicleEnroll.slice(4, 6) + "-" + vehicleEnroll.slice(6, vehicleEnroll.length);
	}

	if(vehicleModel != null && vehicleModel != ""){
		vehicleModel = vehicleModel.trim();
		$("#plate").val(vehicleModel);
	}

	if(cheJaHao != null && cheJaHao != ""){
		cheJaHao = cheJaHao.trim();
		$("#cheJaHao").val(cheJaHao);
	}

	if(vehicleEngine != null && vehicleEngine != ""){
		vehicleEngine = vehicleEngine.trim();
		$("#vehicleEngine").val(vehicleEngine);
	}
		
	if(vehicleEnroll != null && vehicleEnroll != ""){
		$("#enrollDate").val(vehicleEnroll);
	}
		
	//vehicle.setLic_no(vehicleNum);
	vehicle.setVin_no(cheJaHao);
	vehicle.setEngine_no(vehicleEngine);
	vehicle.setBrandName(vehicleModel);
	vehicleEnroll = new Date(vehicleEnroll);
	vehicle.setEnrollDate(vehicleEnroll.toFomatorString("YYYY-MM-DD"));
	app.setVehicle(vehicle);
}
//点击查询对输入框里的值进行验证和保存
$("#goNext").click(function() {
	var app = new InsMbsVehicleObj();
	var vehicletype = app.getVehicleType();
	vehicletype.setVehicleName() == null;
	app.setVehicleType(vehicletype);
	operVehicle();
});
//车型查找
function operVehicle() {

	var plate = $("#plate").val();
	var cheJaHao = $("#cheJaHao").val().trim();
	var vehicleEngine = $("#vehicleEngine").val().trim();
	var enrollDate = $("#enrollDate").val();
	if(plate != ""){
		if(plate.length < 6){
			alertShow("请输入6位以上的车牌型号名称");
			return;
		}
	}
	if(cheJaHao == "") {
		alertShow("车架号不能为空");
		return;
	}
	if(vehicleEngine == "") {
		alertShow("发动机号不能为空");
		return;
	}

	var app = new InsMbsVehicleObj();
	var vehicle = app.getVehicle();
	var lic_no = vehicle.getLic_no();
	if(lic_no == ""){
		var nowDate = new Date();
		nowDate.setMonth(nowDate.getMonth() - 9);
		var enDate = new Date(enrollDate);
		if(enDate < nowDate){
			alertShow("新车初登日期不能小于当前日期9个月");
			return;
		}
		
	}
	vehicle.setVin_no(cheJaHao);
	vehicle.setEngine_no(vehicleEngine);
	vehicle.setEnrollDate(enrollDate);
	app.setVehicle(vehicle);

	//  alert("第2也末尾"+vehicle.getLic_no());

	var title = '加载中,请稍候...';
	loadingShow(title);

	//从后台获取车型
	var oper = new InsMbsVehicleOpeation();
	oper.NewCarModelQuery(plate,vehicleEngine, cheJaHao, enrollDate, function(vs) {
		loadingHide();
		for(var i = 0; i < vs.length; i++) {
			(function(s) {

				var chexin = $("#result").clone();

				chexin.find(".introduce").html(s.getVehicleName() + " " + s.getCarYear() + " " + s.getSeatCount() + "座");
				chexin.find(".num").html(s.getPurchasePrice());
				chexin.show();
				$("#list").append(chexin);

				chexin.click(function() {
					$(".select").attr('src', '../images/ico_select_normal.png');
					chexin.find(".select").attr('src', '../images/ico_smallselect_pre.png');

					var app = new InsMbsVehicleObj();
					var vehicleType = app.getVehicleType();
					vehicleType.setVehicleName(s.getVehicleName());
					vehicleType.setCarYear(s.getCarYear());
					vehicleType.setSeatCount(s.getSeatCount());
					vehicleType.setPurchasePrice(s.getPurchasePrice());
					vehicleType.setPurchasePricetax(s.getPurchasePricetax());
					vehicleType.setJsonObj(s.getJsonObj());
					vehicleType.setCountriesType(s.getCountriesType());
					app.setVehicleType(vehicleType);

//					$("#plate").val(s.getVehicleName());
					var vehicle = app.getVehicle();
					vehicle.setBrandName(s.getVehicleName());
					app.setVehicle(vehicle);
				});

			})(vs[i])

		}
		if(vs.length != "") {
			//点击车型查找，车架号等不能修改
			$("#cheJaHao").attr("disabled", "disabled");
			$("#plate").attr("disabled", "disabled");
			$("#vehicleEngine").attr("disabled", "disabled");
			//$("#enrollDate").attr("disabled","disabled");

			$("#goNext").hide();
			$(".search-result").show();
			$('.tip').show();
			$("#bj").show();
		}
	});
}

//不是以上车型事件
$("#noVehicleModel").click(function() {
	//点击不是以上车型就可以修改车架号等
	$("#cheJaHao").removeAttr("disabled");
	$("#plate").removeAttr("disabled");
	$("#vehicleEngine").removeAttr("disabled");
	$("#enrollDate").removeAttr("disabled");

	$(".result").hide();
	$("#goNext").show();
	$('.tip,.result,.search-result,.bj,.tip-mess').hide();
});

//点击报价把需要的参数带到下页
$("#bj").click(function() {
	var app = new InsMbsVehicleObj();
	var vehicletype = app.getVehicleType();

	/**
	 * 修改初登日期
	 */
	var vehicle = app.getVehicle();
	var enrollDate = $("#enrollDate").val();
	vehicle.setEnrollDate(enrollDate);
	app.setVehicle(vehicle);

	if(!vehicletype.getVehicleName().isEmpty()) {
		var app = new InsMbsVehicleOpeation();
		var isReQuote = sessionStorage.getItem("isReQuote");
		
		var title = '加载中,请稍候...';
		loadingShow(title);
		
		if(isReQuote == "true"){
			goNextPage();
		}
		
		app.serarchDefaultKinds(function(vs) {
			loadingHide();
			goNextPage();
		});
	} else {
		alertShow("请选择车型");
		return;
	}
});

function goNextPage() {
	//	window.location.href = 'ins_quotation.html?action=newpage&from=carinfo'
	window.location.href = 'ins_kinds_modify.html?show=true';
}

$(".calender").on("click",function(){
	$("#enrollDate").click();
})

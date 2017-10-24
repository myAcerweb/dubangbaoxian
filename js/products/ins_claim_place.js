//页面初始化
window.onload = function () {
//	window.location.reload();
    loadingHide();

    initPage();

    getAccount();
}

//点击选择保单邮寄地址
$("#address").click(function () {
    var quotationNo = MobileApp.getParameterValue("quotationNo");
    window.location.href = "ins_mail_address.html?action=nextpage&quotationNo=" + quotationNo;
});

//点击联系人填写信息
$(".setMessage").click(function (index) {
    var message = $(".setMessage").index($(this));
    var buyCon = MobileApp.getParameterValue("buyCon");
    if (message == 0) {
        var quotationNo = MobileApp.getParameterValue("quotationNo");
        localStorage.setItem("message", message);
        window.location.href = "ins_car_owner_info.html?action=nextpage&quotationNo=" + quotationNo + "&buyCon=" + buyCon;
    } else {
        var src2 = $(this).find(".user-check").attr("src");
        if (src2 != "../images/ico_tongchezhu_pre.png") {
            localStorage.setItem("message", message);
            var quotationNo = MobileApp.getParameterValue("quotationNo");
            window.location.href = "ins_car_owner_info.html?action=nextpage&quotationNo=" + quotationNo + "&buyCon=" + buyCon;
        }
    }
});

function fillPage(quationVo) {
    //投保城市初始化

    $("#area").html(quationVo.quotationVo.areaName);
    for (var i = 0; i < quationVo.quoPros.length; i++) {
        var itm = quationVo.quoPros[i];
        if (itm.productionTypeCode == "0590") {
            //交强险
            $("#jiaoqiangjia").html("￥  " + itm.premium);
            $("#chechuansui").html("￥  " + itm.payTax);
            $("#taxOverdue").html("￥  " + itm.taxOverdue);
            $("#surCharge").html("￥  " + itm.surCharge);
            $("#jiaoqiri").html(itm.startDate);
            $("#jqzb").html(endHour(itm.endDate));
            $("#jiaoqianxian").show();

//			$("#jiaoqiangxian").css("display","block");
//			$("#jiaoqiangxian").show();
//			$('#ci_start').html(itm.startDate);
        }
        //展示商业险
        if (itm.productionTypeCode == "0508") {
            $("#shangyexian").show();
            $("#bg").show();
            $('#bi_start').html(itm.startDate);
            $('#syzb').html(endHour(itm.endDate));
            var it = quationVo.quoDets;
            for (var j = 0; j < it.length; j++) {
                var xiangqing = $(".xiangqing").eq(0).clone();
                if (it[j].amount == 0) {
                    xiangqing.find(".chebaoe").hide();
                }
                var baoe = (it[j].amount / 10000).toFixed(2);
                xiangqing.find(".chebaoe").html(baoe + "万  ");
                xiangqing.find(".chebaojia").html("￥  " + it[j].fee);
                xiangqing.find("#name").html(it[j].insuranceTypeName);
                if (it[j].amount == null) {
                    xiangqing.hide();
                } else {
                    xiangqing.show();
                }
                $("#bg").append(xiangqing);
            }
        }
    }
    $("#zhonge").html(quationVo.quotationVo.totalFee);
    //获取车辆信息
    var vehicle = quationVo.quotationVehicleVo
    var plate = vehicle.licenseNo;
    var model = vehicle.brandCN;
    var chejiahao = vehicle.vinNo;
    var vehicleEngine = vehicle.engineNo;
    var enrollData = vehicle.enrollDate;

    $("#plate").html(plate);
    $("#model").html(model);
    $("#chejiahao").html(chejiahao);
    $("#vehicleEngine").html(vehicleEngine);
    $("#enrollDate").html(enrollData);

    //车主信息
    var app = new InsMbsVehicleObj();
    var vehicelOwner = app.getVehicleOwner();
    vehicelOwner.setName(vehicle.carOwner);
    vehicelOwner.setLic_no(vehicle.certNo);
    app.setVehicleOwner(vehicelOwner);

    $("#shifujia").html(quationVo.quotationVo.totalFee);

    var isBuy = MobileApp.getParameterValue("buyCon");
    if (isBuy === "true") {
        var obj = new InsMbsVehicleObj();
        var production = obj.getProductions();
        var amount = production.getProdAmount();
        var copy = sessionStorage.getItem("COPY");
        if(copy!="0"){
        		$("#shifujia").html(parseFloat(quationVo.quotationVo.totalFee) + parseFloat(amount) * parseInt(copy));
       	 	$("#zhonge").html(parseFloat(quationVo.quotationVo.totalFee) + parseFloat(amount) * parseInt(copy));
       	 	$("#extfee").html( parseFloat(amount) * parseInt(copy));
        }else{
        		$("#extfee_holder").hide();
        }
  
    }else{
    		 $("#extfee_holder").hide();
    }

}

function initPage() {
    var app = new InsMbsVehicleObj();
    //邮寄地址初始化
    var addr3 = localStorage.getItem("addr3");
    if (addr3 != null && addr3 != "") {
        addr3 = JSON.parse(addr3);
        $("#reciver_name").html(addr3.name);
        $("#reciver_cellphone").html(addr3.mobile);
        $("#reciver_addr").html(addr3.province + addr3.city + addr3.address);
    }

    //车主信息初始化
    var vehicleOwner = app.getVehicleOwner();
    var owner = vehicleOwner.getName();
    var ownerPhone = vehicleOwner.getCellphone();
    var id = vehicleOwner.getLic_no();
    var detailArea = vehicleOwner.getAddress();
    $("#owner_name").html(owner);
    $("#owner_cellphone").html(ownerPhone);

    //投保人信息
    var buyer = app.getBuyer();
    if (buyer.getName().isEmpty()) {
        buyer.setName(owner);
        buyer.setCellphone(ownerPhone);
        buyer.setLic_no(id);
        buyer.setAddress(detailArea);
        app.setBuyer(buyer);
        $("#toubaoren").attr('src', "../images/ico_tongchezhu_pre.png");
        $("#buyer_name").html(owner);
        $("#buyer_cellphone").html(ownerPhone);
    } else {
        $("#buyer_name").html(buyer.getName());
        $("#buyer_cellphone").html(buyer.getCellphone());
        $("#toubaoren").attr('src', "../images/ico_tongchezhu_normal.png")
    }

    //被保人信息
    var benefit = app.getBenefit();
    if (benefit.getName().isEmpty()) {
        benefit.setName(owner);
        benefit.setCellphone(ownerPhone);
        benefit.setLic_no(id);
        benefit.setAddress(detailArea);
        app.setBenefit(benefit);
        $("#beibaoren").attr('src', "../images/ico_tongchezhu_pre.png");
        $("#benifit_name").html(owner);
        $("#benifit_cellphon").html(ownerPhone);
    } else {
        $("#benifit_name").html(benefit.getName());
        $("#benifit_cellphon").html(benefit.getCellphone());
        $("#beibaoren").attr('src', "../images/ico_tongchezhu_normal.png")
    }

    var quotationNo = MobileApp.getParameterValue("quotationNo");

    if (quotationNo != "") {
        //获取报价信息
        var title = '加载中,请稍候...';
        loadingShow(title);
        var oper = new InsMbsVehicleOpeation();
        oper.getQuotation(quotationNo, function (vo) {
            loadingHide();
            fillPage(vo);
            if (vo.quotationVo.status == '2') {
                //判断报价是否失效
                var beginsecond = MobileApp.getParameterValue("createTime");
                var endsecond = new Date().getTime();
                var days = (endsecond - beginsecond) / (24 * 3600 * 1000);
                if (days > 1) {
                    alertShow("此份报价已经失效，请联系我们重新给您报价，谢谢！");
                    return;
                }
                $("#zhifuye").show();
            }
        });
        return;
    }
}

function getAccount() {
    var account = MobileApp.getCookie("account");
    if (account == "") {
        //		return;
        //account = "E18E76997CDB";
        checkAccount();
        return;
    }
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };

    MobileApp.sendRequest(req, function (res) {
        //隐藏转圈
        loadingHide();
        res = JSON.parse(res);
        if (res.result) {
            var acc = res.payload.accountVo;
            var add = {
                province: acc.province,
                city: acc.city,
                address: acc.address
            }
            sessionStorage.setItem("accountAddress", JSON.stringify(add));
        } else {
            alert(res.error);
        }
    });
}

//投保人信息是否同车主
$(".vehicleOwner").click(function (el, index) {
    el.stopPropagation();
    var src1 = $(this).attr("src");
    var app = new InsMbsVehicleObj();
    if (src1 == "../images/ico_tongchezhu_pre.png") {
        $(this).attr('src', "../images/ico_tongchezhu_normal.png");

        //如果不是同车主把对象里的信息显示出来
        if ($(".vehicleOwner").index($(this)) == 0) {

            var buyer = app.getBuyer();
            var buyerName = buyer.getName();
            var buyerPhone = buyer.getCellphone();
            $("#buyer_name").html(buyerName);
            $("#buyer_cellphone").html(buyerPhone);
        }
        if ($(".vehicleOwner").index($(this)) == 1) {

            var benefit = app.getBenefit();
            var benefitName = benefit.getName();
            var benfitPhone = benefit.getCellphone();
            $("#benifit_name").html(benefitName);
            $("#benifit_cellphon").html(benfitPhone);
        }

    } else {
        $(this).attr('src', "../images/ico_tongchezhu_pre.png");
        //如果选中是同车主把车主信息显示出来
        var vehicleOwner = app.getVehicleOwner();
        var owner = vehicleOwner.getName();
        var ownerPhone = vehicleOwner.getCellphone();
        var id = vehicleOwner.getLic_no();
        if ($(".vehicleOwner").index($(this)) == 0) {
            var buyer = app.getBuyer();
            buyer.setName(vehicleOwner.getName());
            buyer.setCellphone(vehicleOwner.getCellphone());
            buyer.setLic_no(vehicleOwner.getLic_no());
            buyer.setAddress(vehicleOwner.getAddress());
            buyer.setEmail(vehicleOwner.getEmail());
            buyer.setProvince(vehicleOwner.getProvince());
            buyer.setCity(vehicleOwner.getCity());
            app.setBuyer(buyer);
            $("#buyer_name").html(buyer.getName());
            $("#buyer_cellphone").html(buyer.getCellphone());
        }
        if ($(".vehicleOwner").index($(this)) == 1) {
            var benefit = app.getBenefit();

            benefit.setName(vehicleOwner.getName());
            benefit.setCellphone(vehicleOwner.getCellphone());
            benefit.setLic_no(vehicleOwner.getLic_no());
            benefit.setAddress(vehicleOwner.getAddress());
            benefit.setEmail(vehicleOwner.getEmail());
            benefit.setProvince(vehicleOwner.getProvince());
            benefit.setCity(vehicleOwner.getCity());
            app.setBenefit(benefit);

            $("#benifit_name").html(benefit.getName());
            $("#benifit_cellphon").html(benefit.getCellphone());
        }
    }
    ;
});

//cnavas签字
//$("#sign_btn").click(function() {
//	$("#signature-pad").show();
//	var wrapper = document.getElementById("signature-pad"),
//	clearButton = wrapper.querySelector("[data-action=clear]"),
//	saveButton = wrapper.querySelector("[data-action=save]"),
//	canvas = wrapper.querySelector("canvas"),
//	signaturePad;
//	$("#signature-pad").css({
//		position:"fixed",
//		height:"10rem",
//		width:"7rem",
//		top:"3rem",
//		left:"3rem",
//		fontSize:60,
//	});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
//	function resizeCanvas() {
//		// When zoomed out to less than 100%, for some very strange reason,
//		// some browsers report devicePixelRatio as less than 1
//		// and only part of the canvas is cleared then.
//		var ratio = Math.max(window.devicePixelRatio || 1, 1);
//		canvas.width = canvas.offsetWidth * ratio;
//		canvas.height = canvas.offsetHeight * ratio;
//		canvas.getContext("2d").scale(ratio, ratio);
//	}

//	window.onresize = resizeCanvas;
//	resizeCanvas();
//
//	signaturePad = new SignaturePad(canvas);
//
//	clearButton.addEventListener("click", function(event) {
//		console.log(1);
//		signaturePad.clear();
//	});
//
//	saveButton.addEventListener("click", function(event) {
//		if(signaturePad.isEmpty()) {
//			alert("Please provide signature first.");
//		} else {
//			window.open(signaturePad.toDataURL());
//		}
//	});
//});

//投保按钮操作
$("#now-pay").unbind().click(function () {
    if ($("#checked").attr("src") == "../images/ico_radio——normal.png") {
        return;
    }
    var addr3 = JSON.parse(localStorage.getItem("addr3"));
    if (addr3 == "" || addr3 == null) {
        addr3 = {};
    }
    var title = '加载中,请稍候';
    loadingShow(title);
    var oper = new InsMbsVehicleOpeation();
    oper.insure(addr3, function (vs) {
        loadingHide();
        if (vs) {
            //if(vs!="false"){
            //$("#jine").html($("#shifujia").text());
            $("#zhifuye").show();
            //}
        }
        ;
    });
});

//条款是否同意
$("#checked").click(function () {
    if ($(this).attr("src") == "../images/ico_xuanzhong.png") {
        $(this).attr("src", "../images/ico_radio——normal.png");
        $("#now-pay").css({background: "#bdbdbd"});
    } else {
        $(this).attr("src", "../images/ico_xuanzhong.png");
        $("#now-pay").css({background: "#d3a27c"});
    }
})

//选择支付
var pay_index = -1;
$(".zhifu").click(function () {
    $(".zhifu").find("img").attr("src", "../images/ico_select_normal.png");
    $(this).find("img").attr("src", "../images/ico_select_pre.png");
    //zhifuIndex保存当前选中的是哪一种支付方式
    pay_index = $(".zhifu").index($(this));
});

//点击立即支付
$("#lijizhifu").click(function () {

    //选择微信支付
    if (pay_index == 0) {
        var title = '加载中,请稍候...';
        loadingShow(title);
        var oper = new InsMbsVehicleOpeation();
        oper.OnlinePay("1", "", function (tr, vs) {
            loadingHide();
            localStorage.setItem("erweima", vs.codeurlBase64);

            //订单号：
            localStorage.setItem("sourceOrder", vs.sourceOrder);

            window.location.href = "ins_pay_wechat.html?action=nextpage"
        });
    }
    //选择通连支付
    if (pay_index == 1) {
        window.location.href = "ins_Communications.html?action=nextpage"
    }
    //选择pos支付
    if (pay_index == 2) {
        alertShow("POS刷卡后请到我的订单查看状态");
        history.go(-1);
    }
    //选择微信立即支付
    if (pay_index == 3) {
        window.location.href = "ins_lijiPay.html?action=nextpage"
    }
    if (pay_index == -1) {
        alertShow("请选择支付方式");
    }
});

function endHour(time) {
    time = time.replace(/-/g, '/');
    time = new Date(time);
    time.setSeconds(time.getSeconds() - 1);
    var endHour = time.toFomatorString("YYYY-MM-DD");
    endHour += " 24:00:00";
    return endHour;

}
//初始化页面
window.onload = function () {
    initPage();
    //起保日期Date触发事件
    $("#sqri").click(function () {
        document.getElementById("ciInput").click();
    });
    $("#ciInput").change(function () {
        $("#ci").html($("#ciInput").val());
    })
    userChecker();
}
var cikind;
var app = new InsMbsVehicleObj();
//车型对象
var vehicleType = app.getVehicleType();
//车辆对象
var vehicle = app.getVehicle();
//是否显示选择出单员弹框
var isShow = MobileApp.getParameterValue("show");

function initPage() {
    $("#ci_btn").change(function () {
        if ($("#ci_btn").is(":checked")) {
            newkinds.push(cikind);
        } else {
            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == "BZ") {
                    newkinds.splice(i, 1);
                    break;
                }
            }
        }
    });
    $("#quote").click(function () {

        if ($("#ci_btn").is(":checked")) {
            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == "BZ") {
                    newkinds.splice(i, 1);
                    break;
                }
            }
            newkinds.push(cikind);
        }

        for (var i = 0; i < newkinds.length; i++) {
            if (newkinds[i] != null) {
                if (newkinds[i].kindCode == "Q4") {
                    var CountriesType = vehicleType.getCountriesType();
                    var amount1 = 10;
                    var amount2 = 60;
                    if (CountriesType == "0") {
                        var amount1 = 10;
                        var amount2 = 60;
                    } else if (CountriesType == "1") {
                        var amount1 = 10;
                        var amount2 = 30;
                    } else if (CountriesType == "2") {
                        var amount1 = 15;
                        var amount2 = 60;
                    }
                    if (newkinds[i].amount < amount1 || newkinds[i].amount > amount2) {
                        alertShow("指定修理厂险费率不得高于【" + amount2 + "】或者低于【" + amount1 + "】");
                        return false;
                    }
                }
                if (newkinds[i].kindCode == "T") {
                    if (newkinds[i].quantity >= 100 || newkinds[i].quantity <= 0) {
                        alertShow("修理期间费用补偿险天数必须大于等于1天且不能大于100天");
                        return false;
                    }
                    if (newkinds[i].unitAmount <= 0) {
                        alertShow("修理期间费用补偿险日赔偿限额必须大于0元");
                        return false;
                    }
                }
                if (newkinds[i].kindCode == "R") {
                    if (newkinds[i].amount <= 0) {
                        alertShow("精神损害抚慰金责任险保额必须大于0元");
                        return false;
                    }
                }
                if (newkinds[i].kindCode == "F") {
                    newkinds[i].amount = newkinds[i].amount.split(".")[0];
                }
            }
        }
        app.setKinds(newkinds);

        vehicle.setStartDateBi($("#bi").val());
        vehicle.setStartDateCi($("#ci").val());
        app.setVehicle(vehicle);

        var newdate = (new Date()).toFomatorString("YYYY-MM-DD 00:00:00");
        var enrollDate = new Date(vehicle.getEnrollDate());
        enrollDate.setMonth(enrollDate.getMonth() + 9);
        enrollDate = enrollDate.toFomatorString("YYYY-MM-DD 00:00:00");
        for (var i = 0; i < newkinds.length; i++) {
            if (newkinds[i].kindCode == "BZ") {
                /*if(enrollDate > vehicle.getStartDateCi()){
		    		alertShow("交强险起保日期必须在初登日期9个月之后");
		            return;
		    	};*/
                if (vehicle.getStartDateCi() <= newdate) {
                    alertShow("交强险起保日期不能小于等于当前日期");
                    return;
                }
                ;
                if (vehicle.getStartDateCi() > day) {
                    alertShow("交强险起保日期不能大于当前日期90天");
                    return;
                }
                ;
            } else {
                var newdate = (new Date()).toFomatorString("YYYY-MM-DD 00:00:00");
                /*if(enrollDate > vehicle.getStartDateCi()){
		    		alertShow("商业险起保日期必须在初登日期9个月后");
		            return;
		    	};*/
                if (vehicle.getStartDateBi() <= newdate) {
                    alertShow("商业险起保日期不能小于等于当前日期");
                    return;
                }
                ;

                var day = ((new Date()).addDays(90)).toFomatorString("YYYY-MM-DD 00:00:00");
                if (vehicle.getStartDateBi() > day) {
                    alertShow("商业险起保日期不能大于当前日期90天");
                    return;
                }
                ;
            }
        }

        if (isShow == "true") {
            $("#chooseDialog").show();
        } else {
            quote();
        }
    });

    //初始化数据
    getQuotationKindlists();

    var biDate = vehicle.getStartDateBi();
    var ciDate = vehicle.getStartDateCi();

    var bday = biDate.toDate();
    var cday = ciDate.toDate();

    var day = new Date();
    var minDay = day.addDays(1);
    var maxDay = day.addDays(90);

    if (minDay <= cday && cday <= maxDay) {
        $("#ci").val(cday.toFomatorString("YYYY-MM-DD"));
    } else {
        $("#ci").val(minDay.toFomatorString("YYYY-MM-DD"));
    }

    if (minDay <= bday && bday <= maxDay) {
        $("#bi").val(bday.toFomatorString("YYYY-MM-DD"));
    } else {
        $("#bi").val(minDay.toFomatorString("YYYY-MM-DD"));
    }

    $("#ci").attr('min', minDay.toFomatorString("YYYY-MM-DD"));
    $("#bi").attr('min', minDay.toFomatorString("YYYY-MM-DD"));

    $("#ci").attr('max', maxDay.toFomatorString("YYYY-MM-DD"));
    $("#bi").attr('max', maxDay.toFomatorString("YYYY-MM-DD"));

    //	var setDate = document.querySelectorAll('.sj');
    //	for(var i = 0; i < setDate.length; i++) {
    //		setDate[i].valueAsDate = new Date()
    //	}
}

//选择开关，调整是否显示详细信息
// $(".mui-switch").click(function(){
// 	if($(this).get(0).checked){
// 		$(this).closest('.xianzhong').css({height:"1.7rem"});
// 	}else{
// 		$(this).closest('.xianzhong').css({height:"0.92rem"});
// 	};
// 	console.log($("#" + $(this).val()).val());//保存
// });


/**
 * 之前选择的险别
 */
var kinds = [];
var newkinds = [];

function initInsaureType(e) {
    var list = $("#kind_list");
    var item = $("#insurance_A").clone();
    item.attr("id", "ins" + e.kindCode);
    item.show();

    /**
     * 交强险配置去掉
     */
    for (var i = 0; i < kinds.length; i++) {
        if ("BZ" == kinds[i].kindCode) {
            $("#ci_btn").attr("checked", true);
        }
    }
    if (e.kindCode == "BZ") {
        cikind = e;
        return;
    }

    /**
     * 默认险别
     */
    item.find(".mui-switch").attr("checked", false);
    item.find(".content").hide();
    for (var i = 0; i < kinds.length; i++) {
        if (e.kindCode == kinds[i].kindCode) {
            item.find(".mui-switch").attr("checked", true);
            item.find(".content").show();
            /**
             * 之前的选择赋值到新的对象
             */
            e.amount = kinds[i].amount;
            e.unitAmount = kinds[i].unitAmount;
            e.isDefault = kinds[i].isDefault;
            e.isDefaultNoDuct = kinds[i].isDefaultNoDuct;
            e.quantity = kinds[i].quantity;
            /**
             * 保存到新的对象
             */
            newkinds.push(kinds[i]);
            break;
        }
    }

    (function (s, iitem) {
        iitem.find(".mui-switch").change(function () {
            if (iitem.find(".mui-switch").is(":checked")) {
                if (s.kindCode == "B") {
                    $("#insR").show();
                }
                if (s.kindCode == "A") {
                    var ins = "#insF,#insZ,#insL,#insX1,#insQ4,#insT,#insS";
                    $(ins).show();
                }
                if (s.kindCode != "B" && !$("#insB .mui-switch").is(":checked")) {
                    iitem.find(".mui-switch").prop("checked", false);
                    alertShow("请先选择 第三者责任保险");
                    return;
                }
                var _ins = ["G", "F", "X1", "Z", "L", "Q4", "S", "T"];
                if ((_ins.indexOf(s.kindCode) >= 0) && !$("#insA .mui-switch").is(":checked")) {
                    iitem.find(".mui-switch").prop("checked", false);
                    alertShow("请先选择 车辆损失保险");
                    return;
                }
                if (s.kindCode == "D4" && !$("#insD3 .mui-switch").is(":checked")) {
                    iitem.find(".mui-switch").prop("checked", false);
                    alertShow("请先选择 驾驶员责任险");
                    return;
                }
                iitem.find(".content").show();
                newkinds.push(e);
            } else {
                var kindCode = new Array();
                kindCode.push(s.kindCode)
                if (s.kindCode == "B") {
                    $("[id^='ins'] .mui-switch").prop("checked", false);
                    $("[id^='ins'] .content").hide();
                    var ins = "#insR,#insF,#insZ,#insL,#insX1,#insQ4,#insT,#insS";
                    $(ins).hide();
                    kindCode.push('A', 'G', 'D3', 'D4', 'R', 'F', 'Z', 'L', 'X1', 'Q4', 'S');
                }
                if (s.kindCode == "A") {
                    var _ins = "#insG,#insF,#insX1,#insZ,#insL,#insQ4,#insS,#insT"
                    $(_ins).find(".mui-switch").prop("checked", false);
                    $(_ins).find(".content").hide();
                    var ins = "#insF,#insZ,#insL,#insX1,#insQ4,#insT,#insS"
                    $(ins).hide();
                    kindCode.push('G', 'F', 'Z', 'L', 'X1', 'Q4', 'T', 'S');
                }
                if (s.kindCode == "D3") {
                    $("#insD4").find(".mui-switch").prop("checked", false);
                    $("#insD4").find(".content").hide();
                    kindCode.push('D4');
                }
                iitem.find(".content").hide();
                for (var i = newkinds.length - 1; i >= 0; i--) {
                    for (var j = 0; j < kindCode.length; j++) {
                        if (newkinds[i].kindCode == kindCode[j]) {
                            newkinds.splice(i, 1);
                            break;
                        }
                    }
                }
            }

        });
    })(e, item)


    /**
     * 不计免赔处理
     */
    if (e.isNoDuctEnable == "1") {
        if (e.isDefaultNoDuct == "1") {
            e.isNoDuty = true;
            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == e.kindCode) {
                    newkinds[i].isNoDuty = e.isNoDuty;
                    break;
                }
            }
            item.find("#ico_bjmp_pre").attr('src', "../images/ico_bjmp_pre.png");
        } else {
            e.isNoDuty = false;
            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == e.kindCode) {
                    newkinds[i].isNoDuty = e.isNoDuty;
                    break;
                }
            }
            item.find("#ico_bjmp_pre").attr('src', "../images/ico_bjmp_normal.png");

        }
        //不计免赔  选中/未选中
        item.find(".noducty").click(function () {
            if (e.isNoDuty == true) {
                e.isDefaultNoDuct = "0"
                e.isNoDuty = false;
                for (var i = 0; i < newkinds.length; i++) {
                    if (newkinds[i].kindCode == e.kindCode) {
                        newkinds[i].isNoDuty = e.isNoDuty;
                        newkinds[i].isDefaultNoDuct = e.isDefaultNoDuct;
                        break;
                    }
                }
                ;

            } else {
                e.isDefaultNoDuct = "1"
                e.isNoDuty = true;
                for (var i = 0; i < newkinds.length; i++) {
                    if (newkinds[i].kindCode == e.kindCode) {
                        newkinds[i].isNoDuty = e.isNoDuty;
                        newkinds[i].isDefaultNoDuct = e.isDefaultNoDuct;
                        break;
                    }
                }
            }

            if (e.isNoDuty == true) {
                item.find("#ico_bjmp_pre").attr('src', "../images/ico_bjmp_pre.png");
            } else {
                item.find("#ico_bjmp_pre").attr('src', "../images/ico_bjmp_normal.png");
            }
            ;
        });
    } else {
        item.find(".noducty").hide();
    }

    //险别名称
    item.find(".kindName").html(e.kindName);
    /**
     * 保额
     */
    var entryValueVos = e.entryValueVos;
    item.find(".money").val(e.amount);
    if (e.entryType == "none") {
        item.find(".money").addClass('none');
        item.find("#baoee").addClass("none");
    }
    if (e.entryType == "list" && entryValueVos.length > 0) {
        for (var v = 0; v < entryValueVos.length; v++) {
            var money = $("#noe").clone();
            money.val(entryValueVos[v].value);
            money.html(entryValueVos[v].entryConent);
            //设置默认选中
            var amount = e.amount;
            var amount = amount.split(".");
            item.find("#baoe").val(amount[0]);

            money.show();
            item.find("#baoe").append(money);
            item.find("#baoe").show();
        }

        item.find("#baoe").change(function () {
            var amount = item.find("#baoe").val();
            if (e.kindCode == "D4" || e.kindCode == "D3") {
                e.unitAmount = amount;
                for (var i = 0; i < newkinds.length; i++) {
                    if (newkinds[i].kindCode == e.kindCode) {
                        newkinds[i].unitAmount = e.unitAmount;
                        break;
                    }
                }
            }
            e.amount = amount;
            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == e.kindCode) {
                    newkinds[i].amount = e.amount;
                    break;
                }
            }
        });
    } else {
        item.find(".money").show();
        item.find("#baoe").hide();
        if (e.kindCode == 'A' || e.kindCode == 'G' || e.kindCode == 'Z') {
            /*var quotation = app.getQuotation();
            var quoDets = quotation.quoDets;
            var amount = "";
            if (quoDets) {
                $(quoDets).each(function(index, item) {
                    if (item.insuranceTypeNo == "A") {
                        amount = item.amount;
                    }
                });
            }
            item.find(".money").val(amount);
            item.find(".money").attr("disabled", "disabled");*/
            item.find("#baoee").html("提交报价后自动计算保额");
            item.find(".money").hide()
        }

        if (e.kindCode == 'T') {
            item.find("#quantity").val(e.quantity);
            item.find(".money").val(e.unitAmount);
            item.find("#baoee").text("保额/天");
        }

        //if(e.kindCode == 'A'){
        //	var obj = new InsMbsVehicleObj();
        //	var vehicleType = obj.getVehicleType();
        //	var res = JSON.parse(vehicleType.jsonObj);
        //	var min = res.purchasePrice*0.7;
        //	var max = res.purchasePrice*1.3;
        //
        //	min = min.toFixed(0);
        //	max = max.toFixed(0);
        //
        //	item.find("#baoee").text("保额\r\n("+min+"00-"+max+"00)");
        //	item.find("#baoee").css("left","38%");
        //}

        //if(e.kindCode == 'A'){
        //	item.find("#baoee").text("(20-30)");
        //	item.find("#baoee").css("left","38%");
        //}

        if (e.kindCode == 'Q4' || e.kindCode == 'R' || e.kindCode == 'L') {
            //指定修理厂险
            if (e.kindCode == 'Q4') {
                var CountriesType = vehicleType.getCountriesType();
                if (CountriesType == "0") {
                    item.find("#baoee").text("费率(10-60)");
                    item.find("#baoee").css("left", "45%");
                } else if (CountriesType == "1") {
                    item.find("#baoee").text("费率(10-30)");
                    item.find("#baoee").css("left", "45%");
                } else if (CountriesType == "2") {
                    item.find("#baoee").text("费率(30-60)");
                    item.find("#baoee").css("left", "45%");
                }

            }

            item.find(".amount").change(function () {
                e.amount = item.find(".amount").val();
                for (var i = 0; i < newkinds.length; i++) {
                    if (newkinds[i].kindCode == e.kindCode) {
                        newkinds[i].amount = e.amount;
                        break;
                    }
                }
            });
        }
        ;
    }

    //修理期间费用补偿险
    if (e.kindCode == 'T') {
        item.find("#tianshu").show();
        item.find("#quantity").show();

        item.find("#quantity").change(function () {
            var quantity = item.find("#quantity").val();

            e.quantity = quantity;

            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == e.kindCode) {
                    newkinds[i].quantity = e.quantity;
                    break;
                }
            }
            ;
        });
    }
    if (e.kindCode == 'T') {
        item.find(".amount").change(function () {
            var unitAmount = item.find(".amount").val();

            e.unitAmount = unitAmount;

            for (var i = 0; i < newkinds.length; i++) {
                if (newkinds[i].kindCode == e.kindCode) {
                    newkinds[i].unitAmount = e.unitAmount;
                    break;
                }
            }
        });
    }


    // 乘客意外
    if (e.kindCode == 'D4') {
        item.find(".money").val(e.unitAmount);
        item.find("#tianshu").show();
        item.find("#quantity").show();
        item.find("#tianshu").text("座位数");
        item.find("#tianshu").css("top", "0.3rem");
        item.find("#tianshu").css("left", "50%");
        item.find("#quantity").css("top", "0.3rem");
        item.find("#quantity").css("left", "65%");
        item.find("#quantity").attr("disabled", true);
        var SeatCount = parseInt(vehicleType.getSeatCount());
        item.find("#quantity").val(SeatCount - 1);
        item.find("#baoee").text("保额/人");
    }

    list.append(item);
}


function getQuotationKindlists() {
    kinds = app.getKinds();
    newkinds = new Array();
    var oper = new InsMbsVehicleOpeation();
    oper.serarchKinds(function (vs) {

        for (var j = 0; j < vs.length; j++) {
            var e = vs[j];
            if (e.isEnable != "0") {
                //kinddetail(e).init();
                if (e.isNonVehicle == true) {
                    continue;
                }
                initInsaureType(e);
            }
        }

        var B = $("#insB .mui-switch").is(":checked");//三者险
        var A = $("#insA .mui-switch").is(":checked");//车损险
        if (!A) {
            var _ins = "#insG,#insF,#insX1,#insZ,#insL,#insQ4,#insS,#insT"
            $(_ins).find(".mui-switch").prop("checked", false);
            $(_ins).find(".content").hide();
            var ins = "#insF,#insZ,#insL,#insX1,#insQ4,#insT,#insS"
            $(ins).hide();
        }
        if (!B) {
            $("[id^='ins'] .mui-switch").prop("checked", false);
            $("[id^='ins'] .content").hide();
            $("#insR").hide();
        }
    })
}


function quote(req) {
    var reQuotationNo = MobileApp.getParameterValue("reQuotationNo");
    if (reQuotationNo) {
        if (req) {
            req.reQuotationNo = reQuotationNo;
        } else {
            req = {
                "reQuotationNo": reQuotationNo
            }
        }
    }
    var title = '报价中,请稍候...';
    loadingShow(title);
    var oper = new InsMbsVehicleOpeation();
    //	报价失败次数
    var num = 0;
    oper.quotation("", function (vs, error) {
        loadingHide();
        if (vs) {
            var vp = vs.quoVerifyPart;
            if (vp != null && vp.checkcodeBi == null && vp.checkcodeCi == null && vp.checkcode != "") {
                showYZM(vp.checkcode);
                sessionStorage.setItem("pmqueryno", vp.pmqueryno);
                return;
            }
            if (vs.quotationVo) {
                window.location.replace("ins_quotation.html?quotationNo=" + vs.quotationVo.quotationNo);
            } else {
                window.location.replace("ins_quotation.html");
            }
        } else {
            alertShow(error);
        }
    }, req);
}

$(".now-pay").on("click", function () {
    var pmqueryno = sessionStorage.getItem("pmqueryno");
    var yzm = $(".img_input .input").val();

    if (yzm == "") {
        alertShow("请输入验证码");
        return;
    }

    var req = {"checkcode": yzm, "pmqueryno": pmqueryno};
    quote(req);

    hideYZM();
})

/**
 * 用户检查
 */
function userChecker() {
    /**
     * 网络获取
     */
    var account = MobileApp.getCookie("account");
    if (account == "") {
        checkAccount();
        return;
    }
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };
    var title = '加载中,请稍候...';
    loadingShow(title);
    MobileApp.sendRequest(req, function (res) {
        loadingHide();
        res = JSON.parse(res);
        if (res.result) {
            var list = res.payload;
            if (list == null || list == undefined) {
                isShow = "false";
                return;
            }
            initUser(list);
        } else {
            alertShow(res.error);
        }
    });
}

/*
 * 初始化机构出单员列表
 */
function initUser(list) {

    var listDiv = $("#userlist");
    var exts = list.exts;
    var type = list.accountVo.type;
    var isReQuote = sessionStorage.getItem("isReQuote");
    //散客、续保、重报价不需要选择出单员
    if (type === "User" || isReQuote === "true") {
        isShow = "false";
        return;
    }
    //只有一个出单员时，默认选择该出单员
    if (exts.length == 1) {
        var areacode = exts[0].areacode;
        var packagetype = exts[0].packagetype;
        var packagecode = exts[0].packageCode;
        var comcode = exts[0].comCode;
        var usercode = exts[0].org_usercode || exts[0].agency_usercodelist;
        set___xxx(usercode, comcode, areacode, packagetype, packagecode);
        isShow = "false";
        return;
    }
    //多个出单员，循环赋值

    for (var i = 0; i < exts.length; i++) {
        var userItem = $("#userItem").clone();

        userItem.find(".name").html(exts[i].org_username || exts[i].agency_username);
        userItem.find(".userCode").val(exts[i].org_usercode || exts[i].agency_usercodelist);

        userItem.find(".comCode").val(exts[i].comCode);
        userItem.find(".areaCode").val(exts[i].areacode);
        userItem.find(".packageType").val(exts[i].packagetype);
        userItem.find(".packageCode").val(exts[i].packageCode);

        userItem.find(".selected").attr("id", "id_" + i);
        userItem.find("label").attr("for", "id_" + i);
        userItem.removeClass("none");

        listDiv.append(userItem);
    }

}

/*
 * 
 */
$("#selectUser").on("click", function () {
    var item = $(".selected:checked");
    if (item.length == 0) {
        alertShow("请选择一个出单员");
        return;
    }

    var item = item.parent();
    var usercode = item.find(".userCode").val();
    var comcode = item.find(".comCode").val();
    var areacode = item.find(".areaCode").val();
    var packagetype = item.find(".packageType").val();
    var packagecode = item.find(".packageCode").val();

    set___xxx(usercode, comcode, areacode, packagetype, packagecode);

    $("#chooseDialog").hide();
    quote();
})

function set___xxx(usercode, comcode, areacode, packagetype, packagecode) {
    localStorage.setItem('orguser___xxx', usercode);
    localStorage.setItem('comcode___xxx', comcode);
    localStorage.setItem("areacode___xxx", areacode);
    localStorage.setItem("packagetype___xxx", packagetype);
    localStorage.setItem("packagecode___xxx", packagecode);
}

var isShare = false;
var link = location.href;
var title = '保费支付'; // 分享标题
var desc = '请给您的爱车付款'; // 分享描述
var imgUrl = '';
var totalFee = 0;
var maxCount = 1;

//初始化页面
window.onload = function () {
    //初始化用户
    userChecker();
}

/**
 * 初始化报价流程
 */
function initPage() {
	var app = new InsMbsVehicleObj();
	var vehicle=app.getVehicle();
	if(vehicle.getLic_no()==""){
		$("#copy").html('0')
	}
    var quotationNo = MobileApp.getParameterValue('quotationNo');
    var oper = new InsMbsVehicleOpeation();

    if (quotationNo === "") {
        var app = new InsMbsVehicleObj();
        var v = app.getQuotation();

        if (v.quoVerifyPart != null && v.quoVerifyPart.checkcode != "") {
            if (v.quoVerifyPart.checkcodeBi) {
                $("#checkcodeBi img").attr("src", "data:image/png;base64," + v.quoVerifyPart.checkcodeBi);
                $("#checkcodeBi").show()
            }
            if (v.quoVerifyPart.checkcodeCi) {
                $("#checkcodeCi img").attr("src", "data:image/png;base64," + v.quoVerifyPart.checkcodeCi);
                $("#checkcodeCi").show()
            }
            $("#yanzhengma").show();
        }
        return;
    }

    oper.quotation(quotationNo, function (vs, error) {
        loadingHide();
        if (vs) {

            if (vs.quoVerifyPart == null && vs.quotationVo == null) {
                alertShow("原始报价单不存在");
                $(".ttoast-btn").hide();
            }

            if (vs.quotationVo.status !== "1") {
                alertShow("此份报价已经失效，请联系我们重新给您报价，谢谢！");
                $(".ttoast-btn").hide();
            }

            $("#baojiaxingqing").show();
            $("#fukuan").show();
            if (vs != "" || vs != undefined || vs != null) {
                initQuotationBigVo(vs);
            }
        } else {
            alertShow(error);
        }
    });
}

$(".now-pay").on("click", function () {
    var title = '加载中,请稍候...';
    loadingShow(title);
    var app = new InsMbsVehicleObj();
    var vs = app.getQuotation();
    vs = vs.quoVerifyPart;
    var checkcodeBi = $("#checkcodeBi input").val();
    var checkcodeCi = $("#checkcodeCi input").val();
    if (checkcodeBi == "") checkcodeBi = null;
    if (checkcodeCi == "") checkcodeCi = null;

    if (vs.checkcodeBi && checkcodeBi == "") {
        alertShow("请输入验证码");
        return;
    }
    if (vs.checkcodeCi && checkcodeCi == "") {
        alertShow("请输入验证码");
        return;
    }

    var req = {
        "cmd": "QuotationVerifyPart",
        "querysequancenoBi": vs.querysequancenoBi,
        "querysequancenoCi": vs.querysequancenoCi,
        "checkcodeBi": checkcodeBi,
        "checkcodeCi": checkcodeCi,
        "querylogid": vs.querylogid,
        "risktype": vs.riskType
    };

    var oper = new InsMbsVehicleOpeation();
    oper.quotation("", function (vs, error) {
        loadingHide();
        if (vs) {
            $("#baojiaxingqing").show();
            $("#fukuan").show();
            if (link.indexOf("?")) {
                link = link + "&quotationNo=" + vs.quotationVo.quotationNo;
            } else {
                link = link + "?quotationNo=" + vs.quotationVo.quotationNo;
            }
            initQuotationBigVo(vs);
            $("#yanzhengma").hide();
        } else {
            alertShow(error);
        }
    }, req);
});

function initQuotationBigVo(quotationBigVo) {
    var quotationNo = quotationBigVo.quotationVo.quotationNo;

    if (quotationNo) {
        isShare = true;
        showMenuItems();
    }

    //循环产品，是否关联投保
    var kinds = quotationBigVo.insuranceVos;
    var productVos = quotationBigVo.productVos;
    var vehicleVo = quotationBigVo.quotationVehicleVo;
    var obj = new InsMbsVehicleObj();
    var production = obj.getProductions();
    var seatCount = parseInt(vehicleVo.seatCount);
    for (var i = 0; i < productVos.length; i++) {
        var vs = productVos[i];
        if (vs.productionCode == "0590") {
            vs.kindCode = "BZ";
            kinds.push(vs);
        }

        if (vs.isConProdution) {
            production.setPlanCode(vs.conPlanCode);
            production.setKindCode(vs.conKindCode);
            production.setProdCode(vs.conProdCode);
            production.setProdName(vs.conProdName);
            obj.setProductions(production);
            initConPro(vs.conKindCode, seatCount);
            ProductList(vs.conProdCode)
        }
    }
    obj.setKinds(kinds);

    /**
     * 方案调整事件
     */
    var adjust = document.querySelector('.adjust');
    adjust.addEventListener('click', function () {
        window.location.href = 'ins_kinds_modify.html?action=newpage&show=false&reQuotationNo=' + quotationNo;
    });

    /**
     * 初始化页面信息
     */
    totalFee = quotationBigVo.quotationVo.totalFee;
    $("#shifujia").html(quotationBigVo.quotationVo.totalFee);
    $("#baofeitatol").html(quotationBigVo.quotationVo.totalFee);
    for (var i = 0; i < quotationBigVo.quoPros.length; i++) {
        var itm = quotationBigVo.quoPros[i];
        if (itm.productionTypeCode == "0590") {
            //交强险
            $("#jiaoqianxian").show();
            $("#jiaoqiangjia").html("￥  " + itm.premium);
            $("#chechuansui").html("￥  " + itm.payTax);
            $("#taxOverdue").html("￥  " + itm.taxOverdue);
            $("#surCharge").html("￥  " + itm.surCharge);
            $("#jiaoqiri").html(itm.startDate);
            $("#jqzb").html(endHour(itm.endDate));
            $("#jiaoqiangxian").css("display", "block");
        }
        //展示商业险
        if (itm.productionTypeCode == "0508") {
            $("#shangyexian").show();
            $("#bg").show();
            var it = quotationBigVo.quoDets || [];
            $("#shangyejia").html("￥  " + itm.premium);
            $("#shangyexianzk").html(itm.nirrratio);
            $('#shangqiri').html(itm.startDate);
            $('#syzb').html(endHour(itm.endDate));

            var bg = $(".bj");

            for (var j = 0; j < it.length; j++) {
                var xiangqing = $(".xiangqing").eq(0).clone();
                if (it[j].amount == 0) {
                    xiangqing.find(".chebaoe").hide();
                }
                xiangqing.find(".chebaoe").html(parseInt(it[j].amount / 100) / 100 + "万");
                if (it[j].fee == 0) {
                    xiangqing.find(".chebaojia").hide();
                }
                xiangqing.find(".chebaojia").html(it[j].fee);
                if (it[j].isDefaultNoDuct) {
                    xiangqing.find(".isDefaultNoDuct").show();
                }
                xiangqing.find("#name").html(it[j].insuranceTypeName);
                if (it[j].amount == null) {
                    xiangqing.hide();
                } else {
                    xiangqing.show();
                }
//						xiangqing.show();
                $("#bg").append(xiangqing);
            }

        }
    }

    /***
     * 投保 报价成功后才能打开点击事件
     */
    $(".paynow").on("click", function () {
        var production = obj.getProductions();
        var planCode = production.getPlanCode() + (seatCount - 3) + "1";
        var copy = parseInt($("#copy").html());
        production.setPlanCode(planCode);
        obj.setProductions(production);
        if (seatCount >= 3 && seatCount <= 7) {
            sessionStorage.setItem("COPY", copy);
            window.location.href = 'ins_claim_place.html?action=newpage&quotationNo=' + quotationNo + "&buyCon=true";
        } else {
            window.location.href = 'ins_claim_place.html?action=newpage&quotationNo=' + quotationNo + "&buyCon=false";
        }
    });
}

function initConPro(kindCode, seatCount) {
    if (seatCount < 3 || seatCount > 7) {
        return;
    }
    $(".isRecommendation").show();
    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "InsuranceTypesPC",
        "kindCode": kindCode,
        "isdefault": "",
        "cityCode;": "",
        "index": '0',
        "size": 200
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            var vo = res.payload.vopc.vos[0];
            $("#conProValue").html("￥" + vo.entryValueVos[0].defalutValue)
            $("#conProName").html(vo.kindName);
            var obj = new InsMbsVehicleObj();
            var production = obj.getProductions();
            production.setProdAmount(vo.entryValueVos[0].defalutValue);
            production.setProdPremium(vo.entryValueVos[0].amount);
            obj.setProductions(production);

            maxCount = vo.max_count;
            var copy = parseInt($("#copy").html());
            var shifujia = totalFee;
            shifujia = parseFloat(shifujia) + copy * vo.entryValueVos[0].defalutValue
            $("#shifujia").html(shifujia);

            $(".toProd").on("click", function () {
                location.href = "sportsInsure.html?productionCode=" + vo.prodTypeNo + "&onlyShow=true"
            })
        }
    });
}

/**************************************************************************
 * 获取产品列表
 *
 * */
function ProductList(conProdCode) {
    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "ListProductions"
    };
    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        if (result.result) {
            var prod = result.payload.products
            $(prod).each(function (index, item) {
                localStorage.setItem(item.productionCode, JSON.stringify(item));
            });
        }

    });
};
$(".mui-numbox-btn-plus").on("click", function () {
	var app = new InsMbsVehicleObj();
	var vehicle=app.getVehicle();
	if(vehicle.getLic_no()==""){
		return;
	}
    var copy = parseInt($("#copy").html());
    var shifujia = totalFee;
    var conProValue = $("#conProValue").html().slice(1);
    if (copy >= maxCount) {
        return;
    }
    copy++;
    shifujia = parseFloat(shifujia) + copy * conProValue
    $("#copy").html(copy);
    $("#shifujia").html(shifujia);
});
$(".mui-numbox-btn-minus").on("click", function () {
    var copy = parseInt($("#copy").html());
    var shifujia = totalFee;
    var conProValue = $("#conProValue").html().slice(1);
    if (copy <= 0) {
        return;
    }
    copy--;
    shifujia = parseFloat(shifujia) + copy * conProValue
    $("#copy").html(copy);
    $("#shifujia").html(shifujia);
});

/**
 * 用户检查,检查是否本地缓存了用户的报价出单机构和用户
 */
function userChecker() {

    /**
     * 判断缓存是否存在
     */
    var orguser = localStorage.getItem('orguser___xxx');
    var comcode = localStorage.getItem('comcode___xxx');
    if (orguser != "" && comcode != "" && orguser != null && comcode != null) {
        initPage();
        return;
    }

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
            var list = res.payload.exts;
            exts = res.payload.exts;
            for (var i = 0; i < list.length; i++) {
                localStorage.setItem('orguser___xxx', list[0].org_usercode);
                localStorage.setItem('comcode___xxx', list[0].org_comcode);
            }
            initPage();
        } else {
            alertShow(res.error);
        }
    });
}

function endHour(time) {
    time = time.replace(/-/g, '/');
    time = new Date(time);
    time.setSeconds(time.getSeconds() - 1);
    var endHour = time.toFomatorString("YYYY-MM-DD");
    endHour += " 24:00:00";
    return endHour;
}
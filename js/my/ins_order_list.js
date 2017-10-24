window.onload = function () {
    //初始化
    initPage();

    //input[type=week],select,textarea{
}

//定义全局变量
var seach = {
    "status": "",
    "sdate": "",
    "edate": ""
}
var quotationNo_pay = "";

function initPage() {
    //初始化用户订单
    //init_Quotations("", "", "");
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
}

var index = 0;

//下拉刷新
function pullfreshDown() {
    index = 0;
    $("#hldoer").html("");
    //下拉加载数据
    init_Quotations();
}

//上拉加载
function pullfreshUp() {
    //上拉一次加载一页
    index++;
    //上拉加载数据
    init_Quotations();
}

function init_Quotations() {
    var app = new InsMbsVehicleOpeation();
    // loadingShow('加载中,请稍候...');
    app.Quotations(index, 10, seach.status, seach.sdate, seach.edate, function (vs) {
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
        // loadingHide();
        for (var i = 0; i < vs.quotationVos.length; i++) {

            var s = vs.quotationVos[i];

            var list_order = $("#list_order").clone();
            list_order.show();
            list_order.find(".totalFee").html(s.totalFee);
            list_order.find(".createTime").html(s.createTime);
            list_order.find(".point").html(0);
            list_order.find(".state").attr("src", "../images/ico_S" + s.status + ".png");

            if (s.productionTypeVo.isNonVehicle) {
                list_order.find(".licenseNo").hide();
                //非车保单号
                list_order.find(".carOwner").html(s.productionTypeVo.categoryName + " - " + s.nonName);
                //list_order.find(".baodanhao").html("保单号：" + s.cplyNoJ);
                if(s.status == "3" || s.status == "5" ){
                    list_order.find(".baodanhao").html("保单号：" + s.cplyNoJ);
                }else{
                    list_order.find(".baodanhao").html("订单号：" + s.proposalNoJ);
                }
                list_order.find(".productionName").html(s.productionTypeVo.othName)
            } else {
                list_order.find(".carOwner").html(s.carOwner);
                list_order.find(".licenseNo").html(s.licenseNo);
                list_order.find(".feiche").hide();

                //是否显示保单号
                if (s.proposalNoS) {
                    list_order.find(".quotationNoshowS").html("商业险单号：" + s.proposalNoS);
                }

                if (s.proposalNoJ) {
                    list_order.find(".quotationNoshowJ").html("交强险单号：" + s.proposalNoJ);
                }

            }

            if (s.syStartDate)
                list_order.find(".start").html("起保日期：" + s.syStartDate);
            if (s.syEndDate)
                list_order.find(".end").html("终保日期：" + endHour(s.syEndDate));

            if (s.status == "9" && s.insuredOpinion) {
                list_order.find("#insuredOpinion").show();
                list_order.find(".insuredOpinion").html("失败原因：" + s.insuredOpinion);
            }
            $("#hldoer").append(list_order);

            (function (item) {
                list_order[0].addEventListener('tap', function () {
                    if ((item.status == "1" || item.status == "9") && !item.productionTypeVo.isNonVehicle) {
                        goquotation(item.quotationNo);
                    } else if (item.status == "2") {
                        item.createTime = item.createTime.replace(/-/g, "/");
                        item.syStartDate = item.syStartDate.replace(/-/g, "/");
                        var beginsecond = new Date(item.createTime).getTime();
                        var syStartsecond = new Date(item.syStartDate).getTime();
                        var endsecond = new Date().getTime();
                        // 获取毫秒
                        var days = (endsecond - beginsecond) / (24 * 3600 * 1000);
                        if (item.productionTypeVo.isNonVehicle) {
                            if (days > 1 || endsecond > syStartsecond) {
                                alertShow("订单已过期，请重新填写");
                                return;
                            }
                            quotationNo_pay = item.quotationNo;
                            $('#zhifuye').show();
                        } else {
                            if (days > 1 || endsecond > syStartsecond) {
                                goquotation(item.quotationNo);
                            } else {
                                window.location.href = '../products/ins_claim_place.html?action=newpage&quotationNo=' + item.quotationNo + "&createTime=" + beginsecond;
                            }
                        }
                    } else if (item.status == "5") {
                        sessionStorage.setItem("cplyDate", item.createTime);
                        window.location.href = '../products/orderDetails.html?action=newpage&quotationNo=' + item.quotationNo;
                    }
                });

                list_order.find(".delete").on("tap", function (e) {
                    window.event ? window.event.cancelBubble = true : e.stopPropagation();
                    window.event ? window.event.returnValue = false : e.preventDefault();

                    Confirm({
                        content: "是否删除订单",
                        cancel: "取消",
                        determine: "确定",
                        callback: function (result) { //回调函数，传了cancel返回true，false,没传就没有返回值
                            if (result) {
                                deleteOrder(item.quotationNo);
                            }
                        }
                    });

                })
            })(s);

        }

        function goquotation(quotationNo) {
            //报价状态
            loadingShow('加载中,请稍候...');
            var oper = new InsMbsVehicleOpeation();

            oper.quotation(quotationNo, function (vs) {

                loadingHide();

                if (vs) {

                    var app = new InsMbsVehicleObj();
                    //车辆对象
                    var quotationVehicleVo = vs.quotationVehicleVo;
                    var vehicle = app.getVehicle();
                    vehicle.setLic_no(quotationVehicleVo.licenseNo);
                    vehicle.setVin_no(quotationVehicleVo.vinNo);
                    vehicle.setEngine_no(quotationVehicleVo.engineNo);
                    vehicle.setEnrollDate(quotationVehicleVo.enrollDate);
                    vehicle.setBrandName(quotationVehicleVo.brandCN);
                    app.setVehicle(vehicle);

                    /*var area = app.getArea();
                    area.setCityName(item.areaName);
                    area.setName(item.areaName);
                    area.setCode(item.areaCode);
                    area.setCityCode(item.areaCode);
                    area.setCarNoPrefix(item.carNoPrefix);
                    area.setCrossCity(item.setCrossCity);
                    app.setArea(area);*/

                    //车主信息
                    var vehicleOwner = app.getVehicleOwner();
                    vehicleOwner.setName(quotationVehicleVo.carOwner);
                    vehicleOwner.setLic_no(quotationVehicleVo.certNo);
                    app.setVehicleOwner(vehicleOwner);

                    //险种信息
                    var kinds = vs.insuranceVos;
                    var productVos = vs.productVos;
                    for (var i = 0; i < productVos.length; i++) {
                        if (productVos[i].productionCode == "0590") {
                            productVos[i].kindCode = "BZ";
                            kinds.push(productVos[i]);
                        }
                    }
                    var obj = new InsMbsVehicleObj();
                    obj.setKinds(kinds);

                    /*localStorage.setItem('orguser___xxx', item.userCode);
                    localStorage.setItem('comcode___xxx', item.comCode);
                    localStorage.setItem("areacode___xxx", item.areaCode);
                    localStorage.setItem("packagetype___xxx", item.packagetype);
                    localStorage.setItem("packagecode___xxx", item.packageCode);*/

                    window.location.href = '../products/ins_car_owner.html?action=newpage&requote=true';
                }
            });

        }
    });
}

function deleteOrder(quotationNo) {
    MobileApp.setUrl(_vehicle);
    req = {
        "cmd": "DeleteQuotation",
        "quotationNo": quotationNo
    };
    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        $('#loading').hide();
        var result = JSON.parse(result);
        if (result.result) {
            pullfreshDown();
        } else {
            alertShow(result.error);
        }
    })
}


var $index;
$('.zhifu').click(function (e) {
    var e = e.target;
    $index = $(this).index();
    $(".zhifu img").attr('src', '../images/ico_select_normal.png');
    $(this).children()[0].setAttribute('src', '../images/ico_select_pre.png');
})
$('#lijizhifu').click(function () {
    $('#loading').show();
    $('#zhifuye').hide();
    if ($index == undefined) {
        $('#loading').hide();
        alertShow("请选择一种支付方式");
        return;
    }
    if ($index == 0) {
        MobileApp.setUrl(_vehicle);
        req = {
            "cmd": "OnlinePay",
            "quotationNo": quotationNo_pay,
            "type": '1'
        };
        MobileApp.sendRequest(req, function (result) {
            //获取返回对象
            $('#loading').hide();
            var result = JSON.parse(result);
            if (result.result) {
                var vs = result.payload.orderInfo;
                localStorage.setItem("erweima", vs.codeurlBase64);
                localStorage.setItem("sourceOrder", vs.sourceOrder);
                window.location.href = "../products/ins_pay_wechat.html?action=nextpage";
            } else {
                alertShow(result.error);
            }
        })
    } else if ($index == 1) {
        $('#loading').hide();
        var quotationBigVo = {
            "quotationVo": {
                "quotationNo": quotationNo_pay,
            }
        };
        var app = new InsMbsVehicleObj();
        var quotation = app.setQuotation(quotationBigVo);
        window.location.href = "../products/ins_Communications.html?action=nextpage"
    } else if ($index == 2) {
        $('#loading').hide();
        var quotationBigVo = {
            "quotationVo": {
                "quotationNo": quotationNo_pay,
            }
        };
        var app = new InsMbsVehicleObj();
        var quotation = app.setQuotation(quotationBigVo);
        window.location.href = "../products/ins_lijiPay.html?action=nextpage"
    }
})
$(".contents").click(function (e) {
    e.stopPropagation();
    e.preventDefault();
})
$("#zhifuye").click(function () {
    $("#zhifuye").hide();
})
/*
 * 切换状态
 * */
var i = 0;
$("#static").click(function () {

    //隐藏下日期拉框
    $("#whileDate").hide();
    $("#datee").css("color", "#757575");
    $("#ico_up").attr("src", "../images/ico_down.png");
    j = 0;

    if (i == 0) {
        //显示蒙层
        $("#mengceng").show();

        //显示下拉框
        $("#selectt").show();
        $("#static").css("color", "#d3a27c");
        $("#ico_down").attr("src", "../images/ico_up.png");
        i++;
    } else {
        //隐藏蒙层
        $("#mengceng").hide();

        //隐藏下拉框
        $("#selectt").hide();
        $("#static").css("color", "#757575");
        $("#ico_down").attr("src", "../images/ico_down.png");
        i--;
    }
});


/*
 * 下拉框点击事件   （状态）
 * */

$("#qbb").click(function () {
    //全部  订单
    shouQuotations("");
    $("#qb").show();
});

$("#bjzz").click(function () {
    //报价中  订单
    shouQuotations("1");
    $("#bjz").show();
});

$("#ywcc").click(function () {
    //保单落单成功  订单
    shouQuotations("5");
    $("#ywc").show();
});

$("#zfsbb").click(function () {
    //支付失败  订单
    shouQuotations("4");
    $("#zfsb").show();
});

$("#dhbb").click(function () {
    //待核保  订单
    shouQuotations("7");
    $("#dhb").show();
});

$("#dzff").click(function () {
    //待支付  订单
    shouQuotations("2");
    $("#dzf").show();
});

$("#yzff").click(function () {
    //已支付  订单
    shouQuotations("3");
    $("#yzf").show();

});

$("#ldisbb").click(function () {
    //保单落地失败  订单
    shouQuotations("6");
    $("#ldisb").show();
});

$("#xfxgg").click(function () {
    //下发修改  订单
    shouQuotations("8");
    $("#xfxg").show();
});
$("#hbsb_l").click(function () {
    //核保失败  订单
    shouQuotations("9");
    $("#hbsb").show();
});

function shouQuotations(status) {
    //隐藏蒙层
    $("#mengceng").hide();

    hideImage();
    seach.status = status;
    //init_Quotations(status, "", "");
    pullfreshDown();
}

function hideImage() {
    $(".yc_img").hide();
    //$("#qb").hide();
    //$("#bjz").hide();
    //$("#ywc").hide();
    //$("#zfsb").hide();
    //$("#dhb").hide();
    //$("#dzf").hide();
    //$("#yzf").hide();
    //$("#ldisb").hide();
    //$("#xfxg").hide();
    //$("#hbsb").hide();

    $("#selectt").hide();
    $("#static").css("color", "#757575");
    $("#ico_down").attr("src", "../images/ico_down.png");
    i = 0;
}


/*
 * 日期框
 * */
var j = 0;
$("#datee").click(function () {
    //隐藏下拉框
    $("#selectt").hide();
    $("#static").css("color", "#757575");
    $("#ico_down").attr("src", "../images/ico_down.png");
    i = 0;

    if (j == 0) {
        //显示蒙层
        $("#mengceng").show();

        //显示下拉框
        $("#whileDate").show();
        $("#datee").css("color", "#d3a27c");
        $("#ico_up").attr("src", "../images/ico_up.png");
        j++;
    } else {
        //隐藏蒙层
        $("#mengceng").hide();

        //隐藏下拉框
        $("#whileDate").hide();
        $("#datee").css("color", "#757575");
        $("#ico_up").attr("src", "../images/ico_down.png");
        j--;
    }
});


/*
 * 日期重置
 * */
$("#reset").click(function () {
    $("#sDatee").val("");
    $("#eDatee").val("");

    //隐藏蒙层
    $("#mengceng").hide();

    //隐藏下日期拉框
    $("#whileDate").hide();
    $("#datee").css("color", "#757575");
    $("#ico_up").attr("src", "../images/ico_down.png");
    j = 0;

    seach.sdate = "";
    seach.sdate = "";
    //init_Quotations(seach.status, "", "");
    pullfreshDown();

});

/*
 * 日期查询订单
 * */
$("#but").click(function () {

    //隐藏蒙层
    $("#mengceng").hide();

    var sDatee = $("#sDatee").val();
    var eDatee = $("#eDatee").val();

    if (eDatee == "") {
        eDatee = (new Date()).toFomatorString("YYYY-MM-DD");
    }

    if (sDatee > eDatee) {
        alertShow("开始日期不能在截至日期之后");
        return;
    }
    var newdate = (new Date()).toFomatorString("YYYY-MM-DD");
    if (sDatee > newdate) {
        alertShow("开始日期不能大于当前日期");
        return;
    }

    //隐藏下日期拉框
    $("#whileDate").hide();
    $("#datee").css("color", "#757575");
    $("#ico_up").attr("src", "../images/ico_down.png");
    j = 0;

    seach.sdate = sDatee;
    seach.edate = eDatee;
    //init_Quotations("", sDatee, eDatee);
    pullfreshDown();
});


//查询保单
$(".search").click(function () {
    $(".queryPolicyInfo").show();
});

//取消
$(".cancel").click(function () {
    $(".queryPolicyInfo").hide();
});
$(".quxiao").click(function () {
    $(".bindingPolicy").hide();
});

//
$(".select").click(function () {
    var policyno = $(".policyno").val();
    var carowner = $(".carowner").val();
    var credentialno = $(".credentialno").val();

    if (policyno && carowner && credentialno) {
        loadingShow('加载中,请稍候...');
        QueryPolicyInfo(policyno, carowner, credentialno);
        return;
    }
    alertShow("查询条件不完整！");

});

//显示保单数据
function shouwQueryPolicyInfo(policyinfo) {
    $(".queryPolicyInfo").hide();
    $(".bindingPolicy").show();

    var insuredList = policyinfo.insuredList;
    var car = policyinfo.car;
    var kindList = policyinfo.kindList;

    $(".bindingPolicy").click(function () {
        BindingPolicy(insuredList, car, kindList)
    });

    $(".insuredname").html(car.carowner);
    $(".licenseno").html(car.licenseno);
    $(".jifen").html(0);
    var premium = 0;
    for (var i = 0; i < kindList.length; i++) {
        premium += Number(kindList[i].premium);
    }
    $(".premium").html(premium);
}

$(".cSel").click(function () {
    $(".queryPolicyInfo").show();
    $(".bindingPolicy").hide();
});

/*
* 查询保单
* */
function QueryPolicyInfo(policyno, carowner, credentialno) {
    MobileApp.setUrl(_vehicle);
    var app = new InsMbsVehicleObj();

    //初始化参数
    var req = {
        "cmd": "QueryPolicyInfo",
        "policyno": policyno,
        "carowner": carowner,
        "licenseno": "",
        "credentialno": credentialno,
        "querytype": "1",
        "inputsyscode": ""
    };
    MobileApp.sendRequest(req, function (res) {
        loadingHide();
        //获取返回对象
        var res = JSON.parse(res);
        if (res.payload) {
            if (res.payload.policyinfo.car) {
                shouwQueryPolicyInfo(res.payload.policyinfo);
            } else {
                alertShow("没有找到！");
            }
        } else {
            alertShow(res.error);
        }
    });
}


/**
 * 绑定保单
 * */
function BindingPolicy(insuredList, car, kindList) {
    MobileApp.setUrl(_vehicle);
    var app = new InsMbsVehicleObj();

    var account = MobileApp.getCookie("account");
    if (account == "") {
        //account = "E18E76997CDB";
        checkAccount();
        return;
    }

    //初始化参数
    var req = {
        "cmd": "BindingPolicy",
        "policyinfo": {
            "insuredList": insuredList,
            "car": car,
            "kindList": kindList,
            "account": account
        }
    };
    MobileApp.sendRequest(req, function (res) {
        //获取返回对象
        var res = JSON.parse(res);
        if (res.payload) {
            $(".bindingPolicy").hide();
            init_Quotations("", "", "");
        } else {
            alertShow(res.error);
        }
    });
}

function endHour(time) {
    var endHour = time.toDate();
    endHour.setSeconds(endHour.getSeconds() - 1);
    endHour = endHour.toFomatorString("YYYY-MM-DD") + " 24:00:00";
    return endHour;
}
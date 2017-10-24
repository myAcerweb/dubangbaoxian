var index = 0;
var type = 0;
var name = "";
var licenseno = "";

window.onload = function () {
    getAccount();
}

function getAccount() {
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
            var accountVo = res.payload.accountVo;
            var isNewCar = accountVo.isNewCar;
            name = accountVo.name;
            licenseno = accountVo.licenseNo;
            if (name == "" || name == null || (isNewCar == false && (licenseno == "" || licenseno == null))) {
                alertShow("请补全个人信息")
                setTimeout('window.location.href="../my/ins_car_owner_info.html?edit=true";', 1000)
                return;
            }
            initPage();
        } else {
            alertShow(res.error);
        }
    });
}

function initPage() {
    //初始化用户订单
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

//下拉刷新
function pullfreshDown() {
    index = 0;
    $(".mui-scroll").css("transform", "translate3d(0px, 0px, 0px) translateZ(0px)")
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
    var account = MobileApp.getCookie("account");

    if (account == "") {
        checkAccount();
        return;
    }

    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "Quotations",
        "quo_account": account,
        "index": index,
        "size": 20,
        "status": "5",
        "type": type.toString(),
        "sdate": "",
        "edate": ""
    };
    loadingShow();
    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        loadingHide();
        var result = JSON.parse(result, true);
        if (result.result) {
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
            if (type === 3) {
                setclaimInfo(result.payload.info.claimpays);
                return;
            }
            var vs = result.payload.quotationsVo.quotationVos;
            for (var i = 0; i < vs.length; i++) {
                // var s = vs[i];
                setListItem(vs[i]);
            }
            if (type === 0) {
                if ($("#hldoer").html() === "") {
                    $(".query").show();
                    $(".queryFixed").hide();
                } else {
                    $(".query").hide();
                    $(".queryFixed").show();
                    $("#hldoer").css("margin-bottom", "1rem")
                }
            } else {
                $(".query").hide();
                $(".queryFixed").hide();
                $("#hldoer").css("margin-bottom", "0")
                if ($("#hldoer").html() === "") {
                    alertShow("暂无数据")
                }
            }

        } else {
            alertShow(result.error);
        }
    });
}

$(".tabs li").on("click", function (e) {
    var _this = e.target;
    type = $(_this).index();
    $(_this).addClass("active").siblings().removeClass("active");
    pullfreshDown();
})

$(".queryFixed,.queryBtn").on("click", function () {
    getQueryPolicyInfo();
})

function getQueryPolicyInfo() {
    var account = MobileApp.getCookie("account");

    if (account == "") {
        checkAccount();
        return;
    }

    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "QueryPolicyInfo",
        "account": account,
        // "carowner": "郑金举",
        // "licenseno": "豫AQ2X70",
        "carowner": name,
        "licenseno": licenseno,
        "querytype": "2"
    };
    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        if (result.result) {
            pullfreshDown();
        } else {
            alertShow(result.error);
        }
    });
}

function setListItem(s) {
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
        list_order.find(".baodanhao").html("保单号：" + s.cplyNoJ);
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

    $("#hldoer").append(list_order);

    list_order[0].addEventListener('tap', function () {
        sessionStorage.setItem("cplyDate", s.createTime);
        window.location.href = '../products/orderDetails.html?action=newpage&quotationNo=' + s.quotationNo;
    });
}

function setclaimInfo(vs) {
    vs.forEach(function (s) {
        var list_order = $("#list_order").clone();
        list_order.show();
        list_order.find(".totalFee").html(s.surveyamt);
        list_order.find(".createTime").html(s.accidenttime);
        list_order.find(".licenseNo").html(s.lcnno);
        list_order.find(".claimNo").html("报案号：" + s.caseno);
        list_order.find(".state").attr("src", "../images/ico_S5.png");
        list_order.find(".carOwner").html(s.drivername);
        list_order.find(".claim").hide();
        list_order.find(".quotationNo").hide();
        $("#hldoer").append(list_order);

        (function (item) {
            list_order[0].addEventListener('tap', function () {
                window.location.href = '../products/orderDetails.html?action=newpage&caseNo=' + item.caseno;
            });
        })(s);
    })
    $(".query").hide();
    $(".queryFixed").hide();
    $("#hldoer").css("margin-bottom", "0");
    if ($("#hldoer").html() === "") {
        alertShow("暂无数据")
    }
}
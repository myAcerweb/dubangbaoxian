window.onload = function () {
    getAccount();
    initPage();
    initList();
}

function initPage() {
    var quotationNo = MobileApp.getParameterValue("quotationNo");
    var oper = new InsMbsVehicleOpeation();
    loadingShow();
    oper.getQuotation(quotationNo, function (vo) {
        loadingHide();
        var productVos = vo.productVos;
        productVos.forEach(function (item, index) {
            if (item.isNonVehicle) {
                $("#productName").html(item.othName);
            } else {
                var othName = $("#productName").html();
                if (index !== 0) {
                    othName = othName + "、" + item.othName;
                } else {
                    othName = othName + item.othName;
                }
                $("#productName").html(othName);
            }
        })
        var quoPros = vo.quoPros;
        quoPros.forEach(function (item) {
            if (item.productionTypeCode === '0590') {
                $("#insuranceBI").html("商业险保单号：" + item.proposalNo).show();
            } else if (item.productionTypeCode === '0508') {
                $("#insuranceCI").html("交强险保单号：" + item.proposalNo).show();
            } else {
                $("#insuranceNO").html("保单号：" + item.cplyNo).show();
            }
        })
    });
}

function initList() {
    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "ListProductions"
    };
    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        if (!result.result) {
            alertShow(result.error);
            return;
        }
        showProduct(result.payload.products)
    });
}

function showProduct(vs) {
    $(vs).each(function (index, item) {
        if (item.isRecommend) {
            if (item.show_mode == "0") {
                var pro_0 = $("#pro_0").clone();
                if (item.status_icon) {
                    pro_0.find(".image").attr("src", item.status_icon);
                }
                pro_0.find(".othName").html(item.othName);
                pro_0.find(".productionName").html(item.productionName);
                pro_0.find(".price").html(item.price + '<i class="start">元起</i>');
                pro_0.find(".category_code").html(item.categoryCode);
                pro_0.css("background-image", "url(" + item.image_url + ")");
                pro_0.css("background-repeat", "no-repeat");
                pro_0.css("background-size", "cover");
                if (item.isShowSales) {
                    pro_0.find(".totalSales").html("已售" + item.totalSales + "份");
                }
                if (item.isShowPromotional) {
                    pro_0.find(".price").html(item.deposit_price + '<i class="start">折扣价</i>');
                    pro_0.find(".deposit_price").html("原价" + item.cost_price);
                }

                pro_0.show();
                $("body").append(pro_0);

                //绑定点击事件
                (function (it) {
                    pro_0.click(function () {
                        if (it.isNonVehicle) {
                            window.location.href = 'sportsInsure.html?productionCode=' + it.productionCode + "&rd=" + new Date();
                        } else {
                            window.location.href = 'ins_car_owner.html?' + "&rd=" + new Date();
                        }
                    });
                })(item)
            }
            if (item.show_mode == "1") {
                var pro_1 = $("#pro_1").clone();
                pro_1.find(".othName1").html(item.othName);
                pro_1.find(".productionName1").html(item.productionName);
                pro_1.find(".price1").html(item.price + "元起");
                pro_1.find(".image_url").attr("src", item.image_url);
                pro_1.find(".category_code").html(item.categoryCode);
                pro_1.show();
                $("body").append(pro_1);

                //绑定点击事件
                (function (it) {
                    pro_1.click(function () {
                        if (it.isNonVehicle) {
                            window.location.href = 'sportsInsure.html?productionCode=' + it.productionCode;
                        } else {
                            window.location.href = 'ins_car_owner.html';
                        }
                    });
                })(item)
            }
        }

    });
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

    MobileApp.sendRequest(req, function (res) {
        //隐藏转圈
        loadingHide();
        res = JSON.parse(res);
        if (res.result) {
            var name = res.payload.accountVo.name || res.payload.accountVo.nickname;
            $("#name").html(name);
        } else {
            alert(res.error);
        }
    });
}

$(".wechat").on("click", function () {
    window.location.href = "http://www.tpy10.net/create.php?name=gh_14b5837a66b1";
});

$(".wo").on("click", function () {
    window.location.href = "../my/ins_order_list.html?action=newpage";
});
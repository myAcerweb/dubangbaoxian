/*
 ** 定义全局变量
 */
var isShare = true;
var title = "车险";
var desc = "为您的爱车提供多方案报价投保服务。";
var link = location.href; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
var imgUrl = link.split("ins_car_owner")[0] + "../images/share/chexian.png";
var cityCode = "";
var CROSSCITY;
//如果有数据直接读出来
window.onload = function () {
    initPage();
}

/************************************************************************
 * 初始化函数
 */
function initPage() {
    getAccount();

    var app = new InsMbsVehicleObj();
    var vehicle = app.getVehicle();
    var vehicleOwner = app.getVehicleOwner();
    var isReQuote = MobileApp.getParameterValue("requote");
    var isNew = vehicle.getIsNew();

    //从订单列表跳转过来的重新报价页面
    if (isReQuote == "true") {
        sessionStorage.setItem("isReQuote", true);
    } else {
        sessionStorage.removeItem("isReQuote")
    }
    //初始化页面数值
    $("#plate").val(vehicle.getLic_no());
    $("#plate").change(function () {
        plateChange();
    })
    if (isNew) {
        $("#plate").val("").attr("disabled", "disabled");
        $(".mui-switch").attr("checked", true);
    } else {
        $(".chepai").on("click", function () {
            plate();
        })
    }


    $("#owner").val(vehicleOwner.getName());
    $("#ownerNum").val(vehicleOwner.getLic_no().trim());

    $("#startInsure").click(function () {
        goNextPage();
    });
}

function getAccount() {
    var app = new InsMbsVehicleObj();
    var area = app.getArea();
    var upd = new InsMbsVehicleOpeation();
    upd.serarchArea(0, 10000, function (vs) {
        for (var i = 0; i < vs.length; i++) {
            if (vs[i]._citycode == area.getCode()) {
                area.setCarNoPrefix(vs[i].carNoPrefix);
                area.setCrossCity(vs[i].crossCity);
                app.setArea(area);
            }
        }

    });
    var account = MobileApp.getCookie("account");
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };
    //显示转圈
    $('#loading').show();
    MobileApp.sendRequest(req, function (res) {
        //隐藏转圈
        $('#loading').hide();
        res = JSON.parse(res);
        var app = new InsMbsVehicleObj();
        var area = app.getArea();
        area.getName() == "" ? $("#area").val("请选择地区") : $("#area").val(area.getName());
        var crossCity = res.payload.accountVo["cityVo"]["crossCity"] || false;
        cityCode = res.payload.accountVo["cityVo"]["code"] || "";
        if (cityCode) {
            area.setCrossCity(crossCity);
            app.setArea(area);
        }
        if(res.payload.accountVo.type == "User"){
            CROSSCITY = true;
        }
    })
}

$(".mui-switch").on("change", function () {
    var _isNew = $(this).is(":checked");
    var app = new InsMbsVehicleObj();
    var vehicle = app.getVehicle();

    $("#plate").attr("disabled", _isNew);

    if (_isNew) {
        $(".chepai").off("click");
        vehicle.setLic_no($("#plate").val().trim());
        $("#plate").val("")
    } else {
        $("#plate").val(vehicle.getLic_no());
        $(".chepai").on("click", function () {
            plate();
        })
    }
    vehicle.setIsNew(_isNew);
    app.setVehicle(vehicle)
})

/************************************************************************
 * OCR光学识别触发函数
 */
//点击图片触发file选择图片
function plate() {
    document.getElementById('plateFile').click();
}

function shenfenclick() {
    document.getElementById('file').click();
}

//把车牌号和身份证号变成大写
function plateChange() {
    var plate = $("#plate").val().trim();
    plate = plate.toUpperCase();
    $("#plate").val(plate);
}

//function ownerNumChange() {
//	var ownerNum = $("#ownerNum").val();
//	ownerNum = ownerNum.toUpperCase();
//	$("#ownerNum").val(ownerNum);
//}
//向驾驶证识别接口传送数据
function plateOnChange() {
    var title = '加载中,请稍候...';
    loadingShow(title);
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
        success: function (returndata) {
            $("#loading").hide();
            $("#plateFile").val("")
            if (returndata.status != "OK") {
                alertShow("识别失败:" + returndata.info);
                return;
            }
            var vehicleOwner = returndata.data.item.name;
            var vehicleNum = returndata.data.item.cardno;
            var vehicleEngine = returndata.data.item.enginePN;
            var cheJaHao = returndata.data.item.vin;
            var vehicleModel = returndata.data.item.model;
            var enrollDate = returndata.data.item.registerDate;
            var area = returndata.data.item.address;
            if (cheJaHao.length == 0 && vehicleModel.length == 0) {
                alertShow("识别失败,请换张图片");
                return;
            }
            //弹出弹框和修改弹框里内容
            $('.layer').removeClass('none');
            $('.user-message').removeClass('none');
            $('.layer').show();
            $('.user-message').show();
            $("#dirver_lic_close").click(function () {
                $('.layer').hide();
                $('.user-message').hide();
            });
            $("#vehicleNum").val(vehicleNum);
            $("#vehicleEngine").val(vehicleEngine);
            $("#cheJaHao").val(cheJaHao);
            $("#vehicleModel").val(vehicleModel);

            //点击确定时隐藏弹框，保存信息，并把信息填到主页里面去
            $('#insureVehicleMessage').click(function () {
                $('.layer').hide();
                $('.user-message').hide();

                vehicleNum = $("#vehicleNum").val();
                vehicleNum = vehicleNum.toUpperCase();
                vehicleEngine = $("#vehicleEngine").val();
                cheJaHao = $("#cheJaHao").val();
                vehicleModel = $("#vehicleModel").val();
                //把车牌赋值到首页
                $("#plate").val(vehicleNum);
                $("#owner").val(vehicleOwner);
                //把信息保存到对象中
                var app = new InsMbsVehicleObj()
                var vehicle_Owner = app.getVehicleOwner();
                var vehicle = app.getVehicle();
                vehicle_Owner.setName(vehicleOwner);
                vehicle.setLic_no(vehicleNum);
                vehicle.setVin_no(cheJaHao);
                vehicle.setEngine_no(vehicleEngine);
                vehicle.setBrandName(vehicleModel);
                enrollDate = enrollDate.toDate();
                vehicle.setEnrollDate(enrollDate.toFomatorString("YYYY-MM-DD"));
                app.setVehicleOwner(vehicle_Owner);
                app.setVehicle(vehicle);
            })
        },
        error: function (returndata) {
            loadingHide();
            alertShow("请求失败");
            $("#plateFile").val("")
        }
    });
}

//向身份证识别接口传送数据
function fileChange() {

    var title = '加载中,请稍候...';
    loadingShow(title);

    var form = document.getElementById("uploadForm");
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
        success: function (returndata) {

            loadingHide();
            $("#plateFile").val("")
            if (returndata.status != "OK") {
                alertShow("识别失败:" + returndata.info);
                return;
            }
            //显示身份证弹框
            //			$(".id-card").removeClass('none')
            //			$('.layer').removeClass('none');
            $('.layer').show();
            $('.id-card').show();
            $("#idcard_lic_close").click(function () {
                $('.layer').hide();
                $('.id-card').hide();
            });

            var owner = returndata.data.item.name;
            var ownerId = returndata.data.item.cardno;
            $("#owner1").val(owner);
            $("#ownerId1").val(ownerId);
            $("#querenshenfen").click(function () {
                owner = $("#owner1").val();
                ownerId = $("#ownerId1").val();
                $(".id-card").hide();
                $('.layer').hide();
                $("#owner").val(owner);
                $("#ownerNum").val(ownerId);
                var app = new InsMbsVehicleObj();
                var vehicleOwner = app.getVehicleOwner();
                vehicleOwner.setName(owner);
                vehicleOwner.setLic_no(ownerId);
            })
        },
        error: function (returndata) {
            loadingHide();
            alertShow("请求失败");
            $("#plateFile").val("")
        }
    });
}

//点击弹出选择地区
$("#areaClick").click(function () {
    document.title = '选择地区';
    $("#selectArea").show();
    $("#area,#plate,#owner,#ownerNum").blur();
    var app = new InsMbsVehicleObj();
    var area = app.getArea();
    area.getName() == "" ? $("#insureArea").html("请选择地区") : $("#insureArea").html(area.getName());
    getData();
});

function getData() {
    var app = new InsMbsVehicleOpeation();
    var title = '加载中,请稍候...';
    loadingShow(title);
    var obj = new InsMbsVehicleObj();
    var area = obj.getArea();
    var insureArea = area.getName();
    app.serarchArea(0, 10000, function (vs) {
        loadingHide();
        var selectArea = $("#selectArea");
        var box = $("#box");
        box.html("");
        var first = true;
        for (var i = 0; i < vs.length; i++) {
            var s = vs[i];
            if (s.getCityCode().indexOf(cityCode) != 0) {
                continue;
            }
            if (!first) {
                if (s.getProvCode() != vs[i - 1].getProvCode()) {
                    showInsureArea()
                } else {
                    var c = $("#city_div").clone();
                    c.find(".city").html(s.getCityName());
                    c.find(".city").attr("getProvCode", s.getProvCode());
                    if (insureArea == s.getCityName()) {
                        box.find(".province:last").addClass("active");
                        c.find(".gouxuan").show();
                    }
                    box.find(".province:last").append(c);
                }
            } else {
                showInsureArea()
                first = false;
            }

            //显示投保地区
            function showInsureArea() {
                var p = $("#prov_div").clone();
                var _div = document.createElement("div");
                _div.classList = "province"
                p.html(s.getProvName() + '<img src="../images/ico_arrow.png" alt="" />');
                p.show();
                _div.innerHTML += p[0].outerHTML;
                var c = selectArea.find("#city_div").clone();
                c.find(".city").html(s.getCityName());
                _div.innerHTML += c[0].outerHTML;
                box.append(_div);
            }
        }

        //循环为城市列表赋点击事件
        for (var i = 0; i < selectArea.find(".city").length; i++) {
            (function (s) {
                selectArea.find(".city").eq(s).click(function () {
                    selectArea.find("#insureArea").html($(this).html());
                    selectArea.find(".gouxuan").hide();
                    selectArea.find(".gouxuan").eq(s).show();
                    var res = new InsMbsVehicleOpeation();
                    var cityName = $(this).html();
                    // res.serarchArea(0, 10000, function (vs) {
                        for (var j = 0; j < vs.length; j++) {
                            if (cityName == vs[j].getCityName()) {console.log(123456)
                                var app = new InsMbsVehicleObj();
                                var area = app.getArea();
                                area.setCityName(cityName);
                                area.setName(cityName);
                                area.setCode(vs[j].getCityCode());
                                area.setCityCode(vs[j].getCityCode());
                                area.setCarNoPrefix(vs[j].getCarNoPrefix());
                                area.setCrossCity(vs[j].getCrossCity())
                                app.setArea(area);
                                break;
                            }
                        }

                    // });

                })
            })(i)
        }
        selectArea.find("#getArea").click(function () {
            var insureArea = selectArea.find("#insureArea").html();
            $("#area").val(insureArea);
            var plate = $("#plate").val();
            var isdisabled = $("#plate")[0].disabled;
            if (plate.length <= 2 && isdisabled == false) {
                var app = new InsMbsVehicleObj();
                var area = app.getArea();
                var carNoPrefix = area.getCarNoPrefix();
                console.log(carNoPrefix)
                carNoPrefix = carNoPrefix.split(",");
                $("#plate").val(carNoPrefix[0])
            }

            $("#selectArea").hide();
        });

        $(".shenfen").on("click", function () {
            $(this).parent().toggleClass("active")
            $(this).siblings().toggle();
        })
        if ($(".province.active").length != 0) {
            $(".province.active").children().show()
        } else {
            $(".province:first").children().show()
        }
    });
}

function goNextPage() {

    var app = new InsMbsVehicleObj();
    var plate = $("#plate").val().trim();
    var isNew = $(".mui-switch").is(":checked");
    var area = app.getArea();
    if (!isNew && plate == "") {
        alertShow("请输入车牌");
        return;
    }
    /*
     * 校验车牌号有效性（一个中文+5到10个数字字母）
     */
    if (plate != "") {
        if (!regVehicleNum(plate)) {
            return;
        }
    }
    if (area == null || area.getCityCode() == null || area.getCityCode() == '') {
        //if($("#area").val() == "") {
        alertShow("请选择投保地区");
        return;
    }
    var crossCity = area.getCrossCity();
    var carNoPrefix = area.getCarNoPrefix().trim();

    if(plate != "" && !crossCity){
        carNoPrefix = carNoPrefix.toUpperCase().trim();
        plate = plate.substr(0, 2);
        if(carNoPrefix.length === 1){
            plate = plate.substr(0, 1);
        }
        if (carNoPrefix.indexOf(plate) < 0) {
            alertShow("不能跨地区投保");
            return;
        }
    }
/*
    if (carNoPrefix.length == 1 && plate != "") {
        if (!crossCity && plate[0] != carNoPrefix) {
            alertShow("不能跨地区投保");
            return;
        }
    }
    if (carNoPrefix.length == 2 && plate != "") {
        carNoPrefix = carNoPrefix.toUpperCase();
        if (!crossCity && plate.substr(0, 2) != carNoPrefix) {
            alertShow("不能跨地区投保");
            return;
        }
    }
    if (carNoPrefix.length > 2 && plate != "") {
        carNoPrefix = carNoPrefix.toUpperCase();
        plate = plate.substr(0, 2);
        if (!crossCity && carNoPrefix.indexOf(plate) < 0) {
            alertShow("不能跨地区投保");
            return;
        }
    }*/
    if ($("#owner").val() == "") {
        alertShow("请填车主");
        return;
    }
    //车主名字有限性
    var ownerReg = /^[\u4E00-\u9FA5]{2,3}$/;
    var ownerReg1 = /^[\u4E00-\u9FA5]{3,10}$/;
    var ownerReg2 = /^[\u4E00-\u9FA5]{0,}(?:有限|股份|公司|集团|厂|所)[\u4E00-\u9FA5]{0,}$/;
    var owner = $("#owner").val();
    if (owner.length <= 3 && !ownerReg.test(owner) || owner.length > 10) {
        alertShow("您的名字不正确");
        return;
    }
    if (owner.length > 3 && (ownerReg1.test(owner) && ownerReg2.test(owner))) {
        alertShow("您的名字不正确");
        return;
    }

    if ($("#ownerNum").val().trim() == "") {
        alertShow("请填证件号");
        return;
    }
    /* 校验车主身份证有效性 （15个数字，或者17个数字加X，或者18个数字）*/
    var ownerId = $("#ownerNum").val().trim().toUpperCase();

    if (!idReg(ownerId)) {
        return;
    }

    //判断是不是同一个车牌
    var vehicle = app.getVehicle();
    var plate = vehicle.getLic_no().trim();
    if ($("#plate").val().trim() != plate) {
        vehicle.setVin_no("");
        vehicle.setEngine_no("");
        vehicle.setBrandName("");
        app.setVehicle(vehicle);
    }


    var vehicle = app.getVehicle();
    vehicle.setLic_no($("#plate").val().trim());
    app.setVehicle(vehicle);

    var vehicleOwner = app.getVehicleOwner();
    vehicleOwner.setName(owner);
    vehicleOwner.setLic_no(ownerId);
    app.setVehicleOwner(vehicleOwner);

    /***
     * 车辆查询
     */
//	var oper = new InsMbsVehicleOpeation();
//	$("#loading").show();
//	$("#ifr").contents().find("#tishi").html("加载中,请稍候...");
//	oper.serarchVehicle(vehicle.getLic_no(), vehicleOwner.getName(), vehicleOwner.getLic_no(), function(vs) {
//		$("#loading").hide();
//		
//	});
    window.location.href = "../products/ins_car_info.html?action=nextpage"
}
var index = 0;
var ENDDATE = new Date();
ENDDATE.setMonth(ENDDATE.getMonth() + 1 , 1);
ENDDATE = ENDDATE.toFomatorString("YYYY-MM-DD");

$(document).ready(function () {
    initPage();
});

/*
* 初始化页面
* */
function initPage() {
    $(".mouth").each(function (index, item) {
        var month = new Date();
        month.setMonth(month.getMonth() + index + 1, 1);
        item.innerHTML = month.getMonth() + 1;
        item.nextElementSibling.innerHTML = month.getFullYear();
    })
    $('.mouths').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var month = '0' + $(this).find(".mouth").html();
        ENDDATE = $(this).find(".year").html() + "-" + month.slice(-2) + "-01"
        pullfreshDown();
    })
    /*
    * 设置续保列表刷新、加载
    * */
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
    $("#listContent").html("");
    //下拉加载数据
    initList(ENDDATE);
}

//上拉加载
function pullfreshUp() {
    //上拉一次加载一页
    index++;
    //上拉加载数据
    initList(ENDDATE);
}

function initList(ENDDATE) {
    //获取系统Account
    var account = MobileApp.getCookie("account");
    if (account == "") {
        checkAccount();
        return;
    }

    MobileApp.setUrl(_vehicle);
    //初始化参数
    var req = {
        "cmd": "ListReNewQuotation",
        "account": account,
        "endDate": ENDDATE,
        "index": index.toString(),
        "size": "10",
    };
    loadingShow();
    MobileApp.sendRequest(req, function (res) {
        loadingHide();
        //获取返回对象
        res = JSON.parse(res);
        if (res.result) {
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
            var list = res.payload.vos || [];
            var listContent = $("#listContent")
            list.forEach(function (v) {
                var item = $("#orderItem").clone();
                item.find(".carOwner").html(v.carOwner);
                item.find(".licenseNo").html(v.licenseNo);
                item.find(".totalFee").html(v.totalFee);
                if (v.reday !== null && v.reday !== undefined)
                    item.find(".date").html("(" + v.reday + ")");
                if (v.cplyNon)
                    item.find(".cplyNon").html("保单号" + v.cplyNon);
                if (v.cplyNoJ)
                    item.find(".cplyNoJ").html("交强险保单号" + v.cplyNoJ);
                if (v.cplyNoS)
                    item.find(".cplyNoS").html("商业险保单号" + v.cplyNoS);
                item.show();

                (function (s) {
                    item[0].addEventListener('tap',function () {
                        getQuotationInfo(s);
                    });
                })(v)

                listContent.append(item);
            })
        } else {
            alertShow(res.error);
        }
    });
}

function getQuotationInfo(item) {
    loadingShow( '加载中,请稍候...');
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "QuotaionBigVo",
        "quotationNo": item.quotationNo
    };
    MobileApp.sendRequest(req, function(res) {
        loadingHide();
        //获取返回对象
        var res = JSON.parse(res);
        if(res.result) {
            var v = new Quotation();
            v = res.payload.bigvo;
            if(v){
                setQuotationInfo(v,item)
            }
        } else {
            alertShow(res.error);
        }
    });
}

function setQuotationInfo(vs,item) {
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

    var area = app.getArea();
    area.setCityName(item.areaName);
    area.setName(item.areaName);
    area.setCode(item.areaCode);
    area.setCityCode(item.areaCode);
    area.setCarNoPrefix(item.carNoPrefix);
    area.setCrossCity(item.setCrossCity);
    app.setArea(area);
    //车主信息
    var vehicleOwner = app.getVehicleOwner();
    vehicleOwner.setName(quotationVehicleVo.carOwner);
    vehicleOwner.setLic_no(quotationVehicleVo.certNo);
    app.setVehicleOwner(vehicleOwner);

    //险种信息
    var kinds = vs.insuranceVos;
    var productVos = vs.productVos;
    for(var i = 0; i < productVos.length; i++){
        if(productVos[i].productionCode == "0590"){
            productVos[i].kindCode = "BZ";
            kinds.push(productVos[i]);
        }
    }
    var obj = new InsMbsVehicleObj();
    obj.setKinds(kinds);

    localStorage.setItem('orguser___xxx', item.userCode);
    localStorage.setItem('comcode___xxx', item.comCode);
    localStorage.setItem("areacode___xxx",item.areaCode);
    localStorage.setItem("packagetype___xxx",item.packagetype);
    localStorage.setItem("packagecode___xxx",item.packageCode);

    window.location.href = '../products/ins_car_owner.html?action=newpage&requote=true';
}
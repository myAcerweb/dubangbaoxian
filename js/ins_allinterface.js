/**
 * Created by Administrator on 2017/4/14.
 */
//var timer = 3;
var timerid;
window.onload = function () {


    //显示转圈
    //var wenzi = "加载中,请稍候...";
    ////loadingShow(wenzi);
    //timerid = window.setInterval("aa()", 3000);
    ////initOrgers();

    //$('#btn').trigger("click");
    //setTimeout(function(){WeixinJSBridge.call('closeWindow');},100);

    //;WeixinJSBridge.call('closeWindow');

    //new TipBox({type:'error',str:'指定修理厂险费率不得大于30或者小于20',hasBtn:true});
}

//测试
$("#btn").on("click", function () {

    FindProCitys();
    //在下划线的地方填任何代码，使得程序最终输出 “hello worid” 至少写出五个不同思路的方案
    //new TipBox({type:'success',str:'操作成功',hasBtn:true});
    //0.7  1.3
    //alert(11111111111);
    //var app = new InsMbsVehicleOpeation();
    //var a = MobileApp.encode_utf8("商业车险费率改革后新的商业险产品编码");
    // var app1 = new InsMbsVehicleObj();
    // var kind = app1.getKinds();
    // kind.setName("ABCD");
    // app1.setKinds(kind);
    // app.serarchKinds(function(vs){
    //
    //     for (var i = 0; i < vs.length; i++) {
    //         var s = vs[i];
    //         //alert(s.getName());
    //     }
    // });


    //获取订单列表
    $("#loading").show();
    var app = new InsMbsVehicleOpeation();
    app.serarchKinds(function(vs){
    });

    // //支付
    //var zhifushoujihao = $("#zhifushoujihao").val();
    // if (zhifushoujihao){
    //     $("#loading").show();
    //     var app = new InsMbsVehicleOpeation();
    //     app.OnlinePay("2",zhifushoujihao,function(vs){
    //         if(vs!=null){
    //             $("#loading").hide();
    //             $("#div_").hide();
    //             $("#myfrm").show();
    //             $("#url").val(vs.url);
    //             $("#orderSource").val(vs.map.orderSource);
    //             $("#outOrderNo").val(vs.map.outOrderNo);
    //             $("#sumPayFee").val(vs.map.sumPayFee);
    //             $("#operateCode").val(vs.map.operateCode);
    //             $("#businessType").val(vs.map.businessType);
    //             $("#mobileNumber").val(vs.map.mobileNumber);
    //             if(vs.map.callBackFlag=="1"){
    //                 $("#callBackFlag").val("需异步通知");
    //                 $("#callBackFlag1").val(vs.map.callBackFlag);
    //             }else{
    //                 $("#callBackFlag").val("无需通知");
    //                 $("#callBackFlag1").val(vs.map.callBackFlag);
    //             }
    //             //$("#callBackFlag").val(vs.map.callBackFlag);
    //             $("#callBackUrl").val(vs.map.callBackUrl);
    //             $("#goods").val(vs.map.goods);
    //             $("#sign").val(vs.map.sign);
    //             $("#actionType").val(vs.map.actionType);
    //             console.log(vs)
    //         }
    //     });
    // }else{
    //     alert("请输入支付手机");
    // }

    //var oper = new InsMbsVehicleOpeation();
    //oper.NewCarModelQuery("L15A11107950","LHGGD864752007945","2004-09-01",function(vs){
    //    for (var i = 0; i < vs.length; i++) {
    //        var s = vs[i];
    //        //alert(s.getJsonObj());
    //    }
    //});

    //var oper = new InsMbsVehicleOpeation();
    //var r = MobileApp.encode_utf8("粤MING34");
    //alert(r);
    //var r1 = MobileApp.encode_utf8("陈炜");
    //oper.serarchVehicle(r,r1,"42112619931216387X",function(vs){
    //    for (var i = 0; i < vs.length; i++) {
    //        var s = vs[i];
    //        //alert(s.getJsonObj());
    //    }
    //});

    //var oper = new InsMbsVehicleOpeation();
    //oper.quotation(1,function(vs){
    //    //alert(vs.getQuotationVo().status);
    //});

    //获取险别
    //MobileApp.setUrl(_vehicle);
    ////初始化参数
    //var req1 = {
    //    "cmd":"InsuranceTypes",
    //    "isdefault":"0",
    //    "cityCode":null,
    //};
    //
    //MobileApp.sendRequest(req1,function(result){
    //    //获取返回对象
    //    var result = JSON.parse(result,true);
    //    var vos = result.payload.vos;
    //    var kinds = new Array();
    //    for(var i = 0; i < vos.length; i++){
    //        var kind = vos[i];
    //        var kd = new Kind();
    //        kd.setCode(kind.kindCode);
    //        kinds.push(kind);
    //    }
    //});

    //获取对象
    //var app = new InsMbsVehicleObj();
    ////受益人
    //var benefit = app.getBenefit();
    ////投保人
    //var buyer = app.getBuyer();
    ////车主
    //var owner = app.getVehicleOwner();
    //
    //benefit.setName("张");
    //benefit.setLic_no("431124199607123436");
    //benefit.setCellphone("13120926315");
    //
    //buyer.setName("张");
    //buyer.setLic_no("431124199607123436");
    //buyer.setCellphone("13120926315");
    //
    //app.setBenefit(benefit);
    //app.setBuyer(buyer);
    //
    //var oper = new InsMbsVehicleOpeation();
    //oper.insure("AE030114C41F",function(vs){
    //    console.log(app.getQuotation())
    //});

    //LFV3B28R393001234
    //alert("待核保（请转人工）");
    //window.location.href = 'ins_products.html?action=newpage'

    //this.window.opener = null;
    //window.close();


    //获取订单列表
    //获取邮递地址信息
    var addr3 = {
        name: "测试",
        num: "13123123",
        detailArea: "上海"
    };
    //CommonAddress    DelCommonAddress   AddCommonAddress
    var app = new InsMbsVehicleOpeation();
    app.DelCommonAddress("789B18E887DF", function (vs) {
        console.log(vs);
    });

});

/*
 * 获取车辆信息
 * licenseNo   车牌号
 * carOwner    车主名称
 * identifyNumber    证件号码
 * */
function CarModelQuery(licenseNo, carOwner, identifyNumber) {
    MobileApp.setUrl(_vehicle);

    //初始化参数
    var req = {
        "cmd": "CarModelQuery",
        "licenseNo": licenseNo,
        "carOwner": carOwner,
        "identifyNumber": identifyNumber
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        return result.payload.carModelInfo;
//          console.log(result);
//          return result.payload.carModelInfo;
//          console.log(result);
        return result.payload.carModelInfo;
    });
}

/*
 * 获取车型信息
 * ENGINENUMBER   发动机号
 * VINCODE    车辆识别码
 * FIRSTREGISTERDATE    注册日期
 * */
function NewCarModelQuery(ENGINENUMBER, VINCODE, FIRSTREGISTERDATE) {
    MobileApp.setUrl(_vehicle);

    //初始化参数
    var req = {
        "cmd": "NewCarModelQuery",
        "ENGINENUMBER": ENGINENUMBER,
        "VINCODE": VINCODE,
        "FIRSTREGISTERDATE": FIRSTREGISTERDATE
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        return result;
    });
}


/*
 * 微信端省份城市获取
 * index   当前页数
 * size    总条数
 * */
function FindProCitys(index, size) {
    MobileApp.setUrl(_vehicle);

    //初始化参数
    var req = {
        "cmd": "FindProCitys",
        "index": index,
        "size": size
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        return result.payload.provinceCity.provinces;
    });
}


/*
 * 获取城市信息PC端
 * city_Code   城市code
 * city_Name    城市名称
 * index   当前页数
 * size    总条数
 * */
function FindCitys(city_Code, city_Name, index, size) {
    MobileApp.setUrl(_vehicle);

    //初始化参数
    var req = {
        "cmd": "FindCitys",
        "city_Code": city_Code,
        "city_Name": city_Name,
        "index": index,
        "size": size
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        return result.payload.city;
    });
}


/*
 * 险种类型PC端
 * productionCode   险种代码
 * productionName   险种名称
 * */
function InsuranceType(productionCode, productionName) {
    MobileApp.setUrl(_vehiclePc);

    //初始化参数
    var req = {
        "cmd": "InsuranceType",
        "productionCode": productionCode,
        "productionName": productionName
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        return result.payload.insurances;
    });
}
function initOrgers() {
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

    //dbic_loading.show();
    MobileApp.sendRequest(req, function (res) {
        //dbic_loading.hidden();
        res = JSON.parse(res);
        if (res.result) {
            var list = res.payload.exts;
            exts = res.payload.exts;
            for (var i = 0; i < list.length; i++) {
                localStorage.setItem('orguser', JSON.stringify(list[0]));
                console.log(list[0]);
            }
        } else {
            alert(res.error);
        }
    });
};

/*
 * 支付
 * quotationNo   报价单号
 * */
function onlinePay(quotationNo, cb) {
    MobileApp.setUrl(_vehiclePc);

    //初始化参数
    var req = {
        "cmd": "OnlinePay",
        "quotationNo": quotationNo
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result, true);
        var orderInfo = result.payload.orderInfo;
        cb(orderInfo);
    });
}
/*
 * 获取产品信息
 * */
function Production() {
    MobileApp.setUrl(_vehiclePc);

    //初始化参数
    var req = {
        "cmd": "Production"
    };

    MobileApp.sendRequest(req, function (result) {
        //获取返回对象
        var result = JSON.parse(result);
        console.log(result);
    });
}


/*
 *  省份城市获取
 *   "cmd": "FindProCitys",
 *   "index": "0",      当前页数
 *  "size": "20"        总条数
 **/
function FindProCitys() {
    MobileApp.setUrl(_insurance);
    var req = {
        "cmd": "FindProCitys",
        "index": "0",
        "size": "20"
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {

        } else {
            alert(res.error);
        }
    });
}








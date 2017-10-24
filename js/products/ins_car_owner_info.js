//页面初始化
window.onload = function () {
    initPage();
    initCareerPicker();

    var city_picker1 = new mui.PopPicker({
        layer: 2
    });
    city_picker1.setData(init_city_picker);
    $("#showCityPicker").on("click", function () {
        $(".mui-poppicker").removeClass("mui-active");
        city_picker1.show(function (items) {
            // $(".mui-poppicker").css("display",'block');
            $("#showCityPicker").html((items[0] || {}).text + " " + (items[1] || {}).text);
        });
    });
}

function initPage() {
    //判断是那个对象并把相应的值赋到输入框里
    var productionCode = MobileApp.getParameterValue("productionCode");
    if (productionCode) {
        $('#NocarInsure').show();
    } else {
        $('#NocarInsure').hide();
    }
    var messages = localStorage.getItem("message");
    var app = new InsMbsVehicleObj();
    if (messages == "0") {
        $("title").html("车主信息");
        $("#name").attr("disabled", "disabled");
        $("#id").attr("disabled", "disabled");
        var vehicelOwner = app.getVehicleOwner();
        var name = vehicelOwner.getName();
        var phone = vehicelOwner.getCellphone();
        var id = vehicelOwner.getLic_no();
        var sex = vehicelOwner.getSex();
        var email = vehicelOwner.getEmail();
        var province = vehicelOwner.getProvince();
        var city = vehicelOwner.getCity();
        var detailArea = vehicelOwner.getAddress();
        var idtype = vehicelOwner.getLic_type();
        fuzhi(name, phone, id, sex, email, province, city, detailArea,idtype)
    } else if (messages == "1") {
        $("title").html("投保人信息");
        var buyer = app.getBuyer();
        var name = buyer.getName();
        var phone = buyer.getCellphone();
        var id = buyer.getLic_no();
        var sex = buyer.getSex();
        var email = buyer.getEmail();
        var province = buyer.getProvince();
        var city = buyer.getCity();
        var detailArea = buyer.getAddress();
        var idtype = buyer.getLic_type();
        $("#relationship").hide();
        fuzhi(name, phone, id, sex, email, province, city, detailArea,idtype)
    } else if (messages == "2") {
        $("title").html("被保人信息")
        var index = MobileApp.getParameterValue("index");
        var benefit = app.getBenefit();
        if (index !== "") {
            benefit = app.getBenefits();
            benefit = benefit[index] || new Person();
        }
        var name = benefit.getName();
        var phone = benefit.getCellphone();
        var id = benefit.getLic_no();
        var sex = benefit.getSex();
        var email = benefit.getEmail();
        var province = benefit.getProvince();
        var city = benefit.getCity();
        var detailArea = benefit.getAddress();
        var careerType = benefit.getCareerType();
        var careerTypeCode = benefit.getCareerTypeCode();
        var idtype = benefit.getLic_type();
        if (productionCode == "0398A" || productionCode == "0398B") {
            $("#relationship").hide();
        }
        if (productionCode == "0701") {
            $("#careerType").show();
        }

        fuzhi(name, phone, id, sex, email, province, city, detailArea,idtype, careerType, careerTypeCode)
    }

    function fuzhi(name, phone, id, sex, email, province, city, detailArea, idtype,careerType, careerTypeCode) {
        $("#name").val(name);
        $("#phone").val(phone);
        $("#id").val(id);
        $("#Idtype").val(idtype);
        $("#InsureSex").val(sex);
        $("#showCityPicker").html(province + " " + city);
        $("#Email").val(email);
        if (province == "") $("#showCityPicker").html("选择省市");
        $("#detailArea").val(detailArea);
        if (careerType)
            $("#showCareerType").html(careerType);
        if (careerTypeCode)
            $("#showCareerType").val(careerTypeCode);
    }
    //切换证件类型,清空输入框内容
    $("#Idtype").change(function(){
       $('#id').val('');
     });

    //	点击确定把信息保存到相应的对象中
    $("#insure").click(function () {
        var productionCode = MobileApp.getParameterValue("productionCode");
        var message = localStorage.getItem("message");
        var myselect = document.getElementById("Idtype");
        var InsureSex = document.getElementById("InsureSex");
        var InsureRelation = document.getElementById("InsureRelation");
        var index = myselect.selectedIndex;
        var SexIndex = InsureSex.selectedIndex;
        var RelationIndex = InsureRelation.selectedIndex;
        var app = new InsMbsVehicleObj();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var id = $("#id").val();
        var pc = $("#showCityPicker").html();
        var province = "";
        var city = "";
        var career = $("#showCareerType");

        if (pc == "选择省市") {
            alertShow("请选择省市");
            return;
        }
        if (pc != "选择省市") {
            province = pc.split(" ")[0];
            city = pc.split(" ")[1];
        }
        var detailArea = $("#detailArea").val();

        if (message == "0") {
            if (!nameReg(name)) {
                return false
            }
            if (!phoneVerification(phone)) {
                return false
            }
            if(index==0){
	            	if (!idReg(id,index)) {
	                return false
	            }
            }else{
            		if(id==""){
            			alertShow("证件不能为空");
            			return false;
            		}
            }
            
            if (!detailAreaReg(detailArea)) {
                return false
            }
            var vehicelOwner = app.getVehicleOwner();
            vehicelOwner.setName(name);
            vehicelOwner.setCellphone(phone);
            vehicelOwner.setLic_no(id);
            vehicelOwner.setProvince(province);
            vehicelOwner.setCity(city);
            vehicelOwner.setAddress(detailArea);
            vehicelOwner.setEmail($('#Email').val());
            vehicelOwner.setLic_type(myselect.options[index].value);
            vehicelOwner.setSex(InsureSex.value);
            vehicelOwner.setRelation(InsureRelation.options[RelationIndex].value);
            app.setVehicleOwner(vehicelOwner);
        }
        if (message == "1") {
            if (!nameReg(name)) {
                return false
            }
            if (!phoneVerification(phone)) {
                return false
            }
            if(index==0){
	            	if (!idReg(id,index)) {
	                return false
	            }
            }else{
            		if(id==""){
            			alertShow("证件不能为空");
            			return false;
            		}
            }
            if (!detailAreaReg(detailArea)) {
                return false
            }

            var buyer = app.getBuyer();
            buyer.setName(name);
            buyer.setCellphone(phone);
            buyer.setLic_no(id);
            buyer.setProvince(province);
            buyer.setCity(city);
            buyer.setAddress(detailArea);
            buyer.setEmail($('#Email').val());
            buyer.setLic_type(myselect.options[index].value);
            buyer.setSex(InsureSex.value);
            buyer.setRelation(InsureRelation.options[RelationIndex].value);
            app.setBuyer(buyer);
        }
        if (message == "2") {
            if (!nameReg(name)) {
                return false
            }
            if (!phoneVerification(phone)) {
                return false
            }
            if(index==0){
	            	if (!idReg(id,index)) {
	                return false
	            }
            }else{
            		if(id==""){
            			alertShow("证件不能为空");
            			return false;
            		}
            }
            if (!detailAreaReg(detailArea)) {
                return false
            }
            if (productionCode == "0701" && career.html() == "") {
                alertShow("请选择被保险人类型");
                return;
            }
            var index = MobileApp.getParameterValue("index");
            var benefit = app.getBenefit();
            var benefits = app.getBenefits();
            if (index !== "") {
                benefit = benefits[index] || new Person();
            }
            benefit.setName(name);
            benefit.setCellphone(phone);
            benefit.setLic_no(id);
            benefit.setProvince(province);
            benefit.setCity(city);
            benefit.setAddress(detailArea);
            benefit.setEmail($('#Email').val());
            benefit.setLic_type(myselect.value);
            benefit.setSex(InsureSex.value);
            benefit.setRelation(InsureRelation.options[RelationIndex].value);
            benefit.setCareerType(career.html());
            benefit.setCareerTypeCode(career.val());
            if (index !== "") {
                benefits[index] = benefit;
                app.setBenefits(benefits);
            } else {
                app.setBenefit(benefit);
            }
        }
        //		history.go(-1);
        if (productionCode) {
            window.location.replace('sportsInsure.html?productionCode=' + productionCode);
        } else {
            var quotationNo = MobileApp.getParameterValue("quotationNo");
            var buyCon = MobileApp.getParameterValue("buyCon");
            window.location.replace("ins_claim_place.html?action=nextpage&quotationNo=" + quotationNo + "&buyCon=" + buyCon);
        }

    });
}

/*
*
* */
function initCareerPicker() {
    // console.log($(".mui-poppicker").length);
    MobileApp.setUrl(_vehiclePc);
    var req = {
        "cmd": "Careertype"
    };

    //显示转圈
    $('#loading').show();
    MobileApp.sendRequest(req, function (res) {

        //隐藏转圈
        $('#loading').hide();
        res = JSON.parse(res);
        if (res.result) {
            var data = JSON.stringify(res.payload.careeVos);
            data = data.replace(/typeName/g, "text");
            data = JSON.parse(data);
          // var careerPicker = new mui.PopPicker({
          //        layer: 2
          //  });
          //   careerPicker.setData(data, "text");
          //   $("#showCareerType").on("click", function () {
          //       $(".mui-poppicker").removeClass("mui-active");
          //       // $(".mui-poppicker").css('display','none');
          //       careerPicker.show(function (items) {
          //           $("#showCareerType").html((items[2] || {}).text);
          //          $("#showCareerType").val((items[2] || {}).value);
          //      });
          //   });

            var html ='';
            var  index1,index2,index3;
            for(var i=0;i<data.length;i++){
                html+= '<div class="swiper-slide">'+data[i].text+'</div>';
            }
            $('#box_left .swiper-wrapper').html(html);
            
             $("#showCareerType").click(function () {
                var swiper1 = new Swiper('#box_left .swiper-container', {
                direction: 'vertical',
                slidesPerView : 11,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
              }); 
                $('._box,.Box').show();

            });
            $('#box_left').on('click','.swiper-slide',function(){
               index1 = $(this).index();
               var right_t = '';
               for(var i=0;i<data[index1].children.length;i++){
                right_t+= '<div class="swiper-slide">'+data[index1].children[i].text+'</div>';
                }
                $('#box_right_t .swiper-wrapper').html(right_t); 
                var swiper2 = new Swiper('#box_right_t .swiper-container', {
                direction: 'vertical',
                slidesPerView : 8,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
              });
            });
            $('#box_right_t').on('click','.swiper-slide',function(){
               index2 = $(this).index();
               var right_b = '';
               for(var i=0;i<data[index1].children[index2].children.length;i++){
                right_b+= '<div class="swiper-slide">'+data[index1].children[index2].children[i].text+'</div>';
                }
                $('#box_right_b .swiper-wrapper').html(right_b); 
                var swiper3 = new Swiper('#box_right_b .swiper-container', {
                direction: 'vertical',
                slidesPerView : 8,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
              });
            });
            $('#box_right_b').on('click','.swiper-slide',function(){
               index3 = $(this).index();
              
              $('#showCareerType').html(data[index1].children[index2].children[index3].text);
              $('#showCareerType').val(data[index1].children[index2].children[index3].value);
              $('._box,.Box').hide();
            });



        }
    })
}

//获取链接上的参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

function nameReg(str) {
    var regex = /^[\u4e00-\u9fa5]{2,}$/;
    if (!regex.test(str)) {
        alertShow("名字格式不正确");
        return false;
    }
    return true;
}

function detailAreaReg(str) {
    if (str.length == 0) {
        alertShow("请填写地址");
        return false;
    }
    if (str.length < 4) {
        alertShow("地址太短");
        return false;
    }
    return true;
}

/************************************************************************
 * OCR光学识别触发函数
 */
//点击图片触发file选择图片
function shenfenclick() {
    document.getElementById('file').click();
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
            console.log(returndata)

            if (returndata.status != "OK") {
                alertShow("识别失败:" + returndata.info);
                return;
            }
            var name = returndata.data.item.name;
            var id = returndata.data.item.cardno;
            var InsureSex = returndata.data.item.sex;
            var detailArea = returndata.data.item.address;
            if (InsureSex == "女") {
                InsureSex = 2;
            } else if (InsureSex == "男") {
                InsureSex = 1;
            }
            $("#name").val(name);
            $("#id").val(id);
            $("#InsureSex").val(InsureSex);
            $("#detailArea").val(detailArea);
        },
        error: function (returndata) {
            loadingHide();
            alertShow("请求失败");
        }
    });
}
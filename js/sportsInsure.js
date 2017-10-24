var isShare = true;
var title = ''; // 分享标题
var desc = ''; // 分享描述
var link = location.href; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
var imgUrl = link.split("sportsInsure")[0]; // 分享图标
var productionCode = getQueryString("productionCode");
switch (productionCode) {
    case "0763":
        title = "驾乘添逸险";
        desc = "购买驾乘添逸险、驾驶、乘车都安心！";
        imgUrl = imgUrl + "../images/share/jiacheng.png";
        break;
    case "0710":
        title = "差旅无忧";
        desc = "为您的出差、旅行提供全方位保障";
        imgUrl = imgUrl + "../images/share/lvcheng.png";
        break;
    case "0709A":
        title = "玩转中国保险";
        desc = "为您国内/出境旅行提供意外、医疗保障。";
        imgUrl = imgUrl + "../images/share/guoneily.png";
        break;
    case "0709B":
        title = "玩转世界保险";
        desc = "为您国内/出境旅行提供意外、医疗保障。";
        imgUrl = imgUrl + "../images/share/jingwaily.png";
        break;
    case "0701":
        title = "意外不怕险";
        desc = "购买意外不怕险，意外来了也不怕！";
        imgUrl = imgUrl + "../images/share/yiwaixian.png";
        break;
    case "0398B":
        title = "都邦保险好房东家财责任险";
        desc = "房子租给陌生人也不用担心，购买房东险，实惠又安心！";
        imgUrl = imgUrl + "../images/share/fangdong.png";
        break;
    case "0398A":
        title = "都邦保险好房客财产责任险";
        desc = "为您租的房子提供房屋、财产、居家责任保险";
        imgUrl = imgUrl + "../images/share/fangke.png";
        break;
}
$(document).ready(function () {
    // MobileApp.setCookie("account",'744D421BDC77');
    var arr = [],
        planCode,
        max_disDays,
        amount,
        kindCode,
        insuredTlimt,
        premium,
        insuredDate,
        initIndex = 0,
        referralCode,
        areacode,
        comcode,
        insuredendDate,
        maxAge,
        minAge,
        showChooseDialog = false,
        isMultiPerson = false,
        insursedPerson = 1,
        disDays = 1;

    var account = MobileApp.getCookie("account");

    var insurance = {};
    //轮播图
    insurance.getImg = function (res) {
        var _element = document.createElement('div'),
            _imgelement = document.createElement('img');
        _element.setAttribute("class", "swiper-slide");
        _imgelement.setAttribute('src', res);
        _element.appendChild(_imgelement);
        swiperWrapper.appendChild(_element);
        //轮播图
        /*var swiper_img = new Swiper('.swiper-container', {
            autoplay: 2000,
            loop: true,
        });*/
    };
    //计算日期
    insurance.endDate = function (start, day, a) {
        var now = new Date(start);
        var insureSdate = now.getTime() + day * 24 * 60 * 60 * 1000;
        if (day == "365") {
            insureSdate = now.setFullYear(now.getFullYear() + 1);
        }
        var endDate = new Date(insureSdate).Format("yyyy" + a + "MM" + a + "dd");
        return endDate;
    }
	function ProductList() {
	    MobileApp.setUrl(_vehicle);
	    //初始化参数
	    var req = {
	        "cmd": "ListProductions"
	    };
	    MobileApp.sendRequest(req, function (result) {
	        //获取返回对象
	        var result = JSON.parse(result, true);
	        if (!result.result) {
	            return;
	        }
	        for(var i=0;i<result.payload.products.length;i++){
	        		var item  = result.payload.products[i];
	        		localStorage.setItem(item.productionCode, JSON.stringify(item));
	        }
	        window.location.reload(true);
    		});
    }
    var swiperWrapper = document.getElementsByClassName('swiper-wrapper')[0];
    //初始化页面
    var InsuranceTypesPC = function () {
        $(".kind").html("");
        var productionCode = getQueryString("productionCode");
        var product = localStorage.getItem(productionCode);
        if(product==null || product==undefined){
        		ProductList();
        		return;
        }
        var product = JSON.parse(product);
        var product_img = JSON.parse(product.show_urls);
        isMultiPerson = product.isMultiPerson || false;
        insursedPerson = product.max_insursedPerson;

        if (productionCode == "0398A" || productionCode == "0398B") {
            $("#Benefit").hide();
        }
        $('title').html(product.othName);

        for (var i in product_img) {
            insurance.getImg(product_img[i]);
        }

        $('#productName').html(product.othName);
        $('#productOth').html(product.productionName);
        $('#productNum span').html(product.baseSales + product.totalSales);
        $("#description").html(product.description);
        if (product.insuranceCondition) {
            $("#insuranceCondition").removeClass("none")
            $("#insuranceCondition").find("input").val(product.insuranceCondition)
        }
        minAge = product.minAge;
        maxAge = product.maxAge;

        if (isMultiPerson) {
            $("#addBeInsured").show();
        }

        if (product.insurance_clause_url == '' || product.insurance_clause_url == null) {
            $('#provisions').attr('href', "javascript:;");
        } else {
            $('#provisions').attr('href', "sportInsure_more.html?type=provisions&url=" + product.insurance_clause_url);
        }

        MobileApp.setUrl(_vehicle);
        //初始化参数
        var req = {
            "cmd": "InsuranceTypesPC",
            "isdefault": "",
            "cityCode;": "",
            "index": '0',
            "size": 200
        };
        $('#loading').show();
        MobileApp.sendRequest(req, function (res) {
            //console.log(JSON.parse(res));
            $('#loading').hide();
            var res = JSON.parse(res).payload.vopc.vos;
            arr = [];
            for (var i in res) {
                if (productionCode == res[i].prodTypeNo) {
                    arr.push(res[i]);
                    max_disDays = res[i].max_disDays;
                }
            }
           
            for (var j in arr) {
                insurance.setIfro(arr[j]);
            }

            insurance.changeList(arr[0]);
            var swiper_products = Swiper('.products_container', {
                onSlideChangeEnd: function (swiper) {
                    initIndex = swiper.activeIndex;
                    localStorage.setItem('initIndex', initIndex);
                    $('.player').removeClass("active");
                    $('.player').eq(swiper.activeIndex).addClass("active");
                    insurance.changeList(arr[swiper.activeIndex]);
                    //隐藏打开的tab标签
                    $('.panelTop').removeClass('active');
                }
            });
            var Bindex = localStorage.getItem('initIndex');
            if(Bindex==null)
            		Bindex=0;
            if (Bindex != null) {
                $('.player').removeClass("active");
                $('.player').eq(Bindex).addClass("active");
                swiper_products.slideTo(Bindex, 200, true);
            }
            insurance.changeTab(swiper_products);
        });
        getSettings();
        GetreferralCode(account);
    };
    InsuranceTypesPC();

    //填写信息
    document.getElementsByClassName('Insured')[0].addEventListener('click', function (event) {
        var _id = event.target.id;
        var messages;
        var insuredDate = $('#insuredDate').val();
        var insuredTlimt =$('#insuredTlimt').find("option:selected").text();
        var insuredNum =$('#insuredNum').find("option:selected").text();
        var _date = {};
        _date.insuredDate = insuredDate;
         _date.insuredTlimt = insuredTlimt;
         _date.insuredNum = insuredNum;
        _date = JSON.stringify(_date);
        localStorage.setItem('insuredDate',_date);
        if (prodTypeNo == '0763') {
            var itemCarList = {};
            itemCarList.licenseNo = $('#carlicenseNo').val();
            itemCarList.frameNo = $('#carframeNo').val();
            itemCarList.brandName = $('#carbrandName').val();
            itemCarList.engineNo = $('#carengineNo').val();
            itemCarList.useNature = $('#useNature').val();
            itemCarList.seatCount = $("#carseatCount").val();
            localStorage.setItem('itemCarList', JSON.stringify(itemCarList));
        }
        if (productionCode.indexOf("0398") >= 0) {
            var itemAddress = {};
            itemAddress.addressCode = $("#zipcode").val();
            itemAddress.addressName = $('#address').val();
            itemAddress.pc = $("#showCityPicker").html();
            itemAddress.province = $("#provCode").val();
            itemAddress.city = $("#cityCode").val();
            localStorage.setItem('itemAddressList', JSON.stringify(itemAddress));
        }
        if (_id == 'owner') {
            messages = '1';
            window.location.href = "ins_car_owner_info.html?" + _id + '&productionCode=' + getQueryString("productionCode");
        } else if (_id == 'insured') { 
            var _this = $(event.target).parents("li");
            var index = _this.index();
            messages = '2';
            window.location.href = "ins_car_owner_info.html?" + _id + '&productionCode=' + getQueryString("productionCode") + '&index=' + index;
           
        }

        localStorage.setItem('message', messages);

    })
    //
    insurance.setIfro = function (res) {
        var _kindName = document.createElement('div'),
            kind = document.getElementsByClassName('kind')[0];
        _kindName.setAttribute('class', 'player');
        _kindName.innerHTML = "<p class='font28'>" + res.kindName + "</p>" +
            "<p class='font24 '>" + res.entryValueVos[0].defalutValue + "<span>起</span></p>";
        kind.appendChild(_kindName);
        insurance.setGuaranteeScope(res);
    };

    insurance.setGuaranteeScope = function (res) {
        var _products_player = document.createElement('div'),
            products_player = document.getElementsByClassName('swiper-wrapper')[1],
            vos = res.insuranceTypeClauseVos || [];

        _products_player.setAttribute('class', 'swiper-slide products_player');
        if (vos.length > 4) {
            _products_player.setAttribute('class', 'swiper-slide products_player hidden');
            $('#descripdeep').show();
            $("#descripdeep").html("展开");
        }

        vos.forEach(function (item) {
            let panelTop = document.createElement("p");
            let panelContent = document.createElement("p");

            panelTop.innerHTML = '<span class="title">' + item.title + '</span><span class="right">' + item.amount + '</span>';
            panelTop.classList = 'panelTop';
            panelContent.innerHTML = item.clause_content;
            panelContent.classList = 'panelContent';

            panelTop.onclick = function () {
                $(this).toggleClass("active");
            }

            _products_player.appendChild(panelTop);
            _products_player.appendChild(panelContent);
        });
        products_player.appendChild(_products_player);
    };

    insurance.getIfro = function () {
        var app = new InsMbsVehicleObj();
        var buyer = app.getBuyer();
        var ownername = buyer.getName();
        if (ownername != '' && ownername != null && ownername != undefined) {
            $('#owner').val(ownername);
        }

        var benefits = app.getBenefits();
        benefits.forEach(function (item, index) {
            var beInsuredname = item.getName();
            var item = $('.beInsuredItem').eq(index);
            if (item.length == 0) {
                addBeInsured(insursedPerson);
            }
            if (beInsuredname != '' && beInsuredname != null && beInsuredname != undefined) {
                $('.beInsuredItem').eq(index).find(".beInsured").val(beInsuredname);
            }
            ;
        });
    };
    //tab切换
    insurance.changeTab = function (swiper) {
        $('.player').on('click', function () {
            initIndex = $(this).index();
            localStorage.setItem('initIndex', initIndex);
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            swiper.slideTo($(this).index(), 200, true);
        })
    }
    //切换保险类型
    insurance.changeList = function (arr) {
        var list = arr;

        prodTypeNo = list.prodTypeNo;

        ValueVos = list.entryValueVos;

        var productionCode = getQueryString("productionCode");
        var product = JSON.parse(localStorage.getItem(productionCode));
        /*
         * notice_image  投保须知
         * stat_image    投保声明
         * */
        var tabs = {
            "notice_image": product.notice_image,
            "speAgreement_image": list.insurancetype_icon || product.speAgreement_image,
            "statement_image": product.statement_image,
            "claim_image": product.claim_image,
        }
        initTabs(tabs);

       

         
        //保险期限
        var insuredTlimt = document.getElementById('insuredTlimt');
        insuredTlimt.innerHTML = '';
        //份数
        var insuredNum = document.getElementById("insuredNum");
        insuredNum.innerHTML = '';
        for (var m in ValueVos) {
            insuredTime(ValueVos[m]);
        }
        for (var i = 1; i <= list.max_count; i++) {
            insuredCount(i);
        }

        function insuredTime(res) {
            var option = document.createElement('option');
            option.innerHTML = res.entryConent;
            option.value = JSON.stringify(res);
            insuredTlimt.appendChild(option);
        };

        function insuredCount(num) {
            var copy = localStorage.getItem("copy");
            var option = document.createElement('option');
            option.innerHTML = num;
            option.value = num;
            if (copy == num) {
                option.selected = true;
            }
            insuredNum.appendChild(option);
        };
        var insuredTlimt = document.getElementById('insuredTlimt');
        var index = insuredTlimt.selectedIndex;
        planCode = JSON.parse(insuredTlimt.options[index].value).planCode;
        amount = JSON.parse(insuredTlimt.options[index].value).amount;
        insuredendDate = JSON.parse(insuredTlimt.options[index].value).value;
        kindCode = JSON.parse(insuredTlimt.options[index].value).kindCode;
        premium = JSON.parse(insuredTlimt.options[index].value).defalutValue;
        var copy = localStorage.getItem("copy") || 1;
        $('#sumPremium').html('￥' + parseFloat(premium) * copy);
        if (prodTypeNo == '0763') {
            var itemCar = JSON.parse(localStorage.getItem('itemCarList')) || {};
            $('#carlicenseNo').val(itemCar["licenseNo"]);
            $('#carframeNo').val(itemCar["frameNo"]);
            $('#carbrandName').val(itemCar["brandName"]);
            $('#carengineNo').val(itemCar["engineNo"]);
            $("#useNature").val(itemCar["useNature"]);
            $("#carseatCount").val(itemCar["seatCount"]);
            $('.Insuretype').show();
            $('#carseatCount option[value=5]').attr('selected',true);
        }
        if (productionCode.indexOf("0398") >= 0) {
            var itemAddress = JSON.parse(localStorage.getItem('itemAddressList')) || {};
            $("#zipcode").val(itemAddress.addressCode);
            $('#address').val(itemAddress.addressName);
            $("#showCityPicker").html(itemAddress.pc);
            $("#provCode").val(itemAddress.province);
            $("#cityCode").val(itemAddress.city);
            $('.InsureAddress').show();
            initCityPicker()
        } else {
            $('.InsureAddress').hide();
        }
        //份数
        insuredNum.onchange = function () {
            var copy = parseInt($(this).val());
            var t = parseFloat(premium);
            t *= copy;
            $('#sumPremium').html('￥' + t);
            localStorage.setItem("copy", copy);
        }
        //保险期限
        insuredTlimt.onchange = function () {
            var index = insuredTlimt.selectedIndex;
            planCode = JSON.parse(insuredTlimt.options[index].value).planCode;
            amount = JSON.parse(insuredTlimt.options[index].value).amount;
            kindCode = JSON.parse(insuredTlimt.options[index].value).kindCode;
            insuredendDate = JSON.parse(insuredTlimt.options[index].value).value;
            premium = JSON.parse(insuredTlimt.options[index].value).defalutValue;
            var copy = localStorage.getItem("copy") || 1;
            $('#sumPremium').html('￥' + parseFloat(premium) * copy);

            if (prodTypeNo == '0763') {
                var itemCar = JSON.parse(localStorage.getItem('itemCarList')) || {};
                $('#carlicenseNo').val(itemCar["licenseNo"]);
                $('#carframeNo').val(itemCar["frameNo"]);
                $('#carbrandName').val(itemCar["brandName"]);
                $('#carengineNo').val(itemCar["engineNo"]);
                $("#useNature").val(itemCar["useNature"]);
                $("#carseatCount").val(itemCar["seatCount"]);
                $('.Insuretype').show();
            }

            if (productionCode.indexOf("0398") > 0) {
                var itemAddress = JSON.parse(localStorage.getItem('itemAddressList')) || {};
                $("#zipcode").val(itemAddress.addressCode);
                $('#address').val(itemAddress.addressName);
                $("#showCityPicker").html(itemAddress.pc);
                $('#provCode').val(itemAddress.province);
                $('#cityCode').val(itemAddress.city);
                $('.InsureAddress').show();
            } else {
                $('.InsureAddress').hide();
            }
        }

        var onlyShow = MobileApp.getParameterValue("onlyShow");
        if (onlyShow == "true") {
            $(".Indate").hide();
            $(".Insured").hide();
            $(".gpBtn").hide();
            $(".clearStorage").hide();
        }
        var insuredDate = document.getElementById("insuredDate");
        disDays = list.disDays || 1;
        if(localStorage.getItem('insuredDate')){
            var startDate = JSON.parse(localStorage.getItem('insuredDate')).insuredDate;
            var insuredTlimt1 = JSON.parse(localStorage.getItem('insuredDate')).insuredTlimt;
            var insuredNum1 = JSON.parse(localStorage.getItem('insuredDate')).insuredNum;
        }
         //起保日期
        
        
        var endDate = insurance.endDate(new Date(), disDays, '-');
        if (startDate !== null && startDate > endDate) {
            insuredDate.value = startDate;

        } else {
            insuredDate.value = endDate;
        }
        if (insuredTlimt1 !== null) {
            for(var i=1;i<$('#insuredTlimt').find("option").length+1;i++){ 
                if($('#insuredTlimt').find("option:nth-child("+i+")").text()==insuredTlimt1){
                    $('#insuredTlimt').find("option:nth-child("+i+")").attr("selected",true);
                    planCode = JSON.parse(insuredTlimt.options[i-1].value).planCode;
            			amount = JSON.parse(insuredTlimt.options[i-1].value).amount;
            			kindCode = JSON.parse(insuredTlimt.options[i-1].value).kindCode;
           	 		insuredendDate = JSON.parse(insuredTlimt.options[i-1].value).value;
            			premium = JSON.parse(insuredTlimt.options[i-1].value).defalutValue;
            			
            			$('#insuredNum').trigger('change');
                }
            }
        } 
        if (insuredNum1 !== null) {
            for(var i=1;i<$('#insuredNum').find("option").length+1;i++){ 
                if($('#insuredNum').find("option:nth-child("+i+")").text()==insuredNum1){
                    $('#insuredNum').find("option:nth-child("+i+")").attr("selected",true);
                    $('#insuredNum').trigger('change');
                }
            }
        } 
    }
    insurance.check = function () {
        insuredDate = $('#insuredDate').val();
        var owner = $('#owner').val();
        var beInsured = $('#insured').val();
        if (insuredDate == '') {
            alertShow('请输入起保日期');
            return;
        }

        var endDate = insurance.endDate(new Date(), disDays, '-');
        console.log(endDate)
        if (insuredDate < endDate) {
            alertShow("起保日期不能小于当前日期" + disDays + "天");
            return;
        }
        
        var endDate1 = insurance.endDate(new Date(), max_disDays, '-');
        console.log(endDate)
        if (insuredDate > endDate1) {
            alertShow("起保日期不在范围内");
            return;
        }
        if (productionCode.indexOf("0398") >= 0) {
            endDate = insurance.endDate(new Date(), 30, '-');
            if (endDate < insuredDate) {
                alertShow('起保日期不能大于当前日期30天');
                return;
            }
        }
        if (productionCode == "0763") {
            if ($('#carlicenseNo').val() == "" ) {
                alertShow("请输入车牌号");
                return;
            }
            if ($('#carlicenseNo').val() != "") {
                if (!regVehicleNum($('#carlicenseNo').val())) {
                    return;
                }
            }
            if( $('#carbrandName').val() == ""){
                if( $('#carbrandName').val().length < 6){
                    alertShow("请输入6位以上的车牌型号名称");
                    return;
                }
            }
            if($('#carframeNo').val() == "") {
                alertShow("车架号不能为空");
                return;
            }
            if($('#carengineNo').val() == "") {
                alertShow("发动机号不能为空");
                return;
            }
        }
      

        if (owner == '') {
            alertShow('请输入投保人信息');
            return;
        }
        if (beInsured == '') {
            alertShow('请输入被保险人信息');
            return;
        }

        if (showChooseDialog == true) {
            $("#chooseDialog").show();
        } else {
            insurance.sendmgs();
        }
    };
    insurance.sendmgs = function () {
        var req = {},
            cont = [],
            insured = [],
            coverage = [],
            itemCar = [],
            baseVo = {},
            holder = {},
            insureds = {},
            coverageList = {},
            beneficiarys = {},
            itemCarList = {};
        var app = new InsMbsVehicleObj();
        var buyer = app.getBuyer();
        var benefits = app.getBenefits();
        baseVo.quotationNo = '';
        baseVo.account = account;
        baseVo.planCode = planCode;
        if (productionCode == "0763") {
            var val = $("#carseatCount").val() - 3;
            baseVo.planCode = baseVo.planCode + val + "1";
        }
        baseVo.kindCode = kindCode;
        baseVo.amount = amount;
        baseVo.premium = premium;
        insuredendDate =$('#insuredTlimt').find("option:selected").text();
        baseVo.underDay = insuredendDate;
        if(insuredendDate=='1年'){
            insuredendDate='365';
        }
        else{
            // insuredendDate =$('#insuredTlimt').find("option:selected").text().split('天')[0];
            var res= $('#insuredTlimt').find("option:selected").val();
            res=JSON.parse(res);
            insuredendDate = res.value;
        }
        var endDate = insurance.endDate(insuredDate, insuredendDate, '');
        endDate = endDate.toDate();
        endDate = endDate.setDate(endDate.getDate() - 1);


        baseVo.endDate = new Date(endDate).Format("yyyy" + "" + "MM" + "" + "dd");
        baseVo.endHour = '24';
        baseVo.startDate = insuredDate.replace(/-/g, '');
        baseVo.startHour = '00';

        //var account = MobileApp.getCookie("account");
        baseVo.account = account;
        baseVo.referralCode = referralCode; //员工工号
        baseVo.areaCode = areacode; //员工工号
        baseVo.comCode = comcode; //员工工号

        if (prodTypeNo == '0763') {
            $('.Insuretype').show();
            var carseatCount = document.getElementById('carseatCount'),
                index = carseatCount.selectedIndex;
            itemCarList.licenseNo = $('#carlicenseNo').val();
            itemCarList.frameNo = $('#carframeNo').val();
            itemCarList.brandName = $('#carbrandName').val();
            itemCarList.engineNo = $('#carengineNo').val();
            itemCarList.seatCount = carseatCount.options[index].value;
            itemCar.push(itemCarList);
            req.itemCarList = itemCar;
        }
        if (productionCode.indexOf("0398") >= 0) {
            if ($("#zipcode").val() == "") {
                alertShow('请输入邮政编码');
                return;
            }
            if ($("#zipcode").val().length !== 6) {
                alertShow('请输入正确的邮政编码');
                return;
            }
            if ($("#provCode").val() == "" || $("#cityCode").val() == "") {
                alertShow('请选择省市');
                return;
            }
            if ($("#address").val() == "") {
                alertShow('请输入房屋地址');
                return;
            }
            baseVo.addressCode = $("#zipcode").val();
            baseVo.addressName = $("#showCityPicker").html().replace(" ", "") + $("#address").val();
            baseVo.provinceCode = $("#cityCode").val();
        }

        if (buyer.getName() == "") {
            alertShow("请输入投保人姓名");
            return;
        }
        if (buyer.getCellphone() == "") {
            alertShow("请输入投保人电话");
            return;
        }
        if (buyer.getLic_no() == "") {
            alertShow("请输入投保人证件号");
            return;
        }
        if (buyer.getAddress() == "") {
            alertShow("请输入投保人地址");
            return;
        }
        holder.name = buyer.getName();
        holder.mobile = buyer.getCellphone();
        holder.idNo = buyer.getLic_no();
        holder.idType = buyer.getLic_type();
        holder.sex = buyer.getSex();
        holder.email = buyer.getEmail;
        holder.birthday = holder.idNo.substr(6, 8);
        holder.insuredtype = buyer.getRelation();
        holder.insuredProvince = buyer.getProvince();
        holder.insuredCity = buyer.getCity();
        holder.address = holder.insuredProvince + holder.insuredCity + buyer.getAddress();

        var flag = false;
        for(var i=0;i<benefits.length;i++){
                var a=benefits[i];
                for(var j=i+1;j<benefits.length;j++){
                    var b = benefits[j];
                    if(/*a.getName()==b.getName() &&*/ a.getLic_no()==b.getLic_no()){
                            alertShow("被保险人 "+a.getName()+" 和 "+b.getName()+" 身份证号码 重复，请修改！");
                            return;
                    }
                }
        }
        benefits.forEach(function (benefit, index) {
            if (index >= insursedPerson) {
                return false;
            }
            if (benefit.getName() == "") {
                alertShow("请输入被保险人姓名");
                flag = true;
                return;
            }
            if (benefit.getCellphone() == "") {
                alertShow("请输入被保险人电话");
                flag = true;
                return;
            }
            if (benefit.getLic_no() == "") {
                alertShow("请输入被保险人证件号");
                flag = true;
                return;
            }
            if (benefit.getAddress() == "") {
                alertShow("请输入被保险人地址");
                flag = true;
                return;
            }
//			var insureds = {};
            var insuredNum = document.getElementById('insuredNum'),
                selectedIndex = insuredNum.selectedIndex;
            insureds.name = benefit.getName();
            insureds.mobile = benefit.getCellphone();
            insureds.idNo = benefit.getLic_no();
            insureds.idType = benefit.getLic_type();
            insureds.mult = insuredNum.options[selectedIndex].value;
            var copy = parseInt(insureds.mult);
            if (copy > 1) { /*购买多份*/
                var unit = parseFloat(premium);
                unit *= copy;
                baseVo.premium = unit + "";

                unit = parseFloat(amount);
                unit *= copy;
                baseVo.amount = unit + "";
            }
            if (productionCode == "0701") {
                if (benefit.getCareerType() == "") {
                    alertShow("请选择被保险人人员类型");
                    flag = true;
                    return;
                }
                insureds.occupationCode = benefit.getCareerType();
                insureds.occupationCodeGrade = benefit.getCareerTypeCode();
            }
            if (productionCode == "0701") {
                if (benefit.getCareerType() == "") {
                    alertShow("请选择被保险人人员类型");
                    flag = true;
                    return;
                }
                insureds.occupationCode = benefit.getCareerType();
                insureds.occupationCodeGrade = benefit.getCareerTypeCode();
            }
            insureds.sex = benefit.getSex();
            insureds.email = benefit.getEmail;
            insureds.insuredtype = benefit.getRelation();
            insureds.insuredProvince = benefit.getProvince();
            insureds.insuredCity = benefit.getCity();
            insureds.address = insureds.insuredProvince + insureds.insuredCity + benefit.getAddress();
            
            if(benefit.getLic_type()=='01'){
	            	insureds.birthday = insureds.idNo.substr(6, 8);
	            var age = new Date();
	            age = age.getFullYear();
	            age = age - insureds.birthday.substr(0, 4);
	            var str = "购买年龄";
	            var _alert = false
	            if (minAge && age < minAge) {
	                _alert = true;
	                str += "不得低于" + minAge + "岁"
	            }
	            if (maxAge && age > maxAge) {
	                _alert = true;
	                str += "不得高于" + maxAge + "岁"
	            }
            }else{
            			insureds.birthday = '20170101';
            }
            
            if (_alert) {
                alertShow(str);
                flag = true;
                return;
            }
            insured.push(insureds);
        })
        if (flag) return;

        var num = $("#beInsured").find(".beInsuredItem").length;
        if (num > 1) {
            baseVo.amount = baseVo.amount * num;
            baseVo.premium = baseVo.premium * num;
        }

        if (prodTypeNo == '0763') {
            var _clone = JSON.parse(JSON.stringify(insureds));
            insured.push(_clone);
            insured[0].insuredtype = "62";
            insured[1].insuredtype = "63";
        }
        req.cmd = 'NewSingUnder';
        req.baseVo = baseVo;
        req.holder = holder;
        req.insureds = insured;
        $('#loading').show();
        MobileApp.setUrl(_vehicleNon);
        console.log(req);
        MobileApp.sendRequest(req, function (res) {
            $('#loading').hide();
            var res = JSON.parse(res);
            if (!res.result) {
                alertShow(res.error)
            } else {
                quotationNo = res.payload.vo.quotationNo;
                localStorage.removeItem('initIndex');
                // localStorage.removeItem('insuredDate');
                localStorage.removeItem('itemCarList');
                localStorage.removeItem('itemAddressList');
                localStorage.removeItem('copy');
                localStorage.setItem('sourceOrder', quotationNo);
                var app = new InsMbsVehicleObj();
                app.setQuotation(quotationNo);
                $('#zhifuye').show();
            }
        })
    }

    $("#descripdeep").on("click", function () {
        var activePlayer = $(this).prev().find(".swiper-slide-active");
        activePlayer.toggleClass("hidden");
        if (this.innerHTML == "展开") {
            this.innerHTML = "收起";
        } else {
            this.innerHTML = "展开";
        }
    })
    //同投保人
    $('.Insured').on('click', ".sameflag", function (e) {
        var e = e.target;
        var _li = $(e).parents("li");
        var index = _li.index();
        var app = new InsMbsVehicleObj();
        var buyer = app.getBuyer();
        var benefits = app.getBenefits();
        var benefit = benefits[index];

        if (e.src.indexOf('normal') > -1) {
            e.setAttribute('src', '../images/ico_tongtoubaoren_pre.png');
            _li.find('.beInsured').val($('#owner').val());
            benefits[index] = buyer;
            if (productionCode == "0701" && benefit != undefined) {
            		if("occupationCodeGrade" in benefit ){
            			benefits[index].occupationCodeGrade = benefit.occupationCodeGrade;
                		benefits[index].occupationCode = benefit.occupationCode;
            		}
            }
            app.setBenefits(benefits);
        } else if (e.src.indexOf('pre') > -1) {
            e.setAttribute('src', '../images/ico_tongtoubaoren_normal.png');
            _li.find('.beInsured').val("");
            benefit.setName('');
            benefit.setCellphone('');
            benefit.setLic_no('');
            benefit.setSex('');
            benefit.setRelation('');
            benefit.setEmail('');
            benefit.setProvince('');
            benefit.setCity('');
            benefit.setAddress('');
            benefits[index] = benefit;
            app.setBenefits(benefits);
        }

    })
    //支付方式
    var $index;
    $('.zhifu').click(function (e) {
        var e = e.target;
        $index = $(this).index();
        $(".zhifu img").attr('src', '../images/ico_select_normal.png');
        $(this).children()[0].setAttribute('src', '../images/ico_select_pre.png');
    })
    $('#lijizhifu').click(function () {
        if ($index == 0) {
            $('#loading').show();
            $('#zhifuye').hide();

            MobileApp.setUrl(_vehicle);
            req = {
                "cmd": "OnlinePay",
                "quotationNo": quotationNo,
                "type": '1'
            };
            MobileApp.sendRequest(req, function (result) {
                //获取返回对象
                $('#loading').hide();
                var result = JSON.parse(result);
                if (result.result) {
                    //console.log(result)
                    var vs = result.payload.orderInfo;
                    localStorage.setItem("erweima", vs.codeurlBase64);
                    localStorage.setItem("sourceOrder", vs.sourceOrder);
                    window.location.href = "ins_pay_wechat.html?action=nextpage";
                } else {
                    alertShow(result.error);
                }
            })
        } else if ($index == 1) {
            $('#loading').show();
            $('#zhifuye').hide();

            $('#loading').hide();
            var quotationBigVo = {
                "quotationVo": {
                    "quotationNo": quotationNo,
                }
            };
            var app = new InsMbsVehicleObj();
            var quotation = app.setQuotation(quotationBigVo);
            window.location.href = "ins_Communications.html?action=nextpage"
        } else if ($index == 2) {
            $('#loading').show();
            $('#zhifuye').hide();

            $('#loading').hide();
            var quotationBigVo = {
                "quotationVo": {
                    "quotationNo": quotationNo,
                }
            };
            var app = new InsMbsVehicleObj();
            var quotation = app.setQuotation(quotationBigVo);
            window.location.href = "ins_lijiPay.html?action=nextpage"
        } else {
            alertShow('请选择支付方式');
        }
    })
    insurance.getIfro();

    //立即支付
    $('.gpBtn').click(function () {
        var articleflag = document.getElementById('article');
        if (!articleflag.checked) {
            alertShow('请阅读并同意条款');
            return;
        }
        ;
        insurance.check();
    })

    //清空数据
    $(".clearStorage").on("click", function () {
        localStorage.removeItem("InsMbsVehicleObj_benefit");
        localStorage.removeItem("InsMbsVehicleObj_benefits");
        localStorage.removeItem("InsMbsVehicleObj_buyer");
        localStorage.removeItem("insuredDate");
        //localStorage.removeItem('initIndex');
        localStorage.removeItem('itemCarList');
        localStorage.removeItem('itemAddressList');
        localStorage.removeItem('copy');
        InsuranceTypesPC();
        $("#owner").val("");
        $(".beInsured").val("");
        $("#showCityPicker").html("选择省市");
        $("#beInsuredflag").attr("src", "../images/ico_tongtoubaoren_normal.png");
        $("#article").attr("checked", false);
    })

    /*
     * 获取账户信息
     */
    function GetreferralCode(account) {
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
            if (res.result) {
                var list = res.payload;
                initUser(list);

                if (res.payload.accountVo.isAttention == "0") {
                    $("#floating").show();
                    $("#btn").on("click", function () {
                        $("#floating").hide();
                    });
                }
            }
        })
    }

    /*
     * 初始化机构出单员列表
     */
    function initUser(list) {

        var listDiv = $("#userlist");
        var exts = list.exts;
        var type = list.accountVo.type;
        //散客不需要选择出单员
        if (type == "User") {
            showChooseDialog = "false";
            /*var acc = list.accountVo;
            acc.gender == "Male" ? acc.gender = 1 : acc.gender = 2;
            var info = {
                cellphone: acc.cellphone,
                name: acc.name,
                nickname: acc.nickname,
                province: acc.province,
                city: acc.city,
                address: acc.address,
                email: acc.email,
                id_card: acc.id_card,
                gender: acc.gender
            }
            sessionStorage.setItem("accountInfo",JSON.stringify(info));*/
            return;
        }
        //只有一个出单员时，默认选择该出单员
        if (exts.length == 1) {
            referralCode = exts[0].org_usercode || exts[0].agency_usercodelist;
            areacode = exts[0].areacode;
            comcode = exts[0].comCode;
            showChooseDialog = "false";
            return;
        }
        //多个出单员，循环赋值
        for (var i = 0; i < exts.length; i++) {
            var userItem = $("#userItem").clone();

            userItem.find(".name").html(exts[i].org_username || exts[i].agency_username);
            userItem.find(".userCode").val(exts[i].org_usercode || exts[i].agency_usercodelist);

            userItem.find(".areaCode").val(exts[i].areacode);
            userItem.find(".comCode").val(exts[i].comCode);

            userItem.find(".selected").attr("id", "id_" + i);
            userItem.find("label").attr("for", "id_" + i);
            userItem.removeClass("none");

            listDiv.append(userItem);
        }
    }

    /*
     * 确认出单员
     */
    $("#selectUser").on("click", function () {
        var item = $(".selected:checked");
        if (item.length == 0) {
            alertShow("请选择一个出单员");
            return;
        }

        var item = item.parent();
        referralCode = item.find(".userCode").val();
        comcode = item.find(".comCode").val();
        areacode = item.find(".areaCode").val();

        $("#chooseDialog").hide();
        insurance.sendmgs();
    })
    /*
    * 点击添加被保险人
    * */
    $("#addBeInsured").on("click", function () {
        addBeInsured(insursedPerson);
    });
})

//获取链接上的参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    //     alert(r);
    //     if(r!=null)return  unescape(r[2]); return null;
    if (r != null) return (r[2]);
    return null;
}

/**
 * 日期格式化
 * @param fmt 格式化内容 yyyy-MM-dd hh:mm:ss
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function initCityPicker() {
    $(".mui-poppicker").remove();
    $(".mui-backdrop").remove();
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "ListCityByProvince"
    };
    MobileApp.sendRequest(req, function (res) {
        var res = JSON.parse(res);
        var cityData = [];
        if (res.result) {
            var v = JSON.stringify(res.payload.vo);
            v = v.replace(/province/gi, "text");
            v = v.replace(/citys/gi, "children");
            v = v.replace(/name/gi, "text");
            v = v.replace(/provCode/gi, "value");
            v = v.replace(/provNo/gi, "value");
            v = JSON.parse(v);
            var city_picker1 = new mui.PopPicker({
                layer: 2
            });
            if ($(".mui-poppicker").length > 1) {
                console.log(1234)
                $(".mui-poppicker").remove();
                $(".mui-backdrop").remove();
                var city_picker1 = new mui.PopPicker({
                    layer: 2
                });
            }
            city_picker1.setData(v);
            $("#CityPicker").on("click", function () {
                city_picker1.show(function (items) {
                    $("#showCityPicker").html((items[0] || {}).text + " " + (items[1] || {}).text);
                    $("#provCode").val((items[0] || {}).value);
                    $("#cityCode").val((items[1] || {}).value);
                    var itemAddress = JSON.parse(localStorage.getItem('itemAddressList')) || {};
                    itemAddress.pc = $("#showCityPicker").html();
                    itemAddress.province = $("#provCode").val();
                    itemAddress.city = $("#cityCode").val();
                    localStorage.setItem('itemAddressList', JSON.stringify(itemAddress));
                });
            });
        } else {
            alertShow(res.Error)
        }
    });
}

$("#beInsured").on("click", ".delBeInsured", function (e) {
    var _this = $(e.target).parents("li");
    var index = _this.index();
    var app = new InsMbsVehicleObj();
    var benefits = app.getBenefits();
    benefits.splice(index, 1);
    app.setBenefits(benefits);
    _this.remove();
    if ($(".beInsuredItem").length == 1) {
        $(".delBeInsured").addClass("none");
    }
});

function addBeInsured(insursedPerson) {
    var item = $(".beInsuredItem");
    var index = item.length;
    if (index >= insursedPerson) {
        return;
    }
    var item = item.eq(0).clone();

    item.find(".beInsured").val("");
    item.find(".sameflag").attr("src", "../images/ico_tongtoubaoren_normal.png");

    $("#beInsured").append(item);
    $('.delBeInsured').removeClass("none");
    var app = new InsMbsVehicleObj();
    var benefits = app.getBenefits();
    if (benefits[index] == undefined) {
        benefits[index] = new Person();
    }
    app.setBenefits(benefits);
}

function getSettings() {
    var req = {
        "cmd": "Settins",
        "code": "reimRate"
    };
    MobileApp.sendRequest(req, function (res) {
        var res = JSON.parse(res);
        if (res.result) {
            $("#reimRate").html(res.payload.value)
        }
    });
    req.code = "result";
    MobileApp.sendRequest(req, function (res) {
        var res = JSON.parse(res);
        if (res.result) {
            $("#result").html(res.payload.value)
        }
    });
}

$("#carlicenseNo").change(function () {
    var plate = $(this).val().trim();
    plate = plate.toUpperCase();
    $(this).val(plate);
})

$("#carframeNo").change(function () {
    var cheJaHao = $(this).val().trim();
    cheJaHao = cheJaHao.toUpperCase();
    $(this).val(cheJaHao);
    var frameNoReg = /^[a-z||A-Z]{0,1}[0-9A-Z*]{16,}$/;
    if (!frameNoReg.test(cheJaHao)) {
        alertShow("车架号格式不正确");
    }
})

function initTabs(tabs) {
    var notice_image = tabs.notice_image;
    var speAgreement_image = tabs.speAgreement_image;
    var statement_image = tabs.statement_image;
    var claim_image = tabs.claim_image;
    if (claim_image) {
        $(".claim_image").show();
        $(".claim_image").addClass("active").siblings().removeClass("active");
        $("#claim_image").attr("src", claim_image);
    }
    if (statement_image) {
        $(".statement_image").show();
        $(".statement_image").addClass("active").siblings().removeClass("active");
        $("#statement_image").attr("src", statement_image);
    }
    if (speAgreement_image) {
        $(".speAgreement_image").show();
        $(".speAgreement_image").addClass("active").siblings().removeClass("active");
        $("#speAgreement_image").attr("src", speAgreement_image);
    }
    if (notice_image) {
        $(".notice_image").show();
        $(".notice_image").addClass("active").siblings().removeClass("active");
        $("#notice_image").attr("src", notice_image);
    }

    var _id = $("#tabs .active").attr("tag");
    $(_id).siblings().hide();
    $(_id).show();

    $(".tabs span").on("click", function () {
        $(".tabs span").removeClass("active");
        $(this).addClass("active");
        var _id = $(this).attr("tag");
        $(_id).siblings().hide();
        $(_id).show();
    })
}
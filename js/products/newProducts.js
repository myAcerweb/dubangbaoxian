var mySwiper = new Swiper('.swiper-container', {
    direction: "horizontal", /*横向滑动*/
    //loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
    pagination: ".swiper-pagination", /*分页器*/
    prevButton: ".swiper-button-prev", /*前进按钮*/
    nextButton: ".swiper-button-next", /*后退按钮*/
    autoplay: 3000, /*每隔3秒自动播放*/
    autoplayDisableOnInteraction: false,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
})
var isShare = true;
var title = '都邦保险热销产品'; // 分享标题
var desc = '为您提供车险、意外健康险、财产险报价和投保服务。'; // 分享描述
var link = location.href; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
var imgUrl = link.split("products.html")[0] + "../images/share/chexian.png"; // 分享图标
//初始化
window.onload = function () {

    //初始化广告
    GetAdss();

    //初始化产品大类
    GetCategorys();

    //获取产品列表
    ProductList("1");

    //获取账户信息
    getAccount();
}

/**
 * 网络获取     （广告）
 */
function GetAdss() {
    var account = MobileApp.getCookie("account");
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "GetAdss",
        "production_code": ""
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            var adsVos = res.payload.adsVos;
            $(adsVos).each(function (index, item) {
                //克隆对象
                var ads = $("#ads").clone();
                ads.find(".ads_img").attr("src", item.image_url);
                ads.show();

                //追加克隆对象
                $(".adss").append(ads);
                (function (it) {
                    if (it.nonVehicle) {
                        ads.click(function () {
                            window.location.href = 'sportsInsure.html?productionCode=' + it.production_code;
                        });
                    } else {
                        ads.click(function () {
                            window.location.href = 'ins_car_owner.html';
                        });
                    }
                })(item)
            });
            mySwiper.update()
        } else {
            alertShow(res.error);
        }
    });
};


/**
 * 网络获取     （产品大类）
 */
function GetCategorys() {
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "GetCategorys",
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            var categoryVos = res.payload.categoryVos;
            $(categoryVos).each(function (index, item) {
                var cat = $("#catt").clone();

                cat.find(".catlogo").attr("src", item.icon_url);
                cat.find(".catlogoTitle").html(item.categroy_name);
                cat.show();
                if (item.category_code === '0') {
                    cat.addClass("active");
                    cat.find(".catlogoTitle").addClass("activeColor");
                }
                $(".cats").append(cat);

                //绑定点击事件
                (function (it) {
                    cat.click(function () {
                        $('.catt').removeClass("active");
                        $(".catlogoTitle").removeClass("activeColor");
                        var $insureStyle = $('.insureStyle');
                        $insureStyle.show();
                        $insureStyle.each(function () {
                            var category_code = $(this).find(".category_code").html();
                            if (category_code != it.category_code) {
                                $(this).hide();
                            }
                            ;
                        });
                        var $rowStyle = $('.rowStyle');
                        $rowStyle.show();
                        $rowStyle.each(function () {
                            var category_code = $(this).find(".category_code").html();
                            if (category_code != it.category_code) {
                                $(this).hide();
                            }
                            ;
                        });
                        //全部
                        if (it.category_code == 0) {
                            $insureStyle.splice(0, 1);
                            $rowStyle.splice(0, 1);
                            $insureStyle.show();
                            $rowStyle.show();
                        }
                        cat.addClass("active");
                        cat.find(".catlogoTitle").addClass("activeColor");

                    });
                })(item)
            });

        } else {
            alertShow(res.error);
        }
    });
};


/**************************************************************************
 * 获取产品列表
 *
 * */
function ProductList(type) {
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
        showProduct(result.payload.products, type)

    });
};


//显示数据
function showProduct(products, type) {
	var bgcolor=[];
		bgcolor['0398A']='#D7B78E'; //租客
		bgcolor['0398B']='#FD8711';  //房东
		bgcolor['0701']='#9FB34E'; //意外不怕
		bgcolor['0709A']='#4889E6';//中国
		bgcolor['0709B']='#C27A30';//世界
		bgcolor['0710']='#F0AC47';//差旅
		
    $(products).each(function (index, item) {
        localStorage.setItem(item.productionCode, JSON.stringify(item));
        if (item.isEnable && item.isShow) {
            if (item.show_mode == "0") {
                var pro_0 = $("#pro_0").clone();
                if (item.status_icon){
                    pro_0.find(".image").attr("src",item.status_icon);
                }
                pro_0.find(".othName span").html(item.othName);
                pro_0.find(".othName span").css("background",bgcolor[item.productionCode]);
                
                pro_0.find(".productionName span").html(item.productionName);
                pro_0.find(".productionName span").css("background",bgcolor[item.productionCode]);
                
                pro_0.find(".price span").html(item.price + '<i class="start">元起</i>');
                pro_0.find(".price span").css("background",bgcolor[item.productionCode]);
                
                pro_0.find(".category_code").html(item.categoryCode);
                pro_0.css("background-image", "url(" + item.image_url + ")");
                pro_0.css("background-repeat", "no-repeat");
                pro_0.css("background-size", "cover");
                if(item.isShowSales){
                    pro_0.find(".totalSales").html("已售" + item.totalSales + "份");
                }
                if(item.isShowPromotional){
                    pro_0.find(".totalSales").html(item.deposit_price + '<i class="start">折扣价</i>');
                    pro_0.find(".totalSales").css("background",bgcolor[item.productionCode]);
                    pro_0.find(".deposit_price").html("原价" + item.cost_price);
                    pro_0.find(".deposit_price").css("background",bgcolor[item.productionCode]);
                }
                if(!item.isShowSales&&!item.isShowPromotional){
                 pro_0.find(".totalSales").hide();
                 pro_0.find(".deposit_price").hide();
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
                //pro_1.css("background-image","url("+item.image_url+")");
                //pro_1.css("background-repeat","no-repeat");
                //pro_1.css("background-size","cover");
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

/*
* 获取账户信息，判断是否是显示浮窗
* */
function getAccount() {

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
            if (res.payload.accountVo.isAttention == false) {
                $("#floating").show();
                $("#btn").on("click", function () {
                    window.location.href = "http://www.tpy10.net/create.php?name=gh_14b5837a66b1";
                });
            }
        }
    })
}






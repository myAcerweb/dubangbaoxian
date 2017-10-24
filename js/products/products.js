var mySwiper = new Swiper('.swiper-container', {
	direction: 'horizontal',
	loop: false,
	slidesPerView: 1.6,
	paginationClickable: true,
	spaceBetween: 30,
	freeMode: true,
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
})

/**************************************************************************
 * 初始化产品
 */
window.onload = function() {

		//清理遗留数据
		clearInsMbsVehicleObj();

		//获取产品列表
		ProductList();

		//初始化用户
		//userChecker();
	}
	/**************************************************************************
	 * 用户检查,检查是否本地缓存了用户的报价出单机构和用户
	 */
function userChecker() {
	/**
	 * 网络获取
	 */
	var account = MobileApp.getCookie("account");
	if(account == "") {
		// PC端测试,使用固定账号
		//account = "E18E76997CDB";
		checkAccount();
		return;
	}
	MobileApp.setUrl(_account);
	var req = {
		"account": account,
		"cmd": "GetAccountVo"
	};
	MobileApp.sendRequest(req, function(res) {
		res = JSON.parse(res);
		if(res.result) {
			exts = res.payload.exts;

			if(exts.length <= 0) {
				window.location.href = '../my/ins_employee_confirm.html?action=newpage'
			}
			//清理遗留数据
			clearInsMbsVehicleObj();
			//获取产品列表
			ProductList();
		} else {
			alertShow(res.error);
		}
	});
};

/**************************************************************************
 * 获取产品列表
 *
 * */
function ProductList() {
	//获取对象
	var app = new InsMbsVehicleObj();
	MobileApp.setUrl(_vehicle);
	//初始化参数
	var req = {
		"cmd": "ListProductions"
	};
	loadingShow('加载中');
	MobileApp.sendRequest(req, function(result) {
		loadingHide();
		//获取返回对象
		var result = JSON.parse(result, true);
		if(!result.result) {
			alertShow(result.error);
			return;
		}
		var products = result.payload.products;
		var category = new Array();
		for(var i = 0; i < products.length; i++) {
			category[products[i].categoryCode] = products[i].categoryName;
		}
		for(var i in category) {
			var title = $("#category_title").clone();
			var list = $("#category_list").clone();
			title.attr("id", "title_" + i);
			title.html(category[i]);
			list.attr("id", "list_" + i);

			title.show();
			list.show();
			$("body").append(title);
			$("body").append(list);
		}
		//遍历对象
		$.each(products, function(index, item) {
			localStorage.setItem(item.productionCode,JSON.stringify(item));
			if(item.isShow) {
				//克隆对象
				var product_Trip = $("#clone").clone();
				product_Trip.show();

				product_Trip.find("#prodict_name").html(item.othName);
				product_Trip.find("#product_description").html(item.productionName);
				product_Trip.find("#product_price").html("￥" + item.price + ".0起");
				product_Trip.find("#image_url").attr("src", item.image_url);

				//追加对象
				$("#list_" + item.categoryCode).find("#items").append(product_Trip);

				//初始化swiper滑动效果
				var swiper = new Swiper('.swiper-container', {
					slidesPerView : 1.6
				});

				(function(item) {
					product_Trip.click(function() {
						if(item.isNonVehicle) {
							window.location.href = 'sportsInsure.html?productionCode='+item.productionCode+"&rd="+new Date();
						} else {
							window.location.href = 'ins_car_owner.html?'+"&rd="+new Date();
						}
					});
				})(item);
			}
		});

	});
};












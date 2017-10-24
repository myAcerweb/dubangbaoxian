window.onload = function() {
	initPage();
}
var exts = new Array();

function initPage() {

	$("#checkcode_btn").on("click",function() {
		sendCheckCode();
	});
	$("#search_btn").click(function() {
		searchOrgUser();
	});

	initOrgers();
}

/**
 * 获取验证码
 */
function initOrgers() {
	var account = MobileApp.getCookie("account");
	if(account == "") {
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



    //显示转圈
	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {
		//隐藏转圈
		loadingHide();
		res = JSON.parse(res);
		if(res.result) {
			var list = res.payload.exts;
			var type = res.payload.accountVo.type;
			exts = res.payload.exts;
			if(type == "OrgUser" || type == "SuperUser"){
				$('#search_btn').css('background','#cccccc');
				$('#search_btn').unbind();
			}

			for(var i = 0; i < list.length; i++) {
				var item = $("#tempext").clone();
				if(list[i].org_username && list[i].org_usercode){
					item.show();
					item.find(".name").html(list[i].org_username);
					item.find(".number").html(list[i].org_usercode);
					$("#bind_list").append(item);
				}
				(function(it) {
					item.click(function() {
						localStorage.setItem('orguser', JSON.stringify(it));
						window.location.href = "ins_orguser_info.html?action=nextPage&bind=false&checkcode=";
					});
				})(list[i]);
			}
		} else {
			alert(res.error);
		}
	});
}

/**
 * 获取验证码
 */
function sendCheckCode() {
	//$("#loading").show();
	var user_code = $("#orguser").val();
	var flag = true;

	if(user_code == "") {
		alertShow("请输入工号");
		return;
	}
	for(var i = 0; i < exts.length; i++) {
		if(exts[i].org_usercode == user_code) {
			alertShow("已经绑定");
			return;
		}

		if(exts[i].agency_usercodelist == user_code){
			flag = false;
		}
	}
	if(exts.length == 0){
		flag = false;
	}
	/*if(flag){
		alertShow("该工号与已绑定的个人代理员工号不一致");
		return;
	}*/
	MobileApp.setUrl(_account);
	var account = MobileApp.getCookie("account");
	if(account == "") {
		//		return;
		//account = "E18E76997CDB";
		checkAccount();
		return;
	}
	var req = {
		"accountt": account,
		"org_user": user_code,
		"cmd": "SendCheckCodeForBindOrgUser"
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {

		loadingHide()

		res = JSON.parse(res);
		if(res.result) {
			disableSenchcheckcode();
		} else {
			alert(res.error);
			window.clearInterval(timerid);
			timer = 120;
			$("#checkcode_btn").removeAttr("disabled");
			$("#checkcode_btn").html("获取验证码");
		}
	});
}

/**
 * 查询工号
 */
function searchOrgUser() {
	var user_code = $("#orguser").val();
	var checkcode = $("#checkcode").val();
	if(user_code == "") {
		alertShow("请输入工号");
		return;
	}
	if(checkcode == "") {
		alertShow("请输入验证码");
		return;
	}
//	var src1 = $("#IsPromise").attr("src");
//	if(src1 != "../images/ico_xuanzhong.png") {
//		alertShow("请同意承诺书后再绑定");
//		return;
//	}
	var account = MobileApp.getCookie("account");
	if(account == "") {
		//		return;
		//account = "E18E76997CDB";
		checkAccount();
		return;
	}
	MobileApp.setUrl(_account);
	var chekCode=$("#checkcode").val();
	var req = {
		"account": account,
		"user_code": user_code,
		"cmd": "GetOrgUser",
		"checkCode":chekCode
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {

		loadingHide();
		res = JSON.parse(res);
		if(res.result) {
			var orguser = res.payload.orguser;
			localStorage.setItem('orguser', JSON.stringify(orguser));
			window.location.href = "ins_orguser_info.html?action=nextPage&bind=true&checkcode=" + checkcode;
		} else {
			alertShow(res.error);
		}
	});
}

////切换已阅读承诺书  选中/未选中
//$("#IsPromise").bind("click", function() {
//	var src1 = $("#IsPromise").attr("src");
//	if(src1 == "../images/ico_weixuan.png") {
//		$("#IsPromise").attr('src', "../images/ico_xuanzhong.png");
//	} else {
//		$("#IsPromise").attr('src', "../images/ico_weixuan.png");
//	};
//});

/**
 * 定时器
 */
var timer = 120;
var timerid;
function disableSenchcheckcode() {
	window.clearInterval(timerid);
	//定义一个反复执行的调用 
	timer = 120;
	$("#checkcode_btn").html(timer+"S");
	$("#checkcode_btn").attr("disabled","disabled");

	timerid = window.setInterval("disableSenchcheckcodeTimer()", 1000);
}

function disableSenchcheckcodeTimer() {
	timer--;
	$("#checkcode_btn").html(timer+"S");
	if(timer <= 0) {
		window.clearInterval(timerid);
		$("#checkcode_btn").removeAttr("disabled");
		$("#checkcode_btn").html("获取验证码");
	}
}


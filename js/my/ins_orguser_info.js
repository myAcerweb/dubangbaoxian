window.onload = function() {
	initPage();
}

function initPage() {
	//	MobileApp.getquery
	initOrgers();

}

function bindOrgUser() {
	var account = MobileApp.getCookie("account");
	if(account == "") {
		//		return;
		//account = "E18E76997CDB";
		checkAccount();
		return;
	}
	var orguser = localStorage.getItem('orguser');
	orguser = JSON.parse(orguser);
	var bind =  MobileApp.getParameterValue("bind");
	MobileApp.setUrl(_account);
	var req = {
		"account": account,
		"checkcode": MobileApp.getParameterValue("checkcode"),
		"ext": orguser,
		"bind": bind=="true"?true:false,
		"cmd": "BindOrgUser"
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {

		loadingHide();

		res = JSON.parse(res);
		if(res.result) {
			alertShow("操作成功");
			//window.history.go(-1);
			window.location.replace("ins_employee_confirm.html");
		} else {
			alertShow(res.error);
		}
	});
}

/**
 * 获取验证码
 */
function initOrgers() {
	var orguser = localStorage.getItem('orguser');
	orguser = JSON.parse(orguser);
	var orgerui = $("#orgeruser");
	orgerui.find(".phone").html(orguser.org_phoneno);
	orgerui.find(".usercode").html(orguser.org_usercode);
	orgerui.find(".username").html(orguser.org_username);
	orgerui.find(".orgname").html(orguser.org_comcname);
	orgerui.find(".usertype").html(orguser.org_usertypecode);

	var bind=MobileApp.getParameterValue("bind");
	if(bind=="true") {
		$("#bind_btn").html("绑定");
        $("#bind_btn").addClass("bg-color-d3a27c");
        $("#bind_btn").click(function() {
            bindOrgUser();
        });
	} else {
		$("#bind_btn").addClass("bg-color-d3a27c");
		$("#bind_btn").html("取消绑定");
		$("#bind_btn").click(function() {
			bindOrgUser();
		});
	}
}
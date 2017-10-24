window.onload = function() {
	initPage();
}

function initPage() {
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
			var type = res.payload.accountVo.type;
			click(type);
		} else {
			alert(res.error);
		}
	});
}

function click(type){
	if(type == "User"){
		$(".lists").addClass("bg-color-fff");
	}
	if(type == "OrgUser" || type == "AgencyUser" || type == "SuperUser"){
		$("#staff").addClass("bg-color-fff");
		$("#agent").addClass("bg-color-fff");
		$("#super").off("click");
	}
	/*if(type == "OrgAgencyUser"){
		$("#super").addClass("bg-color-fff");
		$("#staff").off("click");
		$("#agent").off("click");
	}*/
}
$("#super").on("click",function () {
	window.location.href = 'ins_orgAgencyUser_confirm.html?action=newpage';
});
$("#staff").on("click",function () {
	window.location.href = 'ins_employee_confirm.html?action=newpage';
})
$("#agent").on("click",function () {
	window.location.href = 'ins_agent_confirm.html?action=newpage';
})
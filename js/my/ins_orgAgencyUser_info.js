window.onload = function() {
	initPage();
}

function initPage() {

	initAgent();

}

function checkAgentUserCode(){
	var agentuser = localStorage.getItem('orgagentuser');
	agentuser = JSON.parse(agentuser);
	var userlist = JSON.parse(agentuser.agency_usercodelist);
	var usercode = $(".agentusercode").val().trim();
	var flag = true;
	
	if(usercode == ""){
		alertShow("请输入代理员工号");
		return;
	}
	
	userlist.forEach(function(item){
		if(item.USERCODE == usercode){
			agentuser.areacode = item.AREACODE;
			agentuser.packagetype = item.PACKAGETYPE;
			agentuser.packageCode = item.PACKAGEID;
			agentuser.agency_usercodelist = usercode;
			bindOrgUser(agentuser,usercode);
			flag = false;
			return false;
		}
	});
	if(flag){
		alertShow("您输入的员工号不正确")
	}
}

function bindOrgUser(agentuser,usercode) {
	var account = MobileApp.getCookie("account");
	if(account == "") {
		//		return;
		//account = "E18E76997CDB";
		checkAccount();
		return;
	}
	
	var bind =  MobileApp.getParameterValue("bind");
	MobileApp.setUrl(_account);
	var req = {
		"account": account,
		"ext": agentuser,
		"usercode": usercode,
		"bind": bind=="true"?true:false,
		"cmd": "BindAgentComUser"
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {
		loadingHide();

		res = JSON.parse(res);
		if(res.result) {
			alertShow("操作成功");
			window.location.replace("ins_orgAgencyUser_confirm.html");
		} else {
			alertShow(res.error);
		}
	});
}

/**
 * 初始化代理信息
 */
function initAgent() {
	var agentuser = localStorage.getItem('orgagentuser');
	agentuser = JSON.parse(agentuser);
	var agencyuser = $("#user");
	agencyuser.find(".agent_code").html(agentuser.agency_agentcode);
	agencyuser.find(".agent_name").html(agentuser.agency_username);
	agencyuser.find(".agreement_code").html(agentuser.agency_agreementcode);
	agencyuser.find(".comcode").html(agentuser.agency_comcode);
	agencyuser.find(".agreement_comcode").html(agentuser.agency_agreementcomcode);
	//agencyuser.find(".user_type").html(agentuser.agency_usertypecode);

	var bind=MobileApp.getParameterValue("bind");
	if(bind=="true") {
		$("#bind_btn").html("绑定");
		$("#usercode_input").removeClass("none");
		
		$("#bind_btn").on("click",function() {
			checkAgentUserCode();
		});
	} else {
		$("#bind_btn").html("取消绑定");
		$("#usercode").find(".user_code").html(agentuser.agency_usercodelist);
		$("#usercode").removeClass("none");
		
		$("#bind_btn").on("click",function() {
			bindOrgUser(agentuser,agentuser.agency_usercodelist);
		});
	}
}

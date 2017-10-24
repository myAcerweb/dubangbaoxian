window.onload = function() {
	initPage();
}

function initPage() {
	$("#search_btn").click(function() {
		searchOrgUser();
	});

	initOrgers();
}

/**
 * 获取账户信息
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
			var usercode = [];
		
			for(var i = 0; i < list.length; i++) {
				var item = $("#tempext").clone();
				if(list[i].agency_username && list[i].agency_usercodelist){
					item.show();
					item.find(".name").html(list[i].agency_username);
					item.find(".number").html(list[i].agency_usercodelist);
					$("#bind_list").append(item);
				}
                usercode.push(list[i].org_usercode || list[i].agency_usercodelist);
				/*if(list[i].org_usercode){
                    usercode.push(list[i].org_usercode);
				}*/
				
				(function(it) {
					item.click(function() {
						localStorage.setItem('agentuser', JSON.stringify(it));
						window.location.href = "ins_agentuser_info.html?action=nextPage&bind=false&checkcode=";
					});
				})(list[i]);
			}
			
			sessionStorage.setItem("orgUserCode",usercode);
		} else {
			alert(res.error);
		}
	});
}

/**
 * 查询工号
 */
function searchOrgUser() {
	var agreement_code = $("#agreementcode").val();
	//var checkcode = $("#checkcode").val();
	if(agreement_code == "") {
		alertShow("请输入代理协议号");
		return;
	}

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
		"agentcy_code": agreement_code,
		"user_code":"",
		"type":"2",
		"cmd": "GetAgentcyUser"
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {

		loadingHide();
		res = JSON.parse(res);
		if(res.result) {
			var agentuser = res.payload.agencyuser;
			localStorage.setItem('agentuser', JSON.stringify(agentuser));
			window.location.href = "ins_agentuser_info.html?action=nextPage&bind=true";
		} else {
			alertShow(res.error);
		}
	});
}

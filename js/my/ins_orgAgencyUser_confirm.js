window.onload = function() {
	initPage();
}
var exts = new Array();

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
			exts = res.payload.exts;
			/*if(list != null && list != '' && list != undefined){
				$('#search_btn').css('background','#cccccc');
				$('#search_btn').unbind();
			}*/
			for(var i = 0; i < list.length; i++) {
				var item = $("#tempext").clone();
				if(list[i].agency_username && list[i].agency_usercodelist){
					item.show();
					item.find(".name").html(list[i].agency_username);
					item.find(".number").html(list[i].agency_usercodelist);
					$("#bind_list").append(item);
				}
				(function(it) {
					item.click(function() {
						localStorage.setItem('orgagentuser', JSON.stringify(it));
						window.location.href = "ins_orgAgencyUser_info.html?action=nextPage&bind=false&checkcode=";
					});
				})(list[i]);
			}
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
		"type":"3",
		"cmd": "GetAgentcyUser"
	};

	var title = '加载中,请稍候...';
	loadingShow(title);
	MobileApp.sendRequest(req, function(res) {

		loadingHide();
		res = JSON.parse(res);
		if(res.result) {
			var orgagentuser = res.payload.agencyuser;
			localStorage.setItem('orgagentuser', JSON.stringify(orgagentuser));
			window.location.href = "ins_orgAgencyUser_info.html?action=nextPage&bind=true";
		} else {
			alertShow(res.error);
		}
	});
}

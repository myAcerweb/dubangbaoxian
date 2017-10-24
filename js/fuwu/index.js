function goto() {
  var arr = [
    'ins_wangdian',
    '#',
    'ins_lipei',
    'ins_baodan',
    'qidai',
    '#',
  ]
  $(".box").click(function() {
    var s = $(".box").index($(this));
    if(s == 4){
    	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx00943ba821e04a98&redirect_uri=http://wechat.dbic.com.cn/DBWechat/weixin/cardRegister.do?mhd=toLogin&response_type=code&scope=snsapi_base#wechat_redirect";
    }else{
    	window.location.href = arr[s] + '.html?action=newpage';
    }
  });

  var account = MobileApp.getCookie("account");
  getAuth(account);
}
goto();
function getAuth(account){
	MobileApp.setUrl(_vehicle);
    var req = {
      "cmd": "ListResource",
      "account": account,
      "module": "fuwu"
    };
    MobileApp.sendRequest(req, function(res) {
      var res = JSON.parse(res);
      if(res.result == false){
      	return;
      }
      var vo = res.payload.vo;
      for(var i = 0; i < vo.length; i++){
      	var _id = "#" + vo[i].resourceCode;
      	if(vo[i].auth){
      		$(_id).show();
      	}
      }
    });
}
$("#bdyz").click(function(){
	location.href = "ins_policyVerify.html"
})

// MobileApp.setCookie("account",'744D421BDC77');
function goto() {
  var arr = [
    'addOrder',
    'ins_claim_lists', //ins_claim_lists
    '../fuwu/qidai',
    'myTeam',
    'ins_car_owner_info',
    'ins_accreditation',
    'ins_order_list',
    'ins_share_qr',
    'ins_customer',
    '#'
  ]
  $(".box").click(function() {
    var s = $(".box").index($(this));
    window.location.href = arr[s] + '.html?action=newpage';
  });

  var account = MobileApp.getCookie("account");
  getmsg(account);
  getImg(account);
  getdata(account);
  getAuth(account);
}
goto();



function getmsg(account){
  MobileApp.setUrl(_vehicle);
    var req = {
      "cmd": "OrderSummary",
      "account": account,
    };
    MobileApp.sendRequest(req, function(res) {
      var res = JSON.parse(res);
      var orderSummary = res.payload.orderSummary;
      var fee = orderSummary.this_month_fee;
      if(fee > 10000){
        fee = (fee / 10000 ).toFixed(2) + "万";
      }
      $('.tbb').html(fee);
      $('.ybd i:nth-child(2)').html(orderSummary.this_month_order);
    });
}

function getImg(account){
  if(account == "") {
    // PC端测试,使用固定账号
    //    return;
    //account = "E18E76997CDB";
  }
  MobileApp.setUrl(_account);
  var req = {
    "account": account,
    "cmd": "GetAccountVo"
  };
  MobileApp.sendRequest(req, function(res) {
    res = JSON.parse(res);
    if(res.result) {
      var list = res.payload.exts[0] || {};
      var head_image_url = res.payload.accountVo.head_image_url;
      if(res.payload.accountVo != null && head_image_url != null){
        $('.ownerImg').attr('src',head_image_url);
      }else{
        $('.ownerImg').attr('src','../images/ico_grxx.png');
      }
      //$('.ownerName').html(res.payload.accountVo.name || res.payload.accountVo.nickname);
      
      if(res.payload.accountVo.type != "User"){
      	$(".message").show();
      }
      $('.ownerName').html(list.org_username);
    }
  });
}

function getdata(account){
  MobileApp.setUrl(_account);
    var req = {
      "cmd": "AccountSummary",
      "account": account,
    };
    MobileApp.sendRequest(req, function(res) {
      var res = JSON.parse(res);
      var total_account = res.payload.accountSummary.total_account;
        $('.tcy i:nth-child(2)').html(total_account);
    });
}
function getAuth(account){
	MobileApp.setUrl(_vehicle);
    var req = {
      "cmd": "ListResource",
      "account": account,
      "module": "me"
    };
    MobileApp.sendRequest(req, function(res) {
      var res = JSON.parse(res);
      var vo = res.payload.vo;
      for(var i = 0; i < vo.length; i++){
      	var _id = "#" + vo[i].resourceCode;
      	if(vo[i].auth){
      		$(_id).show();
      	}
      }
    });
}

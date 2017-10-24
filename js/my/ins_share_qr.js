var isShare = true;
var title = '都邦保险热销产品'; // 分享标题
var desc = '为您提供车险、意外健康险、财产险报价和投保服务。'; // 分享描述
var link = location.href; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
link = link.split("my/ins_share_qr.html");
var imgUrl = link[0] + "images/share/chexian.png"; // 分享图标
link = link[0] + "products/products.html" + link[1];

window.onload = function() {
	//初始化
	initPage();
}

function initPage() {
	//生成二维码
	init_qr();

}

/**
 * 生成二维码
 */
function init_qr() {
	var ref = location.href;
	var account = MobileApp.getCookie("account");
	getImg(account);
	
	if(ref.indexOf("orignal_account") < 0){
		if(ref.indexOf("?")==-1){
			ref +="?orignal_account="+account;
		}else{
			ref +="&orignal_account="+account;
		}
	}

	var wid = $(".qr")[0].offsetWidth;
	
	$(".qr").qrcode({
    	"render": "canvas",
    	"size": wid,
    	"quiet": 1,
    	"minVersion": 3,
    	"background":"#fff",
    	"color": "#333",
    	"text": ref
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
      var list = res.payload.exts;
      var head_image_url = res.payload.accountVo.head_image_url;
      if(res.payload.accountVo != null && head_image_url != null){
        $('.ownerImg').attr('src',head_image_url);
      }else{
        $('.ownerImg').attr('src','../images/ico_grxx.png');
      }

      $('.ownerName').html(list[0].org_username);
    } else {
      alert(res.error);
    }
  });
}
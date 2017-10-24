var isShare = isShare || "";
/**
 * 获取cookie函数
 * @param {Object} cname
 */
var getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if(c.indexOf(name) == 0) {
			return unescape(c.substring(name.length, c.length));
		}
	}
	return "";
};

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}

function clearAccuont(){
	//document.cookie = "account=; expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=wechat.dbic.com.cn.; path=/;";
}
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
/*********************************************************************************
 * 微信授权
 */
function weixinAuth() {
	var url = window.location.href;
	url = encodeURIComponent(url);

	$.ajax({
		url: _insGateWay + "/wechat/getJsapiTicket?url=" + url,
		success: function(result) {
			var config = {};
			config.jsApiList = ['onMenuShareTimeline',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',

			];
			config.nonceStr = result.noncestr;
			config.appId = result.appid;
			config.timestamp = result.timestamp;
			config.signature = result.signature;
			config.debug = false;

			wx.error(function(res) {
				//alertShow(JSON.stringify(res));
			});
			wx.ready(function() {
                wx.hideAllNonBaseMenuItem();
                showMenuItems();
			});
			wx.config(config);

		}
	});

}

function showMenuItems() {
    if(isShare == true){
        wx.showMenuItems({
            menuList: [
                "menuItem:share:appMessage",//发送给朋友
                "menuItem:share:timeline"//分享到朋友圈
            ],
            success: function(res) {},
            fail: function(res) {}
        });
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
}

/*********************************************************************************
 * 检查用户状态,如果没有accuont的cookie跳转到微信去获取
 */
function checkAccount() {
	if(!isWeiXin()) {
		//微信上线后打开
		var origin_url = window.location.href;
		//window.location = _insGateWay + "/wechat/menu?origin_url=" + origin_url;
		return;
	}
	var origin_url = window.location.href;
	var account = getCookie('account');
	if(account == null || account == undefined || account == '') {
		window.location = _insGateWay + "/wechat/menu?origin_url=" + origin_url;
		return;
	}
	if(origin_url.indexOf("orignal_account") == -1) {
		if(origin_url.indexOf("?") == -1) {
			origin_url += "?orignal_account=" + account;
		} else {
			origin_url += "&orignal_account=" + account;
		}
		window.location.replace(origin_url);
		return;
	}
	weixinAuth();
	var account_time = localStorage.getItem("account_time");
	if(account_time == null || account_time == '') {
		account_time = Date.now();
		localStorage.setItem("account_time", account_time);
	} else {
		var diff = Date.now() - account_time;
		if(diff > 1 * 24 * 3600 * 1000) { //7天后重新登录
			clearAccuont();
			//if(diff > 10 * 1000) { //10 秒后重新登录
			account_time = Date.now();
			localStorage.setItem("account_time", account_time);
			window.location = _insGateWay + "/wechat/menu?origin_url=" + origin_url;
			return;
		}
	}
}
checkAccount();
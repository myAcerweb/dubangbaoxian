/**
 * 咨果科技移动应用接口封装
 * 日期 @date 
 * 作者 @author
 */

/**
 * 创建请求参数
 */
function makeReq() {
	/**
	 * 随机时间戳
	 */
	this.ts = '';

	/**
	 * 调用时间戳
	 */
	this.t1 = 0;

	/**
	 * 账号
	 */
	this.account = '';

	/**
	 * 请求内容
	 */
	this.payload = '';

	/**
	 * 验证摘要
	 */
	this.digest = '';
	/**
	 * 设备ID
	 */
	this.udid = '';

	/**
	 * 咨果应用注册ID
	 */
	this.mudid = '';

	/**
	 * 应用bundle id
	 */
	this.bundle_id = '';

	/**
	 * 操作系统
	 */
	this.ostype = '';

	/**
	 * 设备型号
	 */
	this.osmodel = '';

	/**
	 * 操作系统版本
	 */
	this.osversion = '';

	/**
	 * 应用的版本
	 */
	this.appversion = '';
}

var MobileApp = {};
var mobileurl = '/microapp/mobile';

MobileApp.setUrl = function(url) {
		mobileurl = url;
	}
	/**
	 * Determine the mobile operating system.
	 * This function either returns 'iOS', 'Android' or 'unknown'
	 *
	 * @returns {String}
	 */
	//获取链接上的参数值
MobileApp.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		//     MobileApp.myAlert(r);
		//     if(r!=null)return  unescape(r[2]); return null;
		if(r != null) return(r[2]);
		return null;
	}

MobileApp.getMobileOperatingSystem = function() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return 'ios';
	} else if(userAgent.match(/Android/i)) {
		return 'anroid';
	} else {
		return 'unknown';
	}
};

/**
 * 获取cookie函数
 * @param {Object} cname
 */
MobileApp.getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if(c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

/**
 * 设置cookie函数
 * @param {Object} cname 变量
 * @param {Object} cvalue 值
 * @param {Object} exdays 超时时间
 */
MobileApp.setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
};

/**
 * 发送请求
 * @param {Object} payload
 * @param {Object} cbfunc
 */
MobileApp.sendRequest = function(payload, cbfunc1, cbfunc2) {
	var req = new makeReq();
	req.account = MobileApp.getCookie('account');
	req.ostype = MobileApp.getMobileOperatingSystem();
	req.payload = payload;
	var json = JSON.stringify(req);
	json = MobileApp.encode_utf8(json);
//	json = encodeURIComponent(json);    //2/9
	$.ajax({
		url: mobileurl,
		timeout:6000000,
		data: {
			req: json,
		},
		type: 'post',
		success: function(result) {
			cbfunc1(result);
		},
		error: function(result) {
			cbfunc2(result);
		}
	});
};
/**
 * 导出
 * url string
 * @param {Object} payload
 */
MobileApp.export = function(url,payload) {
	var req = new makeReq();
	req.account = MobileApp.getCookie('account');
	req.ostype = MobileApp.getMobileOperatingSystem();
	req.payload = payload;
	var json = JSON.stringify(req);
	window.location = url+"?req="+json;
};
/**弹框
 * @param {Object} msg
 */
MobileApp.myAlert = function(msg) {
	var paramJson = {
		title: "提示",
		content: msg,
		yes_action: "",
		no_action: ""
	}
	window.setTimeout(function() {
		MicroApp().pagetips(paramJson);
	}, 70)
}
MobileApp.myAlertCb = function(msg, yesFun) {
	var paramJson = {
		title: "提示",
		content: msg,
		yes_action: yesFun
	}
	window.setTimeout(function() {
		MicroApp().pagetips(paramJson);
	}, 70)
}
MobileApp.myConfirm = function(msg, yesFun, noFun, yes_param, no_param) {
	var paramJson = {
		title: "提示",
		content: msg,
		yes_action: yesFun,
		no_action: noFun,
		yes_param: yes_param,
		no_param: no_param
	}
	window.setTimeout(function() {
		MicroApp().pageConfirm(paramJson);
	}, 70)
}

//存储account到localStorage中
MobileApp.setAccount = function(value) {
		localStorage.setItem("account", value);
		//MobileApp.myAlert("setAccount " + value);
	}
	//从localStorage取出account
MobileApp.getAccount = function() {
		localStorage.getItem("account");
		//MobileApp.myAlert("setAccount " + value);
	}
	//将localStorage中的account移除
MobileApp.clearAccount = function() {
	localStorage.removeItem("account");
	//MobileApp.myAlert("clearAccount");
}

//获取链接上的参数值
MobileApp.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		//     MobileApp.myAlert(r);
		//     if(r!=null)return  unescape(r[2]); return null;
		if(r != null) return(r[2]);
		return null;
	}
	/**
	 *中文编码 
	 * @param {Object} s
	 */
MobileApp.encode_utf8 = function(s) {
	return unescape(encodeURIComponent(s));
}

MobileApp.decode_utf8 = function(s) {
	return decodeURIComponent(escape(s));
}
MobileApp.getTimeStr = function(time) {
	//计算消息发出时间
	var nowDate = (new Date().getTime());
	var arr = time.split(/[- :]/);
	var createDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
	var expireDate = nowDate - createDate;
	if(expireDate <=0){
		expireDate = 1000;
	}
	var weekSeconds = 604800000; //一周的秒数
	var daySeconds = 86400000; //一天的秒数
	var hourSeconds = 3600000; //一小时的秒数
	var minuteSeconds = 60000; //分钟的秒数
	if(expireDate >= weekSeconds) {
		//expireTime = (new Date(time)).toLocaleDateString().replace("/", "-").replace("/", "-");
		expireTime = time;
	} else if(expireDate < weekSeconds && expireDate >= daySeconds) {
		expireTime = Math.floor(expireDate / daySeconds) + '天前';
	} else if(expireDate < daySeconds && expireDate >= hourSeconds) {
		expireTime = Math.floor(expireDate / hourSeconds) + '小时前';
	} else if(expireDate < hourSeconds && expireDate >= minuteSeconds) {
		expireTime = Math.floor(expireDate / minuteSeconds) + '分钟前';
	} else if(expireDate < minuteSeconds) {
		expireTime = Math.floor(expireDate / 1000) + '秒前';
	}
	return expireTime;
}
//处理返回字符串时间，去掉秒
MobileApp.changeShowTime = function(time){
	var arr = time.split(":");
	var newTime = arr[0]+":"+arr[1];
	return newTime;
}
//处理返回字符串时间，去掉时分秒
MobileApp.changeShowTimeDate = function(time){
	var arr = time.split(" ");
	var newTime = arr[0];
	return newTime;
}
//将时间“2017-2-14”转换为“2017-02-14 00：00：00”
MobileApp.changeShowTimeType = function(time){
	var arrMonth = time.split("-")[1];
	var arrDay = time.split("-")[2];
	if(arrMonth.length == 1){
		arrMonth = "0" + arrMonth 
	}
	if(arrDay.length == 1){
		arrDay = "0" + arrDay
	}
	var newTime = time.split("-")[0] + "-" + arrMonth + "-" +arrDay + " 00:00:00";
	return newTime;
}
//加载转圈
MobileApp.loading = function(status){
	if($("div").hasClass("loading")){
		document.getElementsByClassName("loading")[0].style.display = status;
	}else{
		var str = '<div class="loading" style="display:'+ status +'">'+
		'	<img src="../img/loading2.gif"/>'+
		'</div>';
	   $("body").append(str);
	}
}
MobileApp.formatNum = function(num) {
	/*console.log(num);*/
	str = String(num)
	var newStr = "";
	var count = 0;

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		//str = newStr + ".00"; //自动补小数点后两位
		str = newStr;
		/*console.log(str)*/
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
		/*console.log(str)*/
	}
	return str;
}
MobileApp.myinitPage = function() {
	//initPage();
}

MobileApp.getParameterValue = function(name) {
	function getParameterName(str) {
		var start = str.indexOf("=");
		if(start == -1) {
			return str;
		}
		return str.substring(0, start);
	}

	function getParameterValue(str) {
		var start = str.indexOf("=");
		if(start == -1) {
			return "";
		}
		return str.substring(start + 1);
	}
	var url = document.location.href;
	var start = url.indexOf("?") + 1;
	if(start == 0) {
		return "";
	}
	var value = "";
	var queryString = url.substring(start);
	var paraNames = queryString.split("&");
	for(var i = 0; i < paraNames.length; i++) {
		if(name == getParameterName(paraNames[i])) {
			value = getParameterValue(paraNames[i])
		}
	}
	return value;
};









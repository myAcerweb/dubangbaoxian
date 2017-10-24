Date.prototype.toFomatorString = function(formator) {
	var returnText = formator.toUpperCase();
	if(returnText.indexOf("YYYY") > -1) {
		returnText = returnText.replace("YYYY", 1900 + this.getYear());
	}

	if(returnText.indexOf("MM") > -1) {
		var s = this.getMonth() + 1;
		if(s < 10) {
			s = "0" + s;
		}
		returnText = returnText.replace("MM", s);
	}

	if(returnText.indexOf("DD") > -1) {
		var s = this.getDate();
		if(s < 10) {
			s = "0" + s;
		}
		returnText = returnText.replace("DD", s);
	}

	if(returnText.indexOf("HH") > -1) {
		var s = this.getHours();
		if(s < 10) {
			s = "0" + s;
		}
		returnText = returnText.replace("HH", s);
	}

	if(returnText.indexOf("MI") > -1) {
		var s = this.getMinutes();
		if(s < 10) {
			s = "0" + s;
		}
		returnText = returnText.replace("MI", s);
	}

	if(returnText.indexOf("SS") > -1) {
		var s = this.getSeconds();
		if(s < 10) {
			s = "0" + s;
		}
		returnText = returnText.replace("SS", s);
	}

	if(returnText.indexOf("SI") > -1) {
		returnText = returnText.replace("SI", this.getMilliseconds());
	}
	return returnText;
}
Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
}

String.prototype.toDate = function() {
	var temp = this.toString();
	temp = temp.replace(/-/g, "/");
	if(temp.lastIndexOf('/', 0) === -1 && temp.length == 8) {
		var newstr = temp.substring(0, 4) + "/";
		newstr += temp.substring(4, 6) + "/";
		newstr += temp.substring(6, 8);
		temp = newstr;
	}
	var date = new Date(Date.parse(temp));
	return date;
}
String.prototype.startWith = function(prefix) {
	return this.toString().lastIndexOf(prefix, 0) === 0;
}

String.prototype.endWith = function(suffix) {
	return this.toString().indexOf(suffix,
		this.toString().length - suffix.length) !== -1;
}

function regVehicleNum(str) {
	var regex = /^[\u4e00-\u9fa5]{1}[A-Z]{1}\w{5,6}$/;
	if(!regex.test(str)) {
		alertShow("车牌格式不正确");
		return false;
	}
	return true;
}

function phoneVerification(str) {
	reg = /^1[34578]\d{9}$/
	if(!reg.test(str)) {
		alertShow("手机格式不正确");
		return false;
	}
	return true;
}

function checkID(ID,value) {
	if(typeof ID !== 'string') {
		alertShow('非法字符串');
		return false;
	}
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	};
	var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
	var d = new Date(birthday);
	var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
	var currentTime = new Date().getTime();
	var time = d.getTime();
	var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
	var sum = 0,
		i, residue;
	if(city[ID.substr(0, 2)] === undefined) {
		alertShow('非法地区');
		return false;
	}
	if(time >= currentTime || birthday !== newBirthday) {
		alertShow('非法生日');
		return false;
	}
	for(i = 0; i < 17; i++) {
		sum += ID.substr(i, 1) * arrInt[i];
	}
	residue = arrCh[sum % 11];
	if(residue.toUpperCase() !== ID.substr(17, 1).toUpperCase()) {
		alertShow('非法身份证哦' + ID.substr(17, 1).toUpperCase() + ' ' + residue.toUpperCase());
		return false;
	}
	return true;
	//return city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女")
}

function idReg(str,value) {
	return checkID(str,value);
	//	reg = /(^\d{15}$)|(^\d{17}[\d|X|x]$)/;
	//	if(!reg.test(str)) {
	//		alertShow("身份证格式不正确");
	//		return false;
	//	}
	//	return true;
}

function specialPlane(str) {
	reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	if(!reg.test(str)) {
		alertShow("电话格式不正确");
		return false;
	}
	return true;
}

String.prototype.isEmpty = function() {
	if(this.toString() == undefined) {
		return true;
	}
	if(this.toString() == null) {
		return true;
	}
	if(this.toString() == "") {
		return true;
	}
	return false;
}

function clearInsMbsVehicleObj() {
	var app = new InsMbsVehicleObj();
	//车型信息
	app.setVehicleType("");
	//险种信息
	app.setKinds("");
	//报价结果
	app.setQuotation("");
	//受益人
	app.setBenefit("");
	//投保人
	app.setBuyer("");
}
//获取链接上的参数值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	//     alert(r);
	//     if(r!=null)return  unescape(r[2]); return null;
	if(r != null) return(r[2]);
	return null;
}
/***
 *  接口调用URI
 */
var _vehicle = "/insGateWay/vehicle",
	_vehiclePc = "/insGateWay/vehiclePc",
	_vehicleNon = "/insGateWay/vehicleNon",
	_account = "/insGateWay/account",
	_insurance = "/insGateWay/insurance",
	_ocr = "/SrvHTMLAPI",
	_allinPay = "",
	_insGateWay = "/insGateWay";

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch(e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch(e) {}
	with(Math) {
		r1 = Number(arg1.toString().replace(".", ""))
		r2 = Number(arg2.toString().replace(".", ""))
		return(r1 / r2) * pow(10, t2 - t1);
	}
}
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function(arg) {
		return accDiv(this, arg);
	}
	//乘法函数，用来得到精确的乘法结果
	//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	//调用：accMul(arg1,arg2)
	//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch(e) {}
	try {
		m += s2.split(".")[1].length
	} catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
		return accMul(arg, this);
	}
	//加法函数，用来得到精确的加法结果
	//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	//调用：accAdd(arg1,arg2)
	//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch(e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch(e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return(arg1 * m + arg2 * m) / m
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
		return accAdd(arg, this);
	}
	//减法函数，用来得到精确的减法结果
	//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
	//调用：accSubtr(arg1,arg2)
	//返回值：arg1减去arg2的精确结果
function accSubtr(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch(e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch(e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个subtr 方法，调用起来更加方便。
Number.prototype.subtr = function(arg) {
	return accSubtr(arg, this);
}
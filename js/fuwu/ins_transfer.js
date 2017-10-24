window.onload = function() {
	initPage();
}

function initPage() {
	v = JSON.parse(sessionStorage.getItem("transfer"));
	var mapObj = new AMap.Map('container', {
		zoom: 18,
		center: [v.lon, v.lat],
		resizeEnable: true,
	});
	$("#loading").show();
	var item = $("#address");
	item.find(".name").html(v.storeName);
	item.find(".addr").html(v.address);
	item.find(".tel").html(v.telephone);
	item.find(".tel").attr("href","tel:" + v.telephone);

	var marker = new AMap.Marker({
		icon: '../images/ico_loaction.png', //24px*24px
		position: [v.lon, v.lat],
		map: mapObj
	});

	$("#loading").hide();
}
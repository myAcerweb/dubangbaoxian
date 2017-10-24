var mapObj;
window.onload = function () {
    mapObj = new AMap.Map('container', {
        zoom: 10,
        resizeEnable: true,
    });
    initPage();
}

function initPage() {
    $("#loading").show();
    /**
     * 显示地图，获取定位
     */

    mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false, //显示定位按钮，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            showMarker: false,
            showCircle: false,
            extensions: "base"
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        //返回定位信息
        AMap.event.addListener(geolocation, 'complete', function (res) {
            //获取附近网点
            sessionStorage.setItem("curaddr", JSON.stringify(res.addressComponent))
            getNearlyWD(res.position);
        });
        //返回定位出错信息
        AMap.event.addListener(geolocation, 'error', function (res) {
            if (res.message == "Geolocation permission denied.") {
                alertShow("无法定位，请打开定位设置");
                setTimeout("window.location.href='ins_more_wangdian.html?action=newpage'", 1000);
                return;
            }
            $("#loading").hide();
            alertShow("定位错误")
        });
    });

}

//获取附近网点
function getNearlyWD(p) {
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "ListStore",
        "lat": p.lat,
        "lon": p.lng
    };
    MobileApp.sendRequest(req, function (res) {
        $("#loading").hide();
        res = JSON.parse(res);
        if (res.result) {
            //显示网点
            showList(res.payload.listVo.storeVo);
        } else {
            alertShow(res.error);
        }
    });
}

//显示网点
function showList(v) {
    var wdList = $("#wdList");
    $(".num").html(v.length >= 3 ? 3 : v.length);
    $(v).each(function (index, s) {
        if (index > 2) {
            return false;
        }
        var item = $("#address").clone();
        item.removeClass("none");
        item.find("i").html(index + 1);
        item.find(".name").html(s.storeName);
        item.find(".addr").html(s.address);
        item.find(".tel").html(s.telephone);
        item.find(".tel").attr("href", "tel:" + s.telephone);
        wdList.append(item);

        var marker = new AMap.Marker({
            icon: '../images/ico_loaction' + (index + 1) + '.png', //24px*24px
            position: [s.lon, s.lat],
            offset: new AMap.Pixel(-12, -12),
            map: mapObj
        });

        item.on("click", function (e) {
            if (e.target.tagName !== "A") {
                sessionStorage.setItem("transfer", JSON.stringify(s));
                location.href = "ins_transfer.html";
            }
        })
    });
    $(".list").show();
    mapObj.setFitView();
    mapObj.setZoom(mapObj.getZoom() - 1);
    mapObj.panBy(0, -$(".list")[0].offsetHeight / 2);
}

$("#more").on("click", function () {
    location.href = "ins_more_wangdian.html"
})
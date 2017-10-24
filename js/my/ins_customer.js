$(document).ready(function () {
    getAccount();
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
});

var index = 0;
var sortType = 0;
var name = "";

//下拉刷新
function pullfreshDown() {
    $('#members').html('');
    getCustomList();
}

//上拉加载
function pullfreshUp() {
    $('#members').html('');
    getCustomList()
}

function getCustomList() {
    var account = MobileApp.getCookie("account");
    MobileApp.setUrl(_vehicle);
    var req = {
            "cmd": "MyCustomer",
            "customervo": {
                "customerAccount": account,
                "name": name,
                "sortType": sortType.toString(),
                "size": "10",
                "index": index.toString()
            }
        }
    ;
    MobileApp.sendRequest(req, function (res) {
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
        mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
        $(".query").hide();
        res = JSON.parse(res);
        if (res.result === true) {
            $(".customerNum").html(res.payload.total);
			$(".premium").html(res.payload.total_premium);
            // console.log(res.payload.total_premium);
            setCustomList(res.payload.customervos);
        } else {
            alertShow(res.error);
        }
    });
}


function setCustomList(res) {
    var list = $("#members");
    res.forEach(function (vs) {
        var item = $("#member").clone().attr("id", "");
        item.find(".name").html(vs.name);
        item.find(".tel").html(vs.week);
        item.find(".birthday").html(format(vs.birthday));
        item.find(".carNo").html(vs.quarter);
        item.find(".eDate").html(vs.endDate);
        if (vs.gender === "1") {
            item.find(".female").hide();
        } else {
            item.find(".male").hide();
        }

        item.on("tap", function () {
            window.location.href = "ins_customer_info.html?custCode=" + vs.custCode;
        })

        item.show();
        list.append(item);
    })
}

//tab切换
$(".tab").on("click", function () {
    sortType = $(".tab").index($(this));
    $(this).addClass("active").siblings().removeClass("active");
    pullfreshDown();
});

// 点击客户搜索按钮
$(".search").on("tap", function () {
    $(".query").show();
});

//搜索客户
$(".queryBtn").on("click", function () {
    name = $("#queryNo").val();
    pullfreshDown();

})

//获取用户信息
function getAccount() {
    var account = MobileApp.getCookie("account");
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            var vo = res.payload.accountVo;
            if (vo) {
                $(".imgUrl").attr("src", vo.head_image_url);
                $(".userName").html(vo.name || vo.nickname);
            }

        }
    });
}

function thousandBitSeparator(num) {
    return num && num
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ",";
        });
}

function format(date) {
    if (date) {
        date = date.split(" ")[0];
        date = date.split("-");
        date = date[0] + "年" + date[1] + "月" + date[2] + "日"
        return date;
    } else {
        return "";
    }
}

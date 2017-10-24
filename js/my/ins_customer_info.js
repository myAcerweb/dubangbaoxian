$(document).ready(function () {
    var custCode = MobileApp.getParameterValue("custCode");
    getCustomInfo(custCode);
});

function getCustomInfo(custCode) {
    var account = MobileApp.getCookie("account");
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "CustomerDetails",
        "customervo": {
            "custCode": custCode,
        }
    };
    MobileApp.sendRequest(req, function (res) {
        res = JSON.parse(res);
        if (res.result) {
            setCustomInfo(res.payload);
        } else {
            alertShow(res.error);
        }
    });
}
// function endHour(time) {
//     var endHour = time.toDate();
//     endHour.setSeconds(endHour.getSeconds() - 1);
//     endHour = endHour.toFomatorString("YYYY-MM-DD") + " 24:00:00";
//     return endHour;
// }

function setCustomInfo(res) {
    var customervo = res.customervo;
    var vehiclevos = res.customervehiclevos;

    $("member").html();
    if (customervo.gender === "1") {
        $("#female").hide();
    } else {
        $("#male").hide();
    }
    $("#name").html(customervo.name);
    $("#tel").html(customervo.week);
    $("#birthday").html(format(customervo.birthday));
    $("#carNo").html(customervo.quarter);

    vehiclevos.forEach(function (vs) {
        var item = $("#panel").clone().attr("id", "");
        item.find(".panel-top").html(vs.quarter);
        if(vs.cplyNoBI){
            item.find(".cplyNoBI").html(vs.cplyNoBI);
            item.find(".premiumBI").html(vs.premiumBI);
            item.find(".syStartDate").html(vs.syStartDate);
            item.find(".syEndDate").html(vs.syEndDate);
            item.find(".sy").show();
        }
        if(vs.cplyNoCI){
            item.find(".cplyNoCI").html(vs.cplyNoCI);
            item.find(".premiumCI").html(vs.premiumCI);
            item.find(".jqStartDate").html(vs.jqStartDate);
            item.find(".jqEndDate").html(vs.jqEndDate);
            item.find(".jq").show();
        }

        item.show();
        $("body").append(item);
    })
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
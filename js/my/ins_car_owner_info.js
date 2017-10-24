window.onload = function () {
    //初始化
    initPage();
}

function initPage() {
    //初始化车主信息
    init_Vehicle_Owner();

}

/**
 * 车主信息
 */
function init_Vehicle_Owner() {

    var account = MobileApp.getCookie("account");

    if (account == "") {
        // PC端测试,使用固定账号
        //		return;
        //account = "E18E76997CDB";

    }
    MobileApp.setUrl(_account);
    var req = {
        "account": account,
        "cmd": "GetAccountVo"
    };

    var title = '加载中,请稍候...';
    loadingShow(title);
    MobileApp.sendRequest(req, function (res) {
        loadingHide();
        res = JSON.parse(res);
        if (res.result) {
            var head_image_url = res.payload.accountVo.head_image_url;
            var type = res.payload.accountVo.type;
            var edit = MobileApp.getParameterValue("edit");

            if (res.payload.accountVo != null && head_image_url != null) {
                $('.tx').attr('src', head_image_url);
            } else {
                $('.tx').attr('src', '../images/ico_grxx.png');
            }

            if (type === "User" || edit === "true") {
                let list = res.payload.accountVo;
                showUser(list);
            } else if (type === "OrgUser" || type === "SuperUser") {
                let list = res.payload.exts[0] || {};
                showOrgUser(list);
            } else if (type === "AgencyUser" || type === "OrgAgencyUser") {
                let list = res.payload.exts[0] || {};
                showAgencyUser(list);
            }

            if (edit === "true") {
                removeDisable();
            }
        } else {
            alertShow(res.error);
        }
    });
}

//散客
function showUser(list) {
    $("#org_username input").val(list["name"]); //姓名
    $("#org_phoneno input").val(list['cellphone']); //手机
    $("#sex select").val(list.gender)
    $("#cardNo input").val(list.id_card);
    $("#isNewCar input").attr("checked", list.isNewCar);
    $("#carNo input").val(list.licenseNo);
    $("#email input").val(list.email);
    $("#address textarea").val(list.address);
    $(".user").removeClass("none");
    $("#edit").show();
}

//业务员或业务员+个人代理
function showOrgUser(list) {
    $("#org_usercode i").html(list["org_usercode"]); //员工工号
    $("#org_username input").val(list["org_username"]); //姓名
    $("#org_usertypecode i").html(list["org_usertypecode"]); //人员类型
    $("#org_comcname i").html(list['org_comcname']); //归属团队
    $("#org_phoneno input").val(list['org_phoneno']); //手机
    $(".orguser").removeClass("none");
}

//个人代理或机构代理
function showAgencyUser(list) {
    $("#agentusercode i").html(list["agency_usercodelist"]); //代理员工号
    $("#agentusername i").html(list["agency_username"]); //姓名
    $("#agreementcode i").html(list["agency_agreementcode"]); //代理协议号
    $("#agentcomcode i").html(list['agency_comcode']); //代理机构代码
    $(".agentuser").removeClass("none");
}

//姓名校验
function nameReg(str) {
    var regex = /^[\u4e00-\u9fa5]{2,}$/;
    if (!regex.test(str)) {
        alertShow("名字格式不正确");
        return false;
    }
    return true;
}

//详细地址校验
function detailAreaReg(str) {
    if (str.length == 0) {
        alertShow("请填写地址");
        return false;
    }
    if (str.length < 4) {
        alertShow("地址太短");
        return false;
    }
    return true;
}

$("#edit").click(function () {
    removeDisable();
});

function removeDisable() {
    $("#org_username").find('input').attr({
        'disabled': false,
        'placeholder': '请输入姓名'
    });
    $("#org_phoneno").find('input').attr({
        'disabled': false,
        'placeholder': '请输入手机号'
    });
    $("#cardNo").find('input').attr({
        'disabled': false,
        'placeholder': '请输入身份证'
    });
    $("#carNo").find('input').attr({
        'disabled': false,
        'placeholder': '请输入车牌号'
    });
    $("#isNewCar").find('input').attr({
        'disabled': false,
        'placeholder': ''
    });
    $("#email").find('input').attr({
        'disabled': false,
        'placeholder': '请输入电子邮箱'
    });
    $("#address").find('textarea').attr({
        'disabled': false,
        'placeholder': '请输入详细地址'
    });

    $(".user").find("select").attr("disabled", false);
    $("#edit").hide()
    $("#save").show();
}

$("#isNewCar input").on("change", function () {
    var isNewCar = $(this).is(":checked");
    if (isNewCar) {
        $("#carNo input").val("");
        $("#carNo input").attr({"disabled": "disabled", "style": "background:#f8f8f8"});
    }else{
        $("#carNo input").attr({"disabled": false, "style": "background:#ffffff"});
    }
})

$("#save").on("click", function () {
    var name = $("#org_username").find('input').val();
    var phone = $("#org_phoneno").find('input').val();
    var sex = $("#sex select").val();
    var cardNo = $("#cardNo").find("input").val();
    var isNewCar = $("#isNewCar").find("input").is(":checked");
    var carNo = $("#carNo").find("input").val();
    var email = $("#email").find("input").val();
    var address = $("#address").find("textarea").val();
    var edit = MobileApp.getParameterValue("edit");
    if (!nameReg(name)) {
        return;
    }
    if (!phoneVerification(phone)) {
        return;
    }

    if (cardNo || edit == "true") {
        if (!idReg(cardNo)) return;
    }
    if (address) {
        if (!detailAreaReg(address)) return;
    }
    if (!isNewCar) {
        if (!regVehicleNum(carNo)) {
            return;
        }
    }
    var account = MobileApp.getCookie("account");
    if (account == "") {
        // PC端测试,使用固定账号
        //		return;
        //account = "E18E76997CDB";
        checkAccount();
        return
    }
    MobileApp.setUrl(_account);
    var req = {
        "accountVo": {
            "account": account,
            "name": name,
            "cellphone": phone,
            "gender": sex,
            "id_card": cardNo,
            "isNewCar": isNewCar,
            "licenseNo": carNo,
            "email": email,
            "address": address
        },
        "cmd": "ModifyAccount"
    };
    var title = '加载中,请稍候...';
    loadingShow(title);
    MobileApp.sendRequest(req, function (res) {
        loadingHide();
        res = JSON.parse(res);
        if (res.result) {
            alertShow("保存成功");
            if (edit === "true") {
                history.go(-1);
            }
            $(".user").find('input').attr({
                'disabled': true,
                'placeholder': ''
            });
            $(".user").find('textarea').attr({
                'disabled': true,
                'placeholder': ''
            });
            $(".user").find("select").attr("disabled", true);
            $("#save").hide();
            $("#edit").show();
        } else {
            alertShow(res.error);
        }
    });
});
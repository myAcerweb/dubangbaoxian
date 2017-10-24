$(document).ready(function () {
    var quotationNo = MobileApp.getParameterValue('quotationNo');
    var caseNo = MobileApp.getParameterValue('caseNo');
    var cplyNo = MobileApp.getParameterValue('cplyNo');

    if (caseNo) {
        getClaimInfo(caseNo);
        return;
    }
    MobileApp.setUrl(_vehicle);
    //初始化参数
    if (quotationNo) {
        var req = {
            cmd: 'QuotationInfo',
            quotationNo: quotationNo
        };
    }
    if (cplyNo) {
        var req = {
            "cmd": "QuotationInfo",
            "cplyNo": cplyNo
        }
    }
    MobileApp.sendRequest(req, function (res) {
        //console.log(JSON.parse(res));
        var res = JSON.parse(res).payload.quotationBigVo;
        initpage(res);
    })
})

function initpage(res) {
    var quoPros = res.quoPros || [],
        quoDets = res.quoDets,
        persons = res.persons || [],
        quotationVehicleVo = res.quotationVehicleVo,
        premium = 0;
    quoPros.forEach(function (e) {
        if (e.productionTypeCode == '0590') {
            $('#insuranceBI').html(e.cplyNo);
            $('#BIpremium').html("¥" + e.premium);
            $('#chechuansui').html("¥" + e.payTax);
            $('#taxOverdue').html("¥" + e.taxOverdue);
            $('#surCharge').html("¥" + e.surCharge);
            $('#insuranceSDateBI').html(e.startDate);
            $('#insuranceEDateBI').html(endHour(e.endDate));
            $("#insuranceBIdetails").show();
            premium = premium + e.premium;
        } else if (e.productionTypeCode == '0508') {
            $('#insuranceCI').html(e.cplyNo);
            $('#CIpremium').html("¥" + e.premium);
            $('#insuranceSDateCI').html(e.startDate);
            $('#insuranceEDateCI').html(endHour(e.endDate));
            $('#insuranceCIdetails').show();
            premium = premium + e.premium;
        } else {
            if (e.downUrl) {
                $("#download").attr("href", e.downUrl).removeClass("none")
            }
            $(".nonvehicle").show();
            $(".vehicle").hide();
            $("#cplyNo").html(e.cplyNo);
            $("#cplySDate").html(e.startDate);
            $("#cplyEDate").html(endHour(e.endDate));
            $("#totalPremium").html(e.premium);
            $("#baoe").html(quoDets[0].amount);
            $("#range").html(res.insuranceVos[0].description);
            $("#cplyDate").html(sessionStorage.getItem("cplyDate"));
            $("#count").html(quoDets[0].mult || 1);
            $("#cplyDateRange").html(quoDets[0].underDay);

            var planCode = quoDets[0].planCode;
            if (planCode.indexOf("A15") >= 0) {
                var add = res.quotationNonJson;
                add = JSON.parse(add);
                $("#zipcode").html(add.addressCode);
                $("#cplyAddress").html(add.addressName);
                $("#zipcode").parent().removeClass("none");
                $("#cplyAddress").parent().removeClass("none");
            }
            res.insuranceVos[0].entryValueVos.forEach(function (e) {
                if (e.planCode == planCode) {
                   // $("#cplyDateRange").html(e.entryConent);
                }
            })
        }
    });
    if (quoDets) {
        quoDets.forEach(function (e) {
            var others = document.getElementById('others');
            var section = document.createElement('section'),
                spanL = document.createElement('span'),
                spanR = document.createElement('span');
            section.setAttribute('class', 'orderSec');
            spanR.setAttribute('class', 'orderRight');
            spanL.innerHTML = e.insuranceTypeName;
            spanR.innerHTML = e.amount;
            section.appendChild(spanL);
            section.appendChild(spanR);
            others.appendChild(section);
        });
    }
    persons.forEach(function (e) {
        if (e.insuredFlag == '3') {
            $('#ownerName').html(e.insuredName);
            $('#ownercellphone').html(e.cellphone);
            $('#ownercertNo').html(e.certNo);
            $("#ownerEmail").html(e.email);
            $('#ownerAddress').html(e.address);
        } else if (e.insuredFlag == '2') {
        		var c=$("#insurancePerson").clone();
        		c.find('#insuredName').html(e.insuredName);
            c.find('#insuredcellphone').html(e.cellphone);
            c.find('#insuredcertNo').html(e.certNo);
            c.find('#insuredAddress').html(e.address);
            c.show();
            $("#insurancePersonHolder").append(c);
//          $('#insuredName').html(e.insuredName);
//          $('#insuredcellphone').html(e.cellphone);
//          $('#insuredcertNo').html(e.certNo);
//          $('#insuredAddress').html(e.address);
        }
    });
    if (quotationVehicleVo) {
        $('#licenseNo').html(quotationVehicleVo.licenseNo);
        $('#carOwner').html(quotationVehicleVo.carOwner);
        $('#vinNo').html(quotationVehicleVo.vinNo);
        $('#engineNo').html(quotationVehicleVo.engineNo);
        $('#brandCN').html(quotationVehicleVo.brandCN);
        $('#ratedPassengerCapacity').html(quotationVehicleVo.ratedPassengerCapacity);
        $("#carInfo").show();
        $("#carOwnerTel").html(quotationVehicleVo.cellphone);
        $("#carOwnerNo").html(quotationVehicleVo.certNo);
        $("#carOwnerAddr").html(quotationVehicleVo.address);
        $("#carOwnerInfo").hide();
    }
    if (premium != 0) {
        $("#premium").show();
        $("#premium").find(".orderRight").html("￥" + premium);
    }
    if (res.productVos[0] && quoDets[0]) {
        var productVos = res.productVos[0];
        $("#cplyName").html(productVos.othName);
    }

    $(".both").removeClass("none")
}

//获取理赔信息
function getClaimInfo(caseNo) {
    document.title = "理赔详情";
    MobileApp.setUrl(_vehicle);
    var req = {
        "cmd": "QueryClaim",
        "POLICYNO": caseNo
    };
    MobileApp.sendRequest(req, function (res) {
        //获取返回对象
        var res = JSON.parse(res);
        if (res.result) {
            var vs = res.payload.claimpays;
            setClaimInfo(vs);
        } else {
            alertShow(res.error)
        }
    });
}

//显示理赔信息
function setClaimInfo(v) {
    $(".nonclaim").addClass("none");
    $(".claim").removeClass("none");

    $("#caseno").html(vs.caseno);
    $("#plyno").html(vs.plyno);
    $("#claimno").html(vs.claimno);
    $("#state").html(vs.state);
    $("#insurednameC").html(vs.insurednameC);
    $("#drivername").html(vs.drivername);
    $("#lcnno").html(vs.lcnno);
    $("#accidenttime").html(vs.accidenttime);
    $("#accidentaddr").html(vs.accidentaddr);
    $("#accidentcourse").html(vs.accidentcourse);
    $("#surveyamt").html(vs.surveyamt);
    $("#claimamt").html(vs.claimamt);
}

function endHour(time) {
    var endHour = time.toDate();
    endHour.setSeconds(endHour.getSeconds() - 1);
    endHour = endHour.toFomatorString("YYYY-MM-DD") + " 24:00:00";
    return endHour;
}
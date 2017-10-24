window.onload = function () {
    $(".queryBtn").on("click",function () {
        var cplyNo = $("#quotationNo").val();

        if(cplyNo.isEmpty()){
            alertShow("请输入保单号");
            return
        }

        MobileApp.setUrl(_vehicle);
        var req = {
            "cmd": "QuotationInfo",
            "cplyNo": cplyNo
        }
        MobileApp.sendRequest(req, function(res) {
            var res = JSON.parse(res);
            if(res.result){
                var quotationBigVo = res.payload.quotationBigVo.insuranceVos;
                if(quotationBigVo.length === 0){
                    alertShow("没有查到该保单号");
                    return;
                }
               window.location.href = "../products/orderDetails.html?cplyNo=" + cplyNo;
            }else{
                alertShow(res.error)
                return;
            }
        });

    })
}
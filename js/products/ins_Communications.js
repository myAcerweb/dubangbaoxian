window.onload = function() {
   //timerid = window.setInterval("disableSenchcheckcodeTimer()", 1000);
   //initOrgers();
   //initResPayOrderTL(zhifushoujihao);

}
$("#but_").click(function(){
   var zhifushoujihao = $("#zhifushoujihao").val();
   if(zhifushoujihao==""){
      alertShow("请填写支付手机");
      return;
   }
   if(phoneVerification(zhifushoujihao)){
      if(zhifushoujihao){
         var but_ = $("#but_").text();
         if(but_=="生成订单"){
             initResPayOrderTL(zhifushoujihao);
         }else {
               var form = document.getElementById("formid");
               var url = document.getElementById("url").value;

               //本地测试
               //form.action="http://59.151.126.112:8081"+url;
               //uat
               //form.action="http://59.151.126.80:7005"+url;
               form.action=url;
               form.submit();
         }
      }else{
         alertShow("请填写支付手机");
      }
   }
});


function initResPayOrderTL(zhifushoujihao){

   var title = '加载中,请稍候...';
   loadingShow(title);
   $("#ifr").contents().find("#tishi").html("加载中,请稍候...");
   var app = new InsMbsVehicleOpeation();
   app.OnlinePay("2",zhifushoujihao,function(res,vs){

      loadingHide();

      if(res){
         $("#but_").text("立即支付");

         $("#url").val(_allinPay + vs.url);
         $("#orderSource").val(vs.map.orderSource);
         $("#outOrderNo").val(vs.map.outOrderNo);
         $("#sumPayFee").val(vs.map.sumPayFee);
         $("#operateCode").val(vs.map.operateCode);
         $("#businessType").val(vs.map.businessType);
         $("#mobileNumber").val(vs.map.mobileNumber);
         if(vs.map.callBackFlag=="1"){
            $("#callBackFlag").val("需异步通知");
            $("#callBackFlag1").val(vs.map.callBackFlag);
         }else{
            $("#callBackFlag").val("无需通知");
            $("#callBackFlag1").val(vs.map.callBackFlag);
         }
         $("#callBackUrl").val(vs.map.callBackUrl);
         $("#goods").val(vs.map.goods);
         $("#sign").val(vs.map.sign);
         $("#actionType").val(vs.map.actionType);
      }else{
      	alertShow("生成订单失败，请稍后重试！");
      	return;
      }
   });
}




//页面初始化
window.onload = function(){
	initPage()
	//跳转到新增地址页面
	$("#add-address").click(function () {
		var quotationNo = MobileApp.getParameterValue("quotationNo");
		window.location.href = 'ins_mail_address_set.html?action=newpage&quotationNo='+quotationNo+"&xinzeng=1";
	});
}
function initPage(){
	var oper = new InsMbsVehicleOpeation();
	loadingShow("加载中");
	oper.CommonAddress(function(cb){
		loadingHide();
		for(var i=0; i<cb.length;i++){
			var areaList = $("#areaList").clone();
			areaList.find(".name").html(cb[i].name);
			areaList.find(".phone").html(cb[i].mobile);
			areaList.find(".detailArea").html(cb[i].address)
			areaList.show();
			$("body").append(areaList);
			(function(s){
				//选择邮寄地址
				areaList.click(function(){
					$(".checked1").attr("src","../images/ico_select_normal.png");
					$(this).find(".checked1").attr("src","../images/ico_select_pre.png");
//					var addr3 = {
//						name:s.name,
//						num:s.mobile,
//						detailArea:s.address
//					}
					localStorage.setItem("addr3",JSON.stringify(s));	
				});
			})(cb[i]);
			
			
			(function(s){
				//删除地址
				areaList.find(".del").click(function(e){
					e.stopPropagation();
					
//					Confirm({
//						content: "确定要删除吗",//弹出的提示内容
//						callback: function (result) {//回调函数
//							if(result){
//								var oper = new InsMbsVehicleOpeation();
//								oper.DelCommonAddress(s.addressNo,function(){
//								});
//								$(this).parent(".areaList").hide();
//							}
//						}
//					});
					
					let tishi = confirm("确定删除吗？");
					if(tishi){
						var oper = new InsMbsVehicleOpeation();
						oper.DelCommonAddress(s.addressNo,function(){
						});
						$(this).parent(".areaList").hide();
						//判断删除初的是否是选中地址，如果是就把选中的地址对象清空
						var v = JSON.parse(localStorage.getItem("addr3"));
						if(s.addressNo==v.addressNo){
							localStorage.setItem("addr3","");
						}
					}
				})
			})(cb[i]);
			
			
			(function(s){
				//修改地址
				areaList.find(".set").click(function(el){
					el.stopPropagation();
					localStorage.setItem("bddzxg",JSON.stringify(s));
					//把数据保存起来
					var quotationNo = MobileApp.getParameterValue("quotationNo");
					window.location.href = 'ins_mail_address_set.html?action=newpage&quotationNo='+quotationNo+"&xinzeng=0";
				})
			})(cb[i]);
		}
	});
	
	$("#insure").click(function(){
//		window.location.href = "ins_claim_place.html";
		var quotationNo = MobileApp.getParameterValue("quotationNo");
		window.location.replace("ins_claim_place.html?action=nextpage&quotationNo="+quotationNo);
	})
}
//function clear(){
//	if(confirm("确定要清空数据吗？"))
//		return true;
//	if(true){
//		document.main.text1.value == "";
//	}
//}












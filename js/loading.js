//使用方法
//1.调取loading
//var title = '识别中...';
//var loading = new Loading(title);
//loading.show();
//2.删除loading 这里触发条件是两秒钟
//setTimeout(function(){
//	loading.hidden();
//},2000);
//alert(0);
//var body = document.querySelectorAll("body")[0];
//var backdrop = document.createElement("div");
//var donghua = document.createElement("img");
//var zhi = document.createElement('div');
//var time;
//var firstChild = body.firstChild;
//body.insertBefore(backdrop,firstChild);
//
////alert(1);
//
//backdrop.append(donghua);
//backdrop.style.cssText ="height:0;"
//backdrop.append(zhi);
////alert(2);
////Loding加载蒙板      title 加载提示语   .show()出现加载蒙板    .hidden()清除加载蒙板
//function Loading(title){
//	this.title = title
//};
////alert(3);
//Loading.prototype.show = function(){
//	//alert(4);
//	$(backdrop).show()
//	backdrop.style.cssText = "position:fixed;display:flex ; align-content:center; flex-wrap:wrap; justify-content:center;width:100vw;height: 100vh;z-index: 998;background-color: rgba(0,0,0,0.3)";
//	donghua.style.cssText = "width:1rem;height:1rem;border-radius: 50%;";
//	donghua.setAttribute("src","../images/Spinner.gif");
//	zhi.style.cssText = "color:white;width:100%;display:flex; justify-content:center;font-size: .3rem;line-height: 2rem;";
//	//alert(5);
//	var num = 0;
//	time = setInterval(function(){
//		num++;
//		donghua.style.-webkit-Transform = 'rotate('+num+'deg)';
//		if(num>360){num=0}
//	},3)
//	zhi.innerHTML = this.title;
//}
//Loading.prototype.hidden = function(){
//	$(backdrop).hide();
//	//clearInterval(time);
//	backdrop.style.cssText ="height:0";
//	donghua.setAttribute("src"," ");
//
//	backdrop.style.cssText ="display: none";
//	donghua.style.cssText ="display: none";
//	zhi.innerHTML ="";
//}
//
//var dbic_loading = new Loading("加载中");


//隐藏
//var display = "display: none";
//显示
//display = "display: block";
//var wenzi = "加载中,请稍候...";

//调用加载（加载中）
//loadingShow(wenzi);

var div = '<div class="pBg" style="display: none" id="loading">' +
    '<img class="cBg" src="../images/Spinner.gif">' +
    '<span class="cBgg" id="tishi"></span>' +
    '</div>';
$("body").append(div);

function loadingShow(wenzi) {
    $("#tishi").text(wenzi);
    $("#loading").show();
};

function loadingHide() {
    $("#loading").hide();
};












/*
 * @author			liulong 
 * @email			htmljsjq@163.com
 * @date			2017.06.17
 * @Description		工具类js有方法体和调用调用方法
 */


//弹出对话框
//	Confirm({
//		content: "确定要删除吗",cancel:"取消",determine:"确定",
//		callback: function (result) {//回调函数，传了cancel返回true，false,没传就没有返回值
//			result?console.log("确定"):console.log("取消");
//		}
//	});

//弹出对话框:传了cancel是confirm,不传就是alert弹框
function Confirm(obj) {
	let _obj = obj || {};
	//视图层
	let div = '<div id="_bj" style="">' +
			'<div id="Kuang" style="">' +
				'<h3 id="title"></h3>' +
				'<div id="_content"></div>' +
				'<div id="_cancel" class="XuanZhe" style="left:0;"></div>' +
				'<div id="_determine" class="XuanZhe" style="right:0;border-left:0.5px solid gainsboro;"></div>' +
			'</div>' +
		'</div>';
	$("body").append(div);
	
	//css样式层
	$("#_bj").css({
		position:"fixed",
		top:0,left:0,
		textAlign:"center",
		width:"100vw",
		height:"100vh",
		zIndex: 9998,
		background:"rgba(0,0,0,.3)",
	});
	$("#Kuang").css({
		position:"absolute",
		textAlign:"center",
		top:"50%",left:"50%",
		transform:"translate(-50%,-50%)",
		width:"75%",
		// height:"2.25rem",
		background:"#f8f8f8",
		borderRadius:".1rem",
		fontSize:".32rem"
	});
    $("#_content").css({
		padding: ".5rem 0"
    });
	//传入一个选项是alert框，两个是confirm框
	if(_obj.cancel!=""&&_obj.cancel!=null){
		$(".XuanZhe").css({
			textAlign:"center",
			width:"49%",
			color:"#287ae8",
			borderTop:"0.5px solid gainsboro",
			lineHeight:".75rem",
			display: "inline-block"
		});
		$("#_cancel").html(_obj.cancel);
		//交互层
		$("#_cancel").click(function() {
			$("#_bj").remove();
			_obj.callback && _obj.callback(false);
		});
		$("#_determine").click(function() {
			$("#_bj").remove();
			_obj.callback && _obj.callback(true);
		});
	}else{
		$(".XuanZhe").css({
			textAlign:"center",
			width:"100%",
			color:"#287ae8",
			borderTop:"0.5px solid gainsboro",
			borderLeft:"none",
			lineHeight:".75rem"
		});
		$("#_cancel").hide();
		$("#_determine").click(function() {
			$("#_bj").remove();
			_obj.callback && _obj.callback();
		});
	}
	$("#_determine").html(_obj.determine);
	$("#_content").html(_obj.content || "确定吗");
	$("#title").html(_obj.title || "");
}

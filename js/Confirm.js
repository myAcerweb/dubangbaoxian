/*
 * @author			liulong 
 * @email			htmljsjq@163.com
 * @date			2017.06.17
 * @Description		工具类js有方法体和调用调用方法
 */
/*//调用示例
Confirm({
    title: "驾乘无忧",
    content: "您确定要购买驾乘无忧么？",
    cancel: "取消",
    confirm: "确定",
    confirmFunc: function () {
        alertShow("跳转")
    },
    cancelFunc: function () {
        Confirm({
            title: "立即投保",
            content: "你确定要放弃购买驾乘无忧么？",
            cancel: "取消",
            confirm: "确定",
            confirmFunc: function () {
                alertShow("跳转")
            }
        });
    }
});*/

//弹出对话框
function Confirm(obj) {
    let _obj = obj || {};
    if (obj === {}) {
        return;
    }
    _obj.title = _obj.title || "";
    _obj.content = _obj.content || "";
    _obj.cancel = _obj.cancel || "取消";
    _obj.confirm = _obj.confirm || "确定";

    //视图层
    let oFragmeng = document.createDocumentFragment();
    let div = document.createElement("div");
    div.classList = "_bg"
    div.innerHTML = '\
		<div id="Kuang" class="_content">\
		    <b id="_title" class="_title font32">' + _obj.title + '</b>\
			<div id="_content" class="_tips font26">' + _obj.content + '</div>\
			<button id="_confirm" class="_btn font32 color-fff bg-color-d3a27c">' + _obj.confirm + '</button>\
			<button id="_cancel" class="_btn font32 color-666 bg-color-ddd">' + _obj.cancel + '</button>\
		</div>';
    oFragmeng.appendChild(div);

    oFragmeng.getElementById("_confirm").addEventListener("click", function () {
        if (typeof obj.confirmFunc === "function") {
            obj.confirmFunc();
            return;
        }
    });

    oFragmeng.getElementById("_cancel").addEventListener("click", function () {
        if (typeof obj.cancelFunc === "function") {
            obj.cancelFunc();
            return;
        }
        $(this).parents("._bg").remove();
    });

    $("body").append(oFragmeng);
}

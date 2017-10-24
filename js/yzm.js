/*
* 验证码框
* */
var div = '\
<section id="yanzhengma" class="yanzhengma none">\
    <div class="content">\
        <div class="title">请输入验证码</div>\
        <div class="img_input">\
        	<input class="input"  id="" value="" />\
        	<img id="yzmImg" class="img" src="../images/ico_select_normal.png" alt=""/>\
        </div>\
        <button class="bg-color-d3a27c color-fff font34 now-pay">立即投保</button>\
    </div>\
</section>';
$("body").append(div);


function showYZM(img) {
    $("#yzmImg").attr("src", "data:image/png;base64," + img);
    $("#yanzhengma").show();
};
function hideYZM() {
    $("#yanzhengma").hide();
};
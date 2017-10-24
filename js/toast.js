
/*
* 提示框
* */
var div = ' <div class="tbgg" id="alert" style="display: none;">' +
    '<div class="tcontent" >' +
    ' <p class="ttoast-text" id="alertTishi"></p>' +
    '<button class="ttoast-btn">确定</button>' +
    '</div>' +
    ' </div>';
$("body").append(div);

function alertShow(wenzi) {
    $("#alertTishi").text(wenzi);
    $("#alert").show();
};

function alertHide() {
    $("#alert").hide();
};

$(".ttoast-btn").click(function(){
    alertHide();
});






//-----------投保成功量身定制提示框
var divv = ' <div class="tbgg" id="alertt" style="display: none;">' +
    '<div class="tcontent" >' +
    ' <p class="ttoast-text" id="alertTishii"></p>' +
    '<button class="ttoast-btn" id="toast_btn">确定</button>' +
    '</div>' +
    ' </div>';
$("body").append(divv);

function alertShoww(wenzi) {
    $("#alertTishii").text(wenzi);
    $("#alertt").show();
};

function alertHidee() {
    $("#alertt").hide();
};

$("#toast_btn").click(function(){
    alertHidee();
    window.location.href = 'products.html?action=newpage'
});









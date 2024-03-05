$(function (){

    $.getJSON("/user/getUserSession",
        function (data) {
            if (data.success) {
                if (data.user.email==null){
                    var swiperHtml='<a class="btn" href="" target="userRight" style="font-size: 8px; color: #d43f3a; ">我要绑定</a>';
                    $("#email").text("暂无");
                    $("#bind").html(swiperHtml);
                }
                else {
                    var swiperHtml='<a class="btn" href="" target="userRight" style="font-size: 8px; color: #d43f3a; ">我要换绑</a>';
                    $("#email").text(data.user.email);
                    $("#bind").html(swiperHtml);
                }
            }

        });

})
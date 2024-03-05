$(function () {

    $.ajax({
        url: '/user/getUserSession',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $("#username-login").text(data.user.userName);
            } else {
                // alert("请登录~");
            }
        }
    });




})

$("#loginout").click(function (){
    $.ajax({
        url: "/user/loginout",
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            alert(data.msg);
            if (data.success){
                $("#username-login").text("登录");
            }
        },
    })
})
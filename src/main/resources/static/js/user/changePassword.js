$(function () {

    var flag1=false;
    var flag2=false;

    $(".container").on("blur", "#oldPassword", function () {
        var oldPassword = $("#oldPassword").val();
        if (oldPassword != null && oldPassword != '') {
            $.ajax({
                url: '/user/checkPassword',
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    password: oldPassword,
                },
                success: function (data) {
                    if (data.success) {
                        $("#oldPasswordMsg").text("旧密码正确~");
                        $("#oldPasswordMsg").css("color","green");
                        flag1=true;

                    } else {
                        $("#oldPasswordMsg").text("旧密码错误~");
                        $("#oldPasswordMsg").css("color","red");
                        flag1=false;
                    }
                }
            });
        }
        else {
            $("#oldPasswordMsg").text("");
            flag1=false;
        }
    })

    $(".container").on("keyup", "#newPassword,#reNewPassword", function () {
        var newPassword = $("#newPassword").val();
        var reNewPassword = $("#reNewPassword").val();
        if (newPassword != null && newPassword != '' && reNewPassword != null && reNewPassword != '') {
            if (newPassword==reNewPassword){
                $("#reNewPasswordMsg").text("两次输入密码一致~");
                $("#reNewPasswordMsg").css("color","green");
                flag2=true;
            }
            else {
                $("#reNewPasswordMsg").text("两次输入密码不一致~");
                $("#reNewPasswordMsg").css("color","red");
                flag2=false;
            }

        }
        else {
            $("#reNewPasswordMsg").text("");
            flag2=false;
        }
    })


    $(".container").on("click", "#submit", function () {
        if (flag1 && flag2) {
            var newPassword = $("#newPassword").val();
            $.ajax({
                url: '/user/changePassword',
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    password: newPassword,
                },
                success: function (data) {
                    alert(data.msg);
                    if (data.success){
                        window.location.reload();
                    }
                }
            })
        }
        else {
            alert("输入有误，请确认您的输入！");
        }
    })



})
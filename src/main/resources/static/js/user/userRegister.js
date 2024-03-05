$(function () {
    showRegist();
    regist();
})

function showRegist() {
    $("#login-register").on("click", "#register", function () {
        $("#login-register").html('<section class="signin popup-in" style="padding: 0">\n' +
            '        <div class="container" style="width: revert">\n' +
            '            <div class="sign-content popup-in-content">\n' +
            '                <div class="popup-in-txt">\n' +
            '                    <h3 style="text-align: center">注 册</h3>\n' +
            '                    <div class="row">\n' +
            '                        <div class="col-sm-1"></div>\n' +
            '                        <div class="col-sm-10">\n' +
            '                            <div class="signin-form">\n' +
            '                                <div class="form-group">\n' +
            '                                    <input type="text" class="form-control" id="r-name" placeholder="请输入用户名">\n' +
            '                                    <span id="r-nameMsg"></span>\n' +
            '                                </div><!--/.form-group -->\n' +
            '                                <div class="form-group">\n' +
            '                                    <input type="password" class="form-control" id="r-pwd" placeholder="请输入密码">\n' +
            '                                </div><!--/.form-group -->\n' +
            '                                <div class="form-group">\n' +
            '                                    <input type="password" class="form-control" id="repwd" placeholder="请再次输入密码">\n' +
            '                                    <span id="repwdMsg"></span>\n' +
            '                                </div><!--/.form-group -->\n' +
            '                                <div class="form-group">\n' +
            '                                    <input type="email" class="form-control" id="email" placeholder="请输入邮箱">\n' +
            '                                    <span id="emailMsg"></span>\n' +
            '                                </div><!--/.form-group -->\n' +
            '                                <div class="form-group">\n' +
            '                                    <label for="j_captcha"></label>\n' +
            '                                    <input type="text" id="j_captcha" placeholder="验证码" style="width:100px;">\n' +
            '                                    <img id="captcha_img" alt="点击更换" title="点击更换"\n' +
            '                                         onclick="changeVerifyCode(this)" src="/Kaptcha"/>\n' +
            '                                </div><!--/.form-group -->\n' +
            '                            </div><!--/.signin-form -->\n' +
            '                        </div><!--/.col -->\n' +
            '                    </div><!--/.row -->\n' +
            '                    <div class="row">\n' +
            '                        <div class="col-sm-2"></div>\n' +
            '                        <div class="col-sm-8">\n' +
            '                            <div class="signin-footer">\n' +
            '                                <button type="button" class="btn signin_btn" id="r-submit" style="display: block; margin: auto;width: 200px">\n' +
            '                                    注 册\n' +
            '                                </button>\n' +
            '                                <p>\n' +
            '                                    <a id="login" class="btn col-sm-12">已有账号?去登录</a>\n' +
            '                                </p>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '\n' +
            '    </section>')
    })

}


function regist() {
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    $("#login-register").on("keyup", "#r-name", function () {
        var name = $("#r-name").val();
        var uPattern = /^[a-zA-Z0-9_-]{4,20}$/;
        if (name.length == 0) {
            $("#r-nameMsg").html("");
        } else if (name.length <= 3) {
            $("#r-nameMsg").html("用户名不得小于4个字符！");
            $("#r-nameMsg").css("color", "red");
        } else if (!uPattern.test(name)) {
            $("#r-nameMsg").html("用户名格式错误（字母，数字，下划线，减号）！");
            $("#r-nameMsg").css("color", "red");
        } else {
            $("#r-nameMsg").html("");
            flag1 = true;
        }
    })


    $("#login-register").on("keyup", "#r-pwd,#repwd", function () {
        var pwd = $("#r-pwd").val();
        var repwd = $("#repwd").val();
        if (pwd == repwd) {
            if (pwd.length==0){
                $("#repwdMsg").html("");
            }
            else if(pwd.length<3){
                $("#repwdMsg").html("密码不得小于3个字符！");
                $("#repwdMsg").css("color", "red");
            }
            else {
                $("#repwdMsg").html("密码一致");
                $("#repwdMsg").css("color", "green");
                flag2 = true;
            }
        }
        else {
            $("#repwdMsg").html("密码不一致！");
            $("#repwdMsg").css("color", "red");
        }
    })

    $("#login-register").on("keyup", "#email", function () {
        var email = $("#email").val();
        var ePattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (email.length == 0) {
            $("#emailMsg").html("");
        } else if (!ePattern.test(email)) {
            $("#emailMsg").html("邮箱格式错误！");
            $("#emailMsg").css("color", "red");
        } else {
            $("#emailMsg").html("");
            flag3 = true;
        }
    })

    $("#login-register").on("click", "#r-submit", function () {
        var name = $("#r-name").val();
        var pwd = $("#r-pwd").val();
        var email = $("#email").val();
        var code = $("#j_captcha").val();
        if (flag1 && flag2 && flag3) {
            $.ajax({
                url: "/user/register",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    name: name,
                    pwd: pwd,
                    email: email,
                    code: code,
                },
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        $("#myModal").modal('hide');
                        $("#username-login").text(data.name);
                    } else {
                        $('#captcha_img').click();
                    }
                },
            })
        }
        else {
            alert("请输入~");
        }
    })

}
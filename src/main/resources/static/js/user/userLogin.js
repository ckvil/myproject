$(function () {
    showLogin();
    login();
})

function showLogin() {
    $("#login-register").on("click","#login",function () {
        $("#login-register").html('<section class="signin popup-in" style="padding: 0">\n' +
            '                                        <div class="container" style="width: revert">\n' +
            '\n' +
            '                                            <div class="sign-content popup-in-content">\n' +
            '                                                <div class="popup-in-txt">\n' +
            '                                                    <h3 style="text-align: center">登 录</h3>\n' +
            '\n' +
            '                                                    <div class="row">\n' +
            '                                                        <div class="col-sm-1"></div>\n' +
            '                                                        <div class="col-sm-10">\n' +
            '                                                            <div class="signin-form">\n' +
            '\n' +
            '                                                                <div class="form-group">\n' +
            '                                                                    <input type="text" class="form-control" id="name" placeholder="请输入用户名" style="margin-top: 10px">\n' +
            '                                                                    <span id="nameMsg"></span>\n' +
            '                                                                </div><!--/.form-group -->\n' +
            '                                                                <div class="form-group">\n' +
            '                                                                    <input type="password" class="form-control" id="pwd" placeholder="请输入密码" >\n' +
            '                                                                    <span id="pwdMsg"></span>\n' +
            '                                                                </div><!--/.form-group -->\n' +
            '                                                                <div class="form-group">\n' +
            '\n' +
            '                                                                    <input type="text" id="j_captcha" class="form-control" placeholder="验证码" style="width:80px;float: left;">\n' +
            '\n' +
            '                                                                    <img id="captcha_img" alt="点击更换" title="点击更换"\n' +
            '                                                                         onclick="changeVerifyCode(this)" src="/Kaptcha" style="margin-top: 10px"/>\n' +
            '\n' +
            '                                                                </div><!--/.form-group -->\n' +
            '\n' +
            '                                                            </div><!--/.signin-form -->\n' +
            '                                                        </div><!--/.col -->\n' +
            '                                                    </div><!--/.row -->\n' +
            '\n' +
            '                                                    <div class="row">\n' +
            '                                                        <div class="col-sm-1"></div>\n' +
            '                                                        <div class="col-sm-10">\n' +
            '                                                            <div class="signin-password">\n' +
            '                                                                <div class="awesome-checkbox-list">\n' +
            '\n' +
            '                                                                    <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2" style="transform: scale(1.5)">\n' +
            '                                                                    <label for="styled-checkbox-2">记住密码</label>\n' +
            '\n' +
            '                                                                    <a class="navbar-right" href="#" style="margin-right: 0">忘记密码 ?</a>\n' +
            '\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '\n' +
            '                                                    <div class="row">\n' +
            '                                                        <div class="col-sm-2"></div>\n' +
            '                                                        <div class="col-sm-8">\n' +
            '                                                            <div class="signin-footer">\n' +
            '                                                                <button type="button" class="col-sm-12 btn btn-success" id="submit" style="margin: 20px 0 20px 0">\n' +
            '                                                                    登 录\n' +
            '                                                                </button>\n' +
            '                                                                <p>\n' +
            '                                                                    <a id="register" class="btn col-sm-12">还没有账号?注册</a>\n' +
            '                                                                </p>\n' +
            '                                                            </div>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '\n' +
            '                                    </section>\n')
    })
}

function login() {
    var flag1=false;
    var flag2=false;
    var flag3=false;
    $("#name").keyup(function () {
        var name = $("#name").val();
        var pwd = $("#pwd").val();
        var code = $("#j_captcha").val();

        var uPattern = /^[a-zA-Z0-9_-]{4,20}$/;
        if (name.length == 0) {
            $("#nameMsg").html("");
            flag1=false;
        } else if (name.length <= 3) {
            $("#nameMsg").html("用户名不得小于4个字符！");
            $("#nameMsg").css("color", "red");
            flag1=false;
        } else if (uPattern.test(name) == false) {
            $("#nameMsg").html("用户名格式错误（字母，数字，下划线，减号）！");
            $("#nameMsg").css("color", "red");
            flag1=false;
        } else {
            $("#nameMsg").html("");
            flag1=true;
        }
    })

    $("#pwd").blur(function () {
        var pwd = $("#pwd").val();
        if (pwd.length == 0) {
            $("#pwdMsg").html("");
            flag2=false;
        } else if (pwd.length <= 3) {
            $("#pwdMsg").html("密码不得小于4个字符！");
            $("#pwdMsg").css("color", "red");
            flag2=false;
        } {
            $("#pwdMsg").html("");
            flag2=true;
        }
    })

    $("#submit").click(function () {
        var name = $("#name").val();
        var pwd = $("#pwd").val();
        var code = $("#j_captcha").val();
        if (code.length!=0){
            flag3=true;
        }
        if (flag1 && flag2 && flag3) {
            $.ajax({
                url: "/user/login",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    name: name,
                    pwd: pwd,
                    code: code,
                },
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        window.location.reload();
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


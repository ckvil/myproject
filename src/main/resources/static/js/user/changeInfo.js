$(function () {

    var oldSex = null;
    var sex = null;

    $.getJSON("/user/getUserSession",
        function (data) {
            if (data.success) {
                $("#userName").attr("placeholder", data.user.userName);
                $("#sex").find("option[value=" + data.user.sex + "]").attr("selected", true);
                $("#birthday").attr("placeholder", data.user.birthday);
                $("#introduce").attr("placeholder", data.user.introduce);
                oldSex = $("#sex option:selected").attr('value');
                sex = oldSex;
            }
        })

    $("#sex").change(function () {
        sex = $("#sex option:selected").attr('value');
    })

    $(".container").on("click", "#submit", function () {
        var userName = $("#userName").val();
        var birthday = $("#birthday").val();
        var introduce = $("#introduce").val();
        if (userName == '' && birthday == '' && introduce == '' && oldSex == sex) {
            alert("请输入~");
        } else {
            $.ajax({
                url: '/user/changeInfo',
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    userName: userName,
                    sex: sex,
                    birthday: birthday,
                    introduce: introduce,
                },
                success: function (data) {
                    alert(data.msg);
                }
            });
        }

    })


})
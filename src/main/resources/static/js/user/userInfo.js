$(function (){

    $.getJSON("/user/getUserSession",
        function (data) {
            if (data.success) {
                $("#userName").text(data.user.userName);
                $("#sex").text(data.user.sex);
                $("#birthday").text(data.user.birthday);
                $("#email").text(data.user.email);
                $("#telephone").text(data.user.telephone);
                $("#introduce").text(data.user.introduce);
            }
            else {
                alert(data.msg);
            }
        });

})
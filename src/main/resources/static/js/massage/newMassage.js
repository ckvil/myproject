$(function () {

    $("#leftdBtn").bind("click", sendLeft);
    $("#rightBtn").bind("click", sendRight);

    function sendLeft() {

        //1. 获取输入框中的内容
        var text = $("#leftText").val();
        if (text != "") {
            //2. 生成标签
            var option = $("<option></option>");
            option.addClass("optionLeft");
            //2.1 生成标签的样式
            var len = text.length;
            //option.css("width", len * 15 + "px","marginLeft", 350 - len * 15 - 60 + "px")
            option.css("width", len * 15 + "px");
            // option.css("marginLeft", 350 - len * 15 - 60 + "px");
            option.css("float", "right");
            option.css("clear", "both");
            //2.2 生成标签的内容
            option.html(text);
            //3. 将内容追加到select中。
            $("#leftcontent").append(option);
            //4.  追加生成的标签(右侧)
            var option1 = $("<option></option>");
            option1.addClass("optionRight");
            option1.css("width", len * 15 + "px");
            option1.css("marginLeft", 10 + "px");
            option1.html(text);
            $("#rightcontent").append(option1);

            //5. 清除文本框的内容
            $("#leftText").val("");
        }

    }


    function sendRight() {

        //1. 获取输入框中的内容
        var text = $("#rightText").val();
        if (text != "") {
            //2. 生成标签
            var option = $("<option></option>");
            option.addClass("optionLeft");
            //2.1 生成标签的样式
            var len = text.length;
            //option.css("width", len * 15 + "px","marginLeft", 350 - len * 15 - 60 + "px")
            option.css("width", len * 15 + "px");
            option.css("marginLeft", 350 - len * 15 - 60 + "px");
            //2.2 生成标签的内容
            option.html(text);
            //3. 将内容追加到select中。
            $("#rightcontent").append(option);
            //4.  追加生成的标签(右侧)
            var option1 = $("<option></option>");
            option1.addClass("optionRight");
            option1.css("width", len * 15 + "px");
            option.css("float", "left");
            option.css("clear", "both");
            option1.html(text);
            $("#leftcontent").append(option1);

            $("#rightText").val("");
        }

    }


    $(document).keydown(function (event) {

        if (event.keyCode == 17) {
            $(document).keydown(function (event1) {
                if (event1.keyCode == 13) {
                    var text1 = $("#leftText").val();
                    var text2 = $("#rightText").val()
                    if (text1 != "") {
                        sendLeft();
                    }
                    if (text2 != "") {
                        sendRight();
                    }
                }

            })

        }
    });
})
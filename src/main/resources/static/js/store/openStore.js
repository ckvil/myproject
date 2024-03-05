$(function () {

    $(".container").on("click", "#submit", function () {

        var storeName = $("#storeName").val();
        var storeIntroduce = $("#storeIntroduce").val();

        var file = $("#storeImage")[0].files[0];
        var formData = new FormData();
        formData.append("file",file);
        formData.append("storeName",storeName);
        formData.append("storeIntroduce",storeIntroduce);


        if (storeName=="" || storeName.length==0){
            alert("店铺名称不能为空~")
        }
        else if (!$("#protocol").prop("checked")){
            alert("请阅读下方的用户使用协议、隐私保护协议、第三方信息共享清单，若您同意全部内容，请勾选~")
        }
        else {
            // 发送开通店铺请求
            $.ajax({
                url: '/store/openStore',
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data', //必须有
                dataType:"json",
                type: "post",
                traditional: true,
                data: formData,
                success: function (data) {
                    if (data.success) {
                        alert(data.msg);
                        location.href="/html/store/myStore.html";
                    }
                    else {
                        alert(data.msg);
                    }

                }
            });

        }

    })


})
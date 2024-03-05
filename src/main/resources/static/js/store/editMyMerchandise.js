$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?merchandiseId=");

    var merchandiseId = args[1];

    var storeId;

    $.ajax({
        url: '/merchandise/merchandiseParticular',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        data: {
            merchandiseId: merchandiseId,
        },
        success: function (data) {
            if (data.success) {
                $("#merchandiseName").attr("placeholder", data.merchandise.merchandiseName);
                $("#merchandiseIntroduce").attr("placeholder", data.merchandise.merchandiseIntroduce);
                $("#merchandiseParameter").attr("placeholder", data.merchandise.merchandiseParameter);
                $("#merchandiseSpecifications").attr("placeholder", data.merchandise.merchandiseSpecifications);
                $("#merchandisePrice").attr("placeholder", data.merchandise.merchandisePrice);
                $("#merchandiseQuantity").attr("placeholder", data.merchandise.merchandiseQuantity);

                storeId = data.merchandise.storeId;
            }
        }
    });

    $(".container").on("click", "#submit", function () {
        var merchandiseName = $("#merchandiseName").val();
        var merchandiseIntroduce = $("#merchandiseIntroduce").val();
        var merchandiseParameter = $("#merchandiseParameter").val();
        var merchandiseSpecifications = $("#merchandiseSpecifications").val();
        var merchandisePrice = $("#merchandisePrice").val();
        var merchandiseQuantity = $("#merchandiseQuantity").val();

        var formData = new FormData();

        if ($("#merchandiseMainImage").val() != null || $("#merchandiseMainImage").val() != "") {
            var file = $("#merchandiseMainImage")[0].files[0];
            formData.append("file", file);
        }

        if ($("#merchandiseParticularsImage").val() != null || $("#merchandiseParticularsImage").val() != "") {
            var images = $("#merchandiseParticularsImage")[0].files;
            for (let item of images) {
                formData.append("files", item);
            }
        }

        if (merchandiseName != null || merchandiseName != "") {
            formData.append("merchandiseName", merchandiseName);
        }

        if (merchandiseIntroduce != null || merchandiseIntroduce != "") {
            formData.append("merchandiseIntroduce", merchandiseIntroduce);
        }

        if (merchandiseParameter != null || merchandiseParameter != "") {
            formData.append("merchandiseParameter", merchandiseParameter);
        }

        if (merchandiseSpecifications != null || merchandiseSpecifications != "") {
            formData.append("merchandiseSpecifications", merchandiseSpecifications);
        }

        if (merchandisePrice != null || merchandisePrice != "") {
            formData.append("merchandisePrice", merchandisePrice);
        }

        if (merchandiseQuantity != null || merchandiseQuantity != "") {
            formData.append("merchandiseQuantity", merchandiseQuantity);
        }

        formData.append("storeId", storeId);
        formData.append("merchandiseId", merchandiseId);


        if (!$("#protocol").prop("checked")) {
            alert("请阅读下方的用户使用协议、隐私保护协议、第三方信息共享清单，若您同意全部内容，请勾选~");
        } else {
            $.ajax({
                url: '/merchandise/editMyMerchandise',
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data', //必须有
                dataType: "json",
                type: "post",
                traditional: true,
                data: formData,
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        location.href = "/html/store/myMerchandiseParticular.html?merchandiseId=" + merchandiseId;
                    }

                }

            });
        }

    })


})


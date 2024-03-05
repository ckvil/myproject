$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?storeId=");

    var storeId = args[1];

    var merchandiseImageArray=new Array();

    $(".container").on("change", "#merchandiseParticularsImage", function () {
        var merchandiseImageFiles= document.getElementById("merchandiseParticularsImage");

        var swiperHtml='';

        if (merchandiseImageFiles.value!="" || merchandiseImageFiles.value!=null){
            for (var i=0;i<merchandiseImageFiles.files.length;i++){
                swiperHtml+='<span> '+merchandiseImageFiles.files[i].name+' </span>';
                merchandiseImageArray[i]=merchandiseImageFiles.files[i].name;
                if (i!=merchandiseImageFiles.files.length-1){
                    swiperHtml+='，';
                }
            }

            $("#merchandiseImagePar").html(swiperHtml);
        }
    })



    $(".container").on("click", "#submit", function () {

        var merchandiseName = $("#merchandiseName").val();
        var merchandiseIntroduce = $("#merchandiseIntroduce").val();
        var merchandiseParameter = $("#merchandiseParameter").val();
        var merchandiseSpecifications = $("#merchandiseSpecifications").val();
        var merchandisePrice = $("#merchandisePrice").val();
        var merchandiseQuantity = $("#merchandiseQuantity").val();


        var file = $("#merchandiseMainImage")[0].files[0];
        var images = $("#merchandiseParticularsImage")[0].files;
        var formData = new FormData();
        formData.append("file",file);
        formData.append("storeId",storeId);
        formData.append("merchandiseName",merchandiseName);
        formData.append("merchandiseIntroduce",merchandiseIntroduce);
        formData.append("merchandiseParameter",merchandiseParameter);
        formData.append("merchandiseSpecifications",merchandiseSpecifications);
        formData.append("merchandisePrice",merchandisePrice);
        formData.append("merchandiseQuantity",merchandiseQuantity);
        for (let item of images) {
            formData.append("files", item);
        }

        if (merchandiseName == "" || merchandiseName.length == 0) {
            alert("商品名称不能为空~");
        } else if (merchandiseIntroduce == "" || merchandiseIntroduce.length == 0) {
            alert("商品介绍不能为空~");
        } else if (merchandiseParameter == "" || merchandiseParameter.length == 0) {
            alert("商品参数不能为空~");
        } else if (merchandiseSpecifications == "" || merchandiseSpecifications.length == 0) {
            alert("商品规格不能为空~");
        } else if (merchandisePrice == "" || merchandisePrice.length == 0) {
            alert("商品价格不能为空~");
        } else if (merchandiseQuantity == "" || merchandiseQuantity.length == 0) {
            alert("商品价格不能为空~");
        } else if (!$("#protocol").prop("checked")) {
            alert("请阅读下方的用户使用协议、隐私保护协议、第三方信息共享清单，若您同意全部内容，请勾选~")
        } else {
            $.ajax({
                url: '/merchandise/addMerchandise',
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data', //必须有
                dataType:"json",
                type: "post",
                traditional: true,
                data: formData,
                success: function (data) {
                    alert(data.msg);
                    if (data.success){
                        location.href="/html/store/myStore.html";
                    }

                }

            });

        }

    });
})
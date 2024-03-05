$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?merchandiseId=");

    var merchandiseId = args[1];

    // 商品详情
    $.getJSON("/merchandise/merchandiseParticular", {
            merchandiseId: merchandiseId
        },

        function (data) {
            var swiperHtml = '';
            if (data.success) {
                swiperHtml += '<div class="row form-group">\n' +
                    '            <div class="col-xs-3">\n' +
                    '                <img src="' + data.merchandise.merchandiseMainImage + '">\n' +
                    '            </div>\n' +
                    '            <div class="col-xs-9">\n' +
                    '                <p class="row" id="merchandiseName">' + data.merchandise.merchandiseName + '</p>\n' +
                    '                <p class="row" id="merchandiseIntroduce">' + data.merchandise.merchandiseIntroduce + '</p>\n' +
                    '                <p class="row" id="">规格：\n' +
                    '                    <select class="input" id="merchandiseSpecifications" style="width: 100px; ">\n'+
                    '                       <option selected="selected" disabled="disabled">选择规格</option>\n'
                for (var i = 0; i < data.specifications.length; i++) {
                    swiperHtml += '<option value="' + data.specifications[i] + '">' + data.specifications[i] + '</option>\n';
                }
                swiperHtml += '                </select>\n' +
                    '                </p>\n' +
                    '                <p class="row" id="merchandisePrice">单价：¥' + data.merchandise.merchandisePrice + '</p>\n' +
                    '                <p class="row" id="merchandiseQuantity">数量：<input type="number" placeholder="输入商品数量" value="1" min="1" oninput="if( this.value.length > 4 )  this.value = this.value.slice(0,4)"\n' +
                    '                                         style="width: 100px; height: 20px;"></p>\n' +
                    '                <p class="row" id="totalPrice">总价：¥' + data.merchandise.merchandisePrice + '</p>\n' +
                    '            </div>\n' +
                    '        </div>';
            }
            $("#merchandise").html(swiperHtml);

            $(".container").on("change", "#merchandiseQuantity", function () {
                merchandiseQuantity = $("#merchandiseQuantity input").val();
                $("#totalPrice").text("总价：¥" + data.merchandise.merchandisePrice * merchandiseQuantity);
            })

            $(".container").on("keyup", "#merchandiseQuantity", function () {
                merchandiseQuantity = $("#merchandiseQuantity input").val();
                $("#totalPrice").text("总价：¥" + data.merchandise.merchandisePrice * merchandiseQuantity);
            })

            $(".container").on("blur", "#merchandiseQuantity", function () {
                if ($("#merchandiseQuantity input").val()==''){
                    $("#merchandiseQuantity input").val("1");
                    $("#totalPrice").text("总价：¥" + data.merchandise.merchandisePrice * $("#merchandiseQuantity input").val());
                };
            })

        }
    )

    $(".container").on("click", "#submit", function () {
        var orderMerchandiseQuantity=$("#merchandiseQuantity input").val();
        var merchandiseSpecifications=$("#merchandiseSpecifications option:selected").attr("value");
        var consigneeName=$("#name").val();
        var consigneeTelephone=$("#telephone").val();
        var consigneeAddr=$("#addr").val();
        var consigneeRemark=$("#consigneeRemark").val();
        var consigneePostalCode=$("#postalCode").val();

        alert(merchandiseSpecifications);

        if (consigneeName==''){
            alert("收件人不能为空~");
        }
        else if (consigneeTelephone==''){
            alert("收件人联系方式不能为空~");
        }
        else if (consigneeAddr==''){
            alert("收货地址不能为空~");
        }
        else {
            $.ajax({
                url: '/order/creatOrder',
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    merchandiseId: merchandiseId,
                    orderMerchandiseQuantity: orderMerchandiseQuantity,
                    merchandiseSpecifications: merchandiseSpecifications,
                    consigneeName: consigneeName,
                    consigneeTelephone: consigneeTelephone,
                    consigneeAddr: consigneeAddr,
                    consigneeRemark: consigneeRemark,
                    consigneePostalCode: consigneePostalCode
                },
                success: function (data) {
                    if (data.success){
                        location.href = "/html/purchase/payment.html?orderId="+data.order.orderId;
                    }
                    else {
                        alert(data.msg);
                    }
                }
            })
        }



    })


})
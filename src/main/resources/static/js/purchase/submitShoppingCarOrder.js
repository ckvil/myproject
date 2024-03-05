$(function () {

    var url = decodeURI(window.location.href);

    var swiperHtml = '';

    var shoppingCarIds = url.split("?")[1].split("&");

    for (var k = 0; k < shoppingCarIds.length; k++) {

        var args = shoppingCarIds[k].split("=");

        var shoppingCarId = args[1];

        $.getJSON('/shoppingCar/submitShoppingCarOrder', {
                shoppingCarId: shoppingCarId,
            },
            function (data) {
                if (data.success) {
                    swiperHtml += '<div class="row form-group" shoppingCarId="' + data.shoppingCar.shoppingCarId + '" merchandiseId="' + data.shoppingCar.merchandise.merchandiseId + '">\n' +
                        '            <div class="col-xs-3">\n' +
                        '                <img src="' + data.shoppingCar.merchandise.merchandiseMainImage + '">\n' +
                        '            </div>\n' +
                        '            <div class="col-xs-9">\n' +
                        '                <p class="row merchandiseName">' + data.shoppingCar.merchandise.merchandiseName + '</p>\n' +
                        '                <p class="row merchandiseIntroduce">' + data.shoppingCar.merchandise.merchandiseIntroduce + '</p>\n' +
                        '                <p class="row merchandiseSpecifications">规格：\n' +
                        '                    <select class="input" style="width: 100px; ">\n' +
                        '                       <option selected="selected" disabled="disabled">选择规格</option>\n'
                    for (var i = 0; i < data.specifications.length; i++) {
                        swiperHtml += '<option value="' + data.specifications[i] + '">' + data.specifications[i] + '</option>\n';
                    }
                    swiperHtml += '          </select>\n' +
                        '                </p>\n' +
                        '                <p class="row merchandisePrice" merchandisePrice="' + data.shoppingCar.merchandise.merchandisePrice + '">单价：¥' + data.shoppingCar.merchandise.merchandisePrice + '</p>\n' +
                        '                <p class="row merchandiseQuantity">数量：<input type="number" placeholder="输入商品数量" value="1" min="1" oninput="if( this.value.length > 4 )  this.value = this.value.slice(0,4)"\n' +
                        '                                    style="width: 100px; height: 20px;"></p>\n' +
                        '                <p class="row totalPrice" totalPrice="' + data.shoppingCar.merchandise.merchandisePrice + '">总价：¥' + data.shoppingCar.merchandise.merchandisePrice + '</p>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <hr>';

                    $("#merchandise").html(swiperHtml);

                    $(".container").on("change", ".merchandiseQuantity", function () {
                        var merchandiseQuantity = $(this).children("input").val();
                        var merchandisePrice = $(this).closest(".col-xs-9").children(".merchandisePrice").attr("merchandisePrice");
                        $(this).closest(".col-xs-9").children(".totalPrice").text("总价：¥" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                        $(this).closest(".col-xs-9").children(".totalPrice").attr("totalPrice" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                    })

                    $(".container").on("keyup", ".merchandiseQuantity", function () {
                        var merchandiseQuantity = $(this).children("input").val();
                        var merchandisePrice = $(this).closest(".col-xs-9").children(".merchandisePrice").attr("merchandisePrice");
                        $(this).closest(".col-xs-9").children(".totalPrice").text("总价：¥" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                        $(this).closest(".col-xs-9").children(".totalPrice").attr("totalPrice" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                        ;
                    })

                    $(".container").on("blur", ".merchandiseQuantity", function () {
                        if ($(this).children("input").val() == '') {
                            $(this).children("input").val("1");
                            var merchandiseQuantity = $(this).children("input").val();
                            var merchandisePrice = $(this).closest(".col-xs-9").children(".merchandisePrice").attr("merchandisePrice");
                            $(this).closest(".col-xs-9").children(".totalPrice").text("总价：¥" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                            $(this).closest(".col-xs-9").children(".totalPrice").attr("totalPrice" + new Number(merchandisePrice * merchandiseQuantity).toFixed(2));
                        }
                    })

                }
            }
        )

    }


    $(".container").on("click", "#submit", function () {
            var merchandiseArray = new Array();
            $(".form-group").each(function (index) {
                merchandiseArray[index] = {
                    merchandiseId: $(this).attr("merchandiseId"),
                    orderMerchandiseQuantity: $(this).children(".col-xs-9").children(".merchandiseQuantity").children("input").val(),
                    merchandiseSpecifications: $(this).children(".col-xs-9").children(".merchandiseSpecifications").children("select").children("option:selected").attr("value"),
                }
            })

            var shoppingCarArray = new Array();
            $(".form-group").each(function (index) {
                shoppingCarArray[index] = {
                    shoppingCarId: $(this).attr("shoppingCarId"),
                }
            })

            var consigneeName = $("#name").val();
            var consigneeTelephone = $("#telephone").val();
            var consigneeAddr = $("#addr").val();
            var consigneeRemark = $("#consigneeRemark").val();
            var consigneePostalCode = $("#postalCode").val();

            if (consigneeName == '') {
                alert("收件人不能为空~");
            } else if (consigneeTelephone == '') {
                alert("收件人联系方式不能为空~");
            } else if (consigneeAddr == '') {
                alert("收货地址不能为空~");
            } else {
                $.ajax({
                    url: '/order/creatShoppingCarOrder',
                    async: false,
                    cache: false,
                    type: "post",
                    dataType: 'json',
                    data: {
                        merchandises: JSON.stringify(merchandiseArray),
                        shoppingCars: JSON.stringify(shoppingCarArray),
                        consigneeName: consigneeName,
                        consigneeTelephone: consigneeTelephone,
                        consigneeAddr: consigneeAddr,
                        consigneeRemark: consigneeRemark,
                        consigneePostalCode: consigneePostalCode
                    },
                    success: function (data) {
                        if (data.success) {
                            var orderIds = '';
                            for (var i = 0; i < data.orderIds.length; i++) {
                                if (i != 0) {
                                    orderIds += "&";
                                }
                                orderIds += "orderId" + i + "=" + data.orderIds[i];
                            }
                            alert(orderIds);
                            location.href = "/html/purchase/paymentShoppingCar.html?" + orderIds;
                        } else {
                            alert(data.msg);
                        }
                    }
                })
            }

        }
    )


})
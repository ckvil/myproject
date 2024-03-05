$(function () {

    var orderState = null;

    myOrder(orderState);

    $("#orderState").on("click", "button", function () {
        orderState = $(this).attr("value");
        $("#search", window.parent.document).val("");
        myOrder(orderState);
    })

    function myOrder(orderState) {
        $.ajax({
            url: '/order/myOrder',
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                orderState: orderState,
            },
            success: function (data) {
                var swiperHtml = '';
                if (data.success) {
                    swiperHtml += '<table class="table" style=" border: solid 1px #a6a6a6;">\n' +
                        '                <tr id="tabtop">\n' +
                        '                    <td colspan="2">\n' +
                        '                        <span>商品信息</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>单价</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>数量</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>金额</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>交易状态</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>操作</span>\n' +
                        '                    </td>\n' +
                        '                </tr>';
                    for (var i = 0; i < data.orders.length; i++) {
                        swiperHtml += '<tr>\n' +
                            '                    <td class="orderImage">\n' +
                            '                        <a href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '"><img class="img-rounded" src="' + data.orders[i].merchandise.merchandiseMainImage + '"></a>\n' +
                            '                    </td>\n' +
                            '                    <td class="orderMessage">\n' +
                            '                        <a class="row"  href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '">\n' +
                            '                            <p class="merchandiseIntroduce row">' + data.orders[i].merchandise.merchandiseIntroduce + '</p>\n' +
                            '                            <p class="row">规格：' + data.orders[i].merchandiseSpecifications + '</p>\n' +
                            '                            <p class="row">' + data.orders[i].orderTime + '</p>\n' +
                            '                            <p class="row">订单号' + data.orders[i].orderId + '</p>\n' +
                            '                        </a>\n' +
                            '                    </td>\n' +
                            '                    <td class="price">\n' +
                            '                        <span> ¥' + data.orders[i].merchandise.merchandisePrice + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="quantity">\n' +
                            '                        <span> ' + data.orders[i].orderMerchandiseQuantity + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="totalPrice">\n' +
                            '                        <span> ¥' + new Number(data.orders[i].orderMerchandiseQuantity * data.orders[i].merchandise.merchandisePrice).toFixed(2)  + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="orderState">\n' +
                            '                        <p><span> ' + data.orders[i].orderState + ' </span></p>\n'
                        if (data.orders[i].orderState == "待付款") {
                            swiperHtml += '<p><a href="/html/purchase/payment.html?orderId=' + data.orders[i].orderId + '" target="right"> 去支付 </a></p>\n';
                        } else {
                            swiperHtml += '<p><a href="/html/logistics/logisticsMessages.html?orderId=' + data.orders[i].orderId + '" target="right"> 查看 </a></p>\n' +
                                '              <p><a href="/html/massage/massage.html" target="under"> 联系卖家 </a></p>\n';
                        }
                        swiperHtml += '        </td>\n' +
                            '                    <td class="orderOpera">\n' +
                            '                        <div class="row">\n' +
                            '                            <p><a class="collect" href="" merchandiseId="' + data.orders[i].merchandise.merchandiseId + '">收藏</a></p>\n' +
                            '                            <p><a href="/html/purchase/submitOrder.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '" target="right">再次购买</a></p>\n' +
                            '                            <p><a class="delete" href="" target="right"  orderId="' + data.orders[i].orderId + '">删除</a></p>\n' +
                            '                        </div>\n' +
                            '                    </td>\n' +
                            '                </tr>';
                    }
                    swiperHtml += '</table>';

                    $("#orderTable").html(swiperHtml);

                    // 收藏商品
                    $(".orderOpera").on('click', '.collect', function () {
                        var merchandiseId = $(this).attr("merchandiseId");
                        $.ajax({
                            url: "/collect/collectMerchandise",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                merchandiseId: merchandiseId,
                            },
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    $("#search", window.parent.document).val("");
                                    location.reload();
                                }
                            }
                        });
                    })

                    // 删除订单
                    $(".orderOpera").on('click', '.delete', function () {
                        var orderId = $(this).attr("orderId");
                        if (confirm("您确定要删除吗?(删除后将不显示该订单)")) {
                            $.ajax({
                                url: "/order/deleteOrder",
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    orderId: orderId,
                                },
                                success: function (data) {
                                    alert(data.msg);
                                    if (data.success) {
                                        alert(data.msg + " 您可以联系管理员恢复订单");
                                        $("#search", window.parent.document).val("");
                                        location.reload();
                                    }
                                }
                            });

                        }
                    })

                } else {
                    swiperHtml += '<tr><td colspan="7">' + data.msg + '</td></tr>';
                    $("#orderTable").html(swiperHtml);
                }

            }


        })
    }

    $("#search-form", window.parent.document).on("click", "#search-submit", function () {

        var keyword = $("#search", window.parent.document).val();

        $.ajax({
            url: '/order/searchMyOrder',
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                keyword: keyword,
                orderState: orderState,
            },
            success: function (data) {
                var swiperHtml = '';
                if (data.success) {
                    swiperHtml += '<table class="table" style=" border: solid 1px #a6a6a6;">\n' +
                        '                <tr id="tabtop">\n' +
                        '                    <td colspan="2">\n' +
                        '                        <span>商品信息</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>单价</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>数量</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>金额</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>交易状态</span>\n' +
                        '                    </td>\n' +
                        '                    <td>\n' +
                        '                        <span>操作</span>\n' +
                        '                    </td>\n' +
                        '                </tr>';
                    for (var i = 0; i < data.orders.length; i++) {
                        swiperHtml += '<tr>\n' +
                            '                    <td class="orderImage">\n' +
                            '                        <a href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '"><img class="img-rounded" src="' + data.orders[i].merchandise.merchandiseMainImage + '"></a>\n' +
                            '                    </td>\n' +
                            '                    <td class="orderMessage">\n' +
                            '                        <a class="row"  href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '">\n' +
                            '                            <p class="merchandiseIntroduce row">' + data.orders[i].merchandise.merchandiseIntroduce + '</p>\n' +
                            '                            <p class="row">规格：' + data.orders[i].merchandiseSpecifications + '</p>\n' +
                            '                            <p class="row">' + data.orders[i].orderTime + '</p>\n' +
                            '                            <p class="row">订单号' + data.orders[i].orderId + '</p>\n' +
                            '                        </a>\n' +
                            '                    </td>\n' +
                            '                    <td class="price">\n' +
                            '                        <span> ¥' + data.orders[i].merchandise.merchandisePrice + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="quantity">\n' +
                            '                        <span> ' + data.orders[i].orderMerchandiseQuantity + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="totalPrice">\n' +
                            '                        <span> ¥' + data.orders[i].orderMerchandiseQuantity * data.orders[i].merchandise.merchandisePrice + ' </span>\n' +
                            '                    </td>\n' +
                            '                    <td class="orderState">\n' +
                            '                        <p><span> ' + data.orders[i].orderState + ' </span></p>\n'
                        if (data.orders[i].orderState == "待付款") {
                            swiperHtml += '<p><a href="/html/purchase/payment.html?orderId=' + data.orders[i].orderId + '" target="right"> 去支付 </a></p>\n';
                        } else {
                            swiperHtml += '<p><a href="/html/logistics/logisticsMessages.html?orderId=' + data.orders[i].orderId + '" target="right"> 查看 </a></p>\n' +
                                '              <p><a href="/html/massage/massage.html" target="under"> 联系卖家 </a></p>\n';
                        }
                        swiperHtml += '          </td>\n' +
                            '                    <td class="orderOpera">\n' +
                            '                        <div class="row">\n' +
                            '                            <p><a class="collect" href="" merchandiseId="' + data.orders[i].merchandise.merchandiseId + '">收藏</a></p>\n' +
                            '                            <p><a href="/html/merchandise/purchase.html?merchandiseId=' + data.orders[i].merchandise.merchandiseId + '" target="right">再次购买</a></p>\n' +
                            '                            <p><a class="delete" href="" target="right"  orderId="' + data.orders[i].orderId + '">删除</a></p>\n' +
                            '                        </div>\n' +
                            '                    </td>\n' +
                            '                </tr>';
                    }
                    swiperHtml += '</table>';

                    $("#orderTable").html(swiperHtml);

                    // 收藏商品
                    $(".orderOpera").on('click', '.collect', function () {
                        var merchandiseId = $(this).attr("merchandiseId");
                        $.ajax({
                            url: "/collect/collectMerchandise",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                merchandiseId: merchandiseId,
                            },
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    $("#search", window.parent.document).val("");
                                    location.reload();
                                }
                            }
                        });
                    })

                    // 删除订单
                    $(".orderOpera").on('click', '.delete', function () {
                        var orderId = $(this).attr("orderId");
                        if (confirm("您确定要删除吗?(删除后将不显示该订单)")) {
                            $.ajax({
                                url: "/order/deleteOrder",
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    orderId: orderId,
                                },
                                success: function (data) {
                                    alert(data.msg);
                                    if (data.success) {
                                        alert(data.msg + " 您可以联系管理员恢复订单");
                                        $("#search", window.parent.document).val("");
                                        location.reload();
                                    }
                                }
                            });

                        }
                    })

                } else {
                    swiperHtml += '<tr><td colspan="7">' + data.msg + '</td></tr>';
                    $("#orderTable").html(swiperHtml);
                }


            }
        })
    })

})



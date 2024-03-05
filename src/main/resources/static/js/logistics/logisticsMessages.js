$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?orderId=");

    var orderId = args[1];

    $.ajax({
        url: '/logistics/logisticsMessages',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        data: {
            orderId: orderId,
        },
        success: function (data) {
            var swiperHtml1 = '';
            var swiperHtml2 = '';
            if (data.success) {
                swiperHtml1 += '<td class="orderImage">\n' +
                    '                        <img class="img-rounded" src="'+data.logistics.order.merchandise.merchandiseMainImage+'">\n' +
                    '                    </td>\n' +
                    '                    <td class="orderMessage">\n' +
                    '                        <div class="row">\n' +
                    '                            <p class="merchandiseIntroduce row">'+data.logistics.order.merchandise.merchandiseIntroduce+'</p>\n' +
                    '                            <p class="row">'+data.logistics.order.merchandise.merchandiseSpecifications+'</p>\n' +
                    '                            <p class="row">'+data.logistics.order.orderTime+'</p>\n' +
                    '                            <p class="row">'+data.logistics.order.orderId+'</p>\n' +
                    '                        </div>\n' +
                    '                    </td>\n' +
                    '                    <td class="price">\n' +
                    '                        <span> ¥'+data.logistics.order.merchandise.merchandisePrice+' </span>\n' +
                    '                    </td>\n' +
                    '                    <td class="quantity">\n' +
                    '                        <span> '+data.logistics.order.orderMerchandiseQuantity+' </span>\n' +
                    '                    </td>\n' +
                    '                    <td class="totalPrice">\n' +
                    '                        <span> ¥'+data.logistics.order.merchandise.merchandisePrice*data.logistics.order.orderMerchandiseQuantity+' </span>\n' +
                    '                    </td>\n' +
                    '                    <td class="orderState">\n' +
                    '                        <p><span> '+data.logistics.order.orderState+' </span></p>\n' +
                    '                        <p><a href="/html/massage/massage.html" target="under"> 联系卖家 </a></p>\n' +
                    '                    </td>\n' +
                    '                    <td class="orderOpera">\n' +
                    '                        <div class="row">\n' +
                    '                            <p><a class="collect" href="" merchandiseId="' + data.logistics.order.merchandise.merchandiseId + '">收藏</a></p>\n' +
                    '                            <p><a href="/html/purchase/submitOrder.html?merchandiseId=' + data.logistics.order.merchandise.merchandiseId + '" target="right">再次购买</a></p>\n' +
                    '                            <p><a href="" target="right"  merchandiseId="' + data.logistics.order.merchandise.merchandiseId + '">删除</a></p>\n' +
                    '                        </div>\n' +
                    '                    </td>';

                $("#orderMassage").html(swiperHtml1);

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

                swiperHtml2 += '<table class="col-xs-4" style="height: 100%; margin: 0; border-right: solid 1px #a6a6a6; size: 10px">\n' +
                    '                <tr style="width: 100%; height: 50px; margin: 0; border-bottom: solid 1px #a6a6a6;">\n' +
                    '                    <td>订单信息</td>\n' +
                    '                </tr>\n' +
                    '                <tr style="margin: 20px 0; ">\n' +
                    '                    <td>\n' +
                    '                        <p><label>收货人信息：</label><span>'+ data.logistics.order.consigneeName +','+ data.logistics.order.consigneeTelephone +','+ data.logistics.order.consigneeAddr +',000000</span></p>\n' +
                    '                        <p style="margin: 0 50px 0 0; float: right; font-size: 5px; "><a>修改收货人信息</a></p>\n' +
                    '                        <p><label>买家留言：</label><span>'+ data.logistics.order.consigneeRemark +'</span></p>\n' +
                    '                        <p style="float: right; margin-right: 100px; font-size: 5px; "><a>更多∇</a></p>\n' +
                    '                        <p><label>订单编号：</label><span>'+ data.logistics.order.orderId +'</span></p>\n' +
                    '                        <p><label>订单创建时间：</label><span>'+ data.logistics.order.orderTime +'</span></p>\n' +
                    '                        <p><label>商家：</label><span>'+ data.logistics.order.merchandise.store.user.userName +'</span></p>\n' +
                    '                        <p style="float: right; margin-right: 100px; font-size: 5px; "><a>更多∇</a></p>\n' +
                    '                        <p><label>店铺：</label><span>'+ data.logistics.order.merchandise.store.storeName +'</span></p>\n' +
                    '\n' +
                    '                    </td>\n' +
                    '                </tr>\n' +
                    '\n' +
                    '            </table>\n' +
                    '\n' +
                    '            <div class="col-xs-8 logistics" style="height: 100%;">\n' +
                    '                <h4>订单状态：'+ data.logistics.order.orderState +'</h4>\n' +
                    '                <p><label>快递单号: </label>'+ data.logistics.logisticsCode +'</p>\n' +
                    '                <span style="font-size: 8px; color: #4cae4c;">'+ data.logistics.logisticsMessages +'</span>\n' +
                    '            </div>';

                $("#logistics").html(swiperHtml2);

            } else {
                swiperHtml1 += '<p style="text-align: center; ">'+data.msg+'</p>';
                $("#orderMassage").html(swiperHtml1);
                $("#logistics").html('');
            }

        },

    });

})
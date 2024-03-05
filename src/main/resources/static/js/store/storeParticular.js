$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?storeId=");

    var storeId = args[1];

    // 店铺详情
    $.ajax({
        url: '/store/storeParticular',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        data: {
            storeId: storeId,
        },
        success: function (data) {
            var swiperHtml = '';
            if (data.success) {
                if (data.isOwn) {
                    location.href = "/html/store/myStore.html";
                } else {
                    swiperHtml += '<div class="row" id="store">\n' +
                        '               <div class="row"><img  class="img-rounded" src="' + data.store.storeImage + '" style="height: 50px; ">\n' +
                        '                   <span id="storeName">' + data.store.storeName + '</span>\n' +
                        '                   <a class="btn" id="collectStore"> 收藏店铺 </a>\n' +
                        '                   <a href="/html/massage/massage.html" target="under" style="margin-left: 50px; "> 联系卖家 </a>\n' +
                        '               </div>\n' +
                        '               <div class="row">\n' +
                        '                   <span id="merchandiseQuantity"> 共有 ' + data.merchandiseCount + ' 件宝贝 </span>\n' +
                        '                   <span id="saleQuantity"> 已售出 ' + data.store.saleQuantity + ' 件宝贝 </span>\n' +
                        '                   <span id="credit"> ' + data.store.credit + ' </span>\n' +
                        '               </div>\n' +
                        '           </div>\n' +
                        '           <div class="row">';

                    for (var i = 0; i < data.store.merchandises.length; i++) {
                        swiperHtml += '<div class="btn btn-default col-xs-2 merchandise"\n' +
                            '             style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 180px">\n' +
                            '            <div style="position:relative; width: 100%; height: 125px; margin-bottom: 10px;">\n' +
                            '                <a target="right" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.store.merchandises[i].merchandiseId + '">' +
                            '                       <img src="' + data.store.merchandises[i].merchandiseMainImage + '" class="row img-rounded"\n' +
                            '                     style="position:relative; height: 100%;">' +
                            '                </a>\n' +
                            '            </div>\n' +
                            '            <div class="col-xs-8" style="padding: 0; margin: 0">\n' +
                            '                <a target="right" class="col-xs-10" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.store.merchandises[i].merchandiseId + '"\n' +
                            '                   style=" float: left; display:-webkit-box; height: 40px; white-space: normal; overflow:hidden;text-overflow: ellipsis; padding: 0; ">\n' +
                            '                    <span style="font-size: 8px;">' + data.store.merchandises[i].merchandiseName + '</span>\n' +
                            '                    <span style="font-size: 4px; color: #3c3c3c">' + data.store.merchandises[i].merchandiseIntroduce + '</span></a>\n' +
                            '                <span style="font-size: 20px; color: red; position:relative;top: -13px"> ¥' + data.store.merchandises[i].merchandisePrice + '</span>\n' +
                            '            </div>\n' +
                            '            <div class="col-xs-4" style="margin:auto; padding: 0; ">\n' +
                            '                 <a class="col-xs-4 btn collect"  merchandiseId="' + data.store.merchandises[i].merchandiseId + '" style="margin: auto; padding: 10px 0 0 0; position:relative; left: -12px; ">'


                        // 收藏标记上样式
                        $.ajax({
                            url: "/collect/findCollectMerchandise",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                merchandiseId: data.store.merchandises[i].merchandiseId
                            },
                            success: function (data1) {
                                if (data1.success) {
                                    swiperHtml += '<span class="glyphicon glyphicon-star"\n' +
                                        '                          style="padding: 3px; color: #edbc3b; font-size: 18px; "></span>'
                                } else {
                                    swiperHtml += '<span class="glyphicon glyphicon-star-empty"\n' +
                                        '                          style="padding: 3px; color: #4cae4c; font-size: 18px; "></span>'
                                }
                            }
                        });

                        swiperHtml += '         </a>\n' +
                            '                  <a class="col-xs-4 btn addShoppingCar" merchandiseId="' + data.store.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -7px">\n' +
                            '                      <span class="glyphicon glyphicon-shopping-cart" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                            '                  </a>\n' +
                            '                  <a class="col-xs-4 btn purchase" target="right" href="/html/purchase/submitOrder.html?merchandiseId=' + data.store.merchandises[i].merchandiseId + '" merchandiseId="' + data.store.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -2px">\n' +
                            '                      <span class="glyphicon glyphicon-ok" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                            '                  </a>\n' +
                            '            </div>\n' +
                            '        </div>';
                    }
                    swiperHtml += '</div>';

                    $(".container").html(swiperHtml);

                    // 收藏店铺
                    $("#store").on('click', '#collectStore', function () {
                        $.ajax({
                            url: "/collect/collectStore",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                storeId: storeId
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

                    // 收藏商品
                    $(".merchandise").on('click', '.collect', function () {
                        var merchandiseId = $(this).attr("merchandiseId");
                        $.ajax({
                            url: "/collect/collectMerchandise",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                merchandiseId: merchandiseId
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

                    // 加入购物车
                    $(".merchandise").on('click', '.addShoppingCar', function () {
                        var merchandiseId = $(this).attr("merchandiseId");
                        $.ajax({
                            url: "/shoppingCar/addShoppingCar",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                merchandiseId: merchandiseId
                            },
                            success: function (data) {
                                alert(data.msg);
                            }
                        });
                    })
                }
            }
            else {
                if (data.exist) {
                    swiperHtml += '<p>' + data.msg + '</p>';
                    $(".container").html(swiperHtml);
                } else {
                    alert(data.msg);
                }

            }


        }

    });


})
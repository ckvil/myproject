$(function () {

    $.ajax({
        url: '/collect/collectMerchandises',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            var swiperHtml = '';
            if (data.success) {
                for (var i = 0; i < data.collectMerchandises[0].collectMerchandises.length; i++) {
                    swiperHtml += '<div class="btn btn-default col-xs-2 merchandise"\n' +
                        '                style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 220px">\n' +
                        '            <div style="position:relative; width: 100%; height: 175px; margin-bottom: 10px;">\n' +
                        '                <a href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '"><img class="merchandiseImage" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" src="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseMainImage + '" class="row img-rounded" style="position:relative; height: 100%;"></a>\n' +
                        '            </div>\n' +
                        '            <div class="col-xs-8" style="padding: 0; margin: 0">\n' +
                        '                <a class="col-xs-10 merchandiseIntroduce" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '"\n' +
                        '                   style=" display:-webkit-box; height: 35px; white-space: normal; overflow:hidden;text-overflow: ellipsis; white-space: normal; font-size: 5px;padding: 0; ">' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseName + ' ' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseIntroduce + '</a>\n' +
                        '                <span style="font-size: 20px; color: red; position:relative;top: -13px"> ¥' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandisePrice + '</span>\n' +
                        '            </div>\n' +
                        '            <div class="col-xs-4" style="margin: 5px auto auto auto; padding: 0; ">\n' +
                        '               <a class="col-xs-4 btn collect"  merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: auto; padding: 10px 0 0 0; position:relative; left: -12px; top: -5px; ">\n' +
                        '                    <span class="glyphicon glyphicon-star"\n' +
                        '                          style="padding: 3px; color: #edbc3b; font-size: 18px; "></span>\n' +
                        '               </a>\n' +
                        '                <a class="col-xs-4 btn addShoppingCar" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -7px; top: -5px; ">\n' +
                        '                    <span class="glyphicon glyphicon-shopping-cart" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                        '                </a>\n' +
                        '                <a class="col-xs-4 btn purchase" href="/html/purchase/submitOrder.html?merchandiseId='+data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId+'" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -2px; top: -5px; ">\n' +
                        '                    <span class="glyphicon glyphicon-ok" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                        '                </a>\n' +
                        '            </div>\n' +
                        '        </div>';
                }

                $(".container").html(swiperHtml);

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
                            if (data.success){
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
            else {
                swiperHtml += '<p>' + data.msg + '</p>';
                $(".container").html(swiperHtml);
            }
        }
    });


    $("#search-form",window.parent.document).on("click","#search-submit",function () {

        var keyword = $("#search", window.parent.document).val();

        $.ajax({
            url: '/collect/searchCollectMerchandises',
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                keyword: keyword,
            },
            success: function (data) {
                var swiperHtml = '';
                if (data.success) {
                    for (var i = 0; i < data.collectMerchandises[0].collectMerchandises.length; i++) {
                        swiperHtml += '<div class="btn btn-default col-xs-2 merchandise"\n' +
                            '                style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 220px">\n' +
                            '            <div style="position:relative; width: 100%; height: 175px; margin-bottom: 10px;">\n' +
                            '                <a href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '"><img class="merchandiseImage" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" src="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseMainImage + '" class="row img-rounded" style="position:relative; height: 100%;"></a>\n' +
                            '            </div>\n' +
                            '            <div class="col-xs-8" style="padding: 0; margin: 0">\n' +
                            '                <a class="col-xs-10 merchandiseIntroduce" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '"\n' +
                            '                   style=" display:-webkit-box; height: 35px; white-space: normal; overflow:hidden;text-overflow: ellipsis; white-space: normal; font-size: 5px;padding: 0; ">' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseName + ' ' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseIntroduce + '</a>\n' +
                            '                <span style="font-size: 20px; color: red; position:relative;top: -13px"> ¥' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandisePrice + '</span>\n' +
                            '            </div>\n' +
                            '            <div class="col-xs-4" style="margin: 5px auto auto auto; padding: 0; ">\n' +
                            '               <a class="col-xs-4 btn collect"  merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: auto; padding: 10px 0 0 0; position:relative; left: -12px; top: -5px; ">\n' +
                            '                    <span class="glyphicon glyphicon-star"\n' +
                            '                          style="padding: 3px; color: #edbc3b; font-size: 18px; "></span>\n' +
                            '               </a>\n' +
                            '                <a class="col-xs-4 btn addShoppingCar" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -7px; top: -5px; ">\n' +
                            '                    <span class="glyphicon glyphicon-shopping-cart" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                            '                </a>\n' +
                            '                <a class="col-xs-4 btn purchase" href="/html/merchandise/purchase.html?merchandiseId='+data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId+'" merchandiseId="' + data.collectMerchandises[0].collectMerchandises[i].merchandise.merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -2px; top: -5px; ">\n' +
                            '                    <span class="glyphicon glyphicon-ok" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                            '                </a>\n' +
                            '            </div>\n' +
                            '        </div>';
                    }

                    $(".container").html(swiperHtml);

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
                                if (data.success){
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

                    // 购买
                    $(".merchandise").on('click', '.purchase', function () {
                        var merchandiseId = $(this).attr("merchandiseId");
                        if (confirm("是否确认购买~")) {
                            $.ajax({
                                url: "/merchandise/purchase",
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    merchandiseId: merchandiseId
                                },
                                success: function (data) {
                                    if (data.success) {
                                        location.reload();
                                    } else {
                                        alert(data.msg)
                                    }
                                }
                            });
                        }
                    })

                }
                else {
                    swiperHtml += '<p>' + data.msg + '</p>';
                    $(".container").html(swiperHtml);
                }


            }
        })
    });



})



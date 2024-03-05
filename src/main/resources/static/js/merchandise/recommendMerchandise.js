$(function () {

    // 获取商品列表
    $.ajax({
        url: '/merchandise/merchandiseList',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            var swiperHtml = '';
            if (data.success) {
                if (data.merchandises.length == 0) {
                    swiperHtml = '<span style="height: 100px; width: 100%"><p style="color: #9d9d9d; margin: auto;text-align: center">商品为空</p></span>';
                } else {
                    for (var i = 0; i < data.merchandises.length; i++) {
                        if (data.merchandises[i].merchandiseQuantity != 0 && data.merchandises[i].merchandiseQuantity != null) {
                            swiperHtml += '<div class="btn btn-default col-xs-2 merchandise"\n' +
                                '                style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 220px">\n' +
                                '            <div style="position:relative; width: 100%; height: 175px; margin-bottom: 10px;">\n' +
                                '                <a target="right" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.merchandises[i].merchandiseId + '"><img class="merchandiseImage" merchandiseId="' + data.merchandises[i].merchandiseId + '" src="' + data.merchandises[i].merchandiseMainImage + '" class="row img-rounded" style="position:relative; height: 100%;"></a>\n' +
                                '            </div>\n' +
                                '            <div class="col-xs-8" style="padding: 0; margin: 0">\n' +
                                '                <a class="col-xs-10 merchandiseIntroduce"  target="right" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.merchandises[i].merchandiseId + '" merchandiseId="' + data.merchandises[i].merchandiseId + '"\n' +
                                '                   style=" float: left; display:-webkit-box; height: 35px; white-space: normal; overflow:hidden;text-overflow: ellipsis; white-space: normal; font-size: 5px;padding: 0; ">' + data.merchandises[i].merchandiseName + ' ' + data.merchandises[i].merchandiseIntroduce + '</a>\n' +
                                '                <span style="font-size: 20px; color: red; position:relative; top: -13px; "> ¥' + data.merchandises[i].merchandisePrice + '</span>\n' +
                                '            </div>\n' +
                                '            <div class="col-xs-4" style="margin:auto; padding: 0; ">\n' +
                                '               <a class="col-xs-4 btn collect"  merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: auto; padding: 10px 0 0 0; position:relative; left: -12px; ">'


                            // 收藏标记上样式
                            $.ajax({
                                url: "/collect/findCollectMerchandise",
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    merchandiseId: data.merchandises[i].merchandiseId
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


                            swiperHtml += '</a>\n' +
                                '                <a class="col-xs-4 btn addShoppingCar" merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -7px">\n' +
                                '                    <span class="glyphicon glyphicon-shopping-cart" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                                '                </a>\n' +
                                '                <a class="col-xs-4 btn purchase" target="right" href="/html/purchase/submitOrder.html?merchandiseId=' + data.merchandises[i].merchandiseId + '" merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -2px">\n' +
                                '                    <span class="glyphicon glyphicon-ok" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                                '                </a>\n' +
                                '            </div>\n' +
                                '        </div>';
                        }
                    }
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


            } else {
                swiperHtml += '<p>' + data.msg + '</p>';
                $(".container").html(swiperHtml);
            }
        }
    });


    // 搜索商品
    $("#search-form", window.parent.document).on("click", "#search-submit", function () {

        var keyword = $("#search", window.parent.document).val();

        $.ajax({
            url: '/merchandise/searchMerchandise',
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
                    if (data.merchandises.length == 0) {
                        swiperHtml = '<span style="height: 100px; width: 100%"><p style="color: #9d9d9d; margin: auto;text-align: center">商品为空</p></span>';
                    } else {
                        for (var i = 0; i < data.merchandises.length; i++) {
                            swiperHtml += '<div class="btn btn-default col-xs-2 merchandise"\n' +
                                '                style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 220px">\n' +
                                '            <div style="position:relative; width: 100%; height: 175px; margin-bottom: 10px;">\n' +
                                '                <a href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.merchandises[i].merchandiseId + '"><img class="merchandiseImage" merchandiseId="' + data.merchandises[i].merchandiseId + '" src="' + data.merchandises[i].merchandiseMainImage + '" class="row img-rounded" style="position:relative; height: 100%;"></a>\n' +
                                '            </div>\n' +
                                '            <div class="col-xs-8" style="padding: 0; margin: 0">\n' +
                                '                <a class="col-xs-10 merchandiseIntroduce" href="/html/merchandise/merchandiseParticular.html?merchandiseId=' + data.merchandises[i].merchandiseId + '" merchandiseId="' + data.merchandises[i].merchandiseId + '"\n' +
                                '                   style=" float: left; display:-webkit-box; height: 35px; white-space: normal; overflow:hidden;text-overflow: ellipsis; white-space: normal; font-size: 5px;padding: 0; ">' + data.merchandises[i].merchandiseName + ' ' + data.merchandises[i].merchandiseIntroduce + '</a>\n' +
                                '                <span style="font-size: 20px; color: red; position:relative; top: -13px; "> ¥' + data.merchandises[i].merchandisePrice + '</span>\n' +
                                '            </div>\n' +
                                '            <div class="col-xs-4" style="margin:auto; padding: 0; ">\n' +
                                '               <a class="col-xs-4 btn collect"  merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: auto; padding: 10px 0 0 0; position:relative; left: -12px; ">'


                            // 收藏标记上样式
                            $.ajax({
                                url: "/collect/findCollectMerchandise",
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    merchandiseId: data.merchandises[i].merchandiseId
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


                            swiperHtml += '</a>\n' +
                                '                <a class="col-xs-4 btn addShoppingCar" merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -7px">\n' +
                                '                    <span class="glyphicon glyphicon-shopping-cart" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                                '                </a>\n' +
                                '                <a class="col-xs-4 btn purchase" target="right" href="/html/merchandise/purchase.html?merchandiseId=' + data.merchandises[i].merchandiseId + '" merchandiseId="' + data.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; position:relative; left: -2px">\n' +
                                '                    <span class="glyphicon glyphicon-ok" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%; "></span>\n' +
                                '                </a>\n' +
                                '            </div>\n' +
                                '        </div>';
                        }
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


                } else {
                    swiperHtml += '<p>' + data.msg + '</p>';
                    $(".container").html(swiperHtml);
                }
            }
        })

    })


})



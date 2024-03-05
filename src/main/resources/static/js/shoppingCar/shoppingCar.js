$(function () {

    $.ajax({
        url: '/shoppingCar/merchandiseList',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            var swiperHtml = '';
            if (data.success) {
                swiperHtml += '<div class="col-xs-11">\n' +
                    '        <table class="table" style=" border: solid 1px #a6a6a6;">\n' +
                    '            <tr id="tabtop">\n' +
                    '                <td>\n' +
                    '                    <input type="checkbox" id="allCheck" name="allCheck">\n' +
                    '                    <label for="allCheck"><span>全选</span></label>\n' +
                    '                </td>\n' +
                    '                <td colspan="2">\n' +
                    '                    <span>商品信息</span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <span>规格</span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <span>单价</span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <span>数量</span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <span>金额</span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <span>操作</span>\n' +
                    '                </td>\n' +
                    '            </tr>';

                for (var i = 0; i < data.merchandiseCount; i++) {
                    swiperHtml += '<tr merchandiseId="' + data.shoppingCars[i].merchandise.merchandiseId + '" shoppingCarId="' + data.shoppingCars[i].shoppingCarId + '">\n' +
                        '                <td class="check">\n' +
                        '                    <input type="checkbox" class="select">\n' +
                        '                </td>\n' +
                        '                <td class="merchandiseImage">\n' +
                        '                    <img class="img-rounded" src="' + data.shoppingCars[i].merchandise.merchandiseMainImage + '">\n' +
                        '                </td>\n' +
                        '                <td class="merchandiseMessage">\n' +
                        '                    <p>' + data.shoppingCars[i].merchandise.merchandiseIntroduce + '</p>\n' +
                        '                </td>\n' +
                        '                <td class="merchandiseSpecification">\n' +
                        '                    <span>' + data.shoppingCars[i].merchandise.merchandiseSpecifications + '</span>\n' +
                        '                </td>\n' +
                        '                <td class="price">\n' +
                        '                    <span merchandisePrice="' + data.shoppingCars[i].merchandise.merchandisePrice + '"> ¥ ' + data.shoppingCars[i].merchandise.merchandisePrice + ' </span>\n' +
                        '                </td>\n' +
                        '                <td class="quantity">\n' +
                        '                    <input type="number" placeholder="输入商品数量" value="1" min="1" oninput="if( this.value.length > 4 )  this.value = this.value.slice(0,4)" style="width: 50px; height: 30px;">\n' +
                        '                </td>\n' +
                        '                <td class="totalPrice">\n' +
                        '                    <span totalPrice="' + data.shoppingCars[i].merchandise.merchandisePrice + '"> ¥ ' + data.shoppingCars[i].merchandise.merchandisePrice + ' </span>\n' +
                        '                </td>\n' +
                        '                <td class="merchandiseOpera">\n' +
                        '                    <div class="row">\n' +
                        '                        <p><a href="/html/purchase/submitOrder.html?merchandiseId=' + data.shoppingCars[i].merchandise.merchandiseId + '" target="right">购买</a></p>\n' +
                        '                        <p><a class="btn collect" merchandiseId="' + data.shoppingCars[i].merchandise.merchandiseId + '">收藏</a></p>\n' +
                        '                        <p><a class="btn delete" shoppingCarId="' + data.shoppingCars[i].shoppingCarId + '">删除</a></p>\n' +
                        '                    </div>\n' +
                        '                </td>\n' +
                        '            </tr>';
                }
                swiperHtml += '<tr>\n' +
                    '                <td colspan="4">\n' +
                    '                </td>\n' +
                    '                <td colspan="2">\n' +
                    '                    <span id="totalMoney"> 总价： ¥ 0.00 </span>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <a id="delAll"><button class="btn button"> 一键删除 </button></a>\n' +
                    '                </td>\n' +
                    '                <td>\n' +
                    '                    <a id="purchaseAll"><button class="btn button"> 一键购买 </button></a>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '        </table>\n' +
                    '    </div>';

                $(".container").html(swiperHtml);


                $(".container").on("change", ".quantity", function () {
                    var merchandiseQuantity = $(this).children("input").val();
                    var price = $(this).prev().children("span").attr("merchandisePrice");
                    $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                    $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));

                    totalMoney();
                })

                $(".container").on("keyup", ".quantity", function () {
                    var merchandiseQuantity = $(this).children("input").val();
                    var price = $(this).prev().children("span").attr("merchandisePrice");
                    $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                    $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));

                    totalMoney();
                })

                $(".container").on("blur", ".quantity", function () {
                    if ($(this).children("input").val() == '') {
                        $(this).children("input").val("1");
                        var merchandiseQuantity = $(this).children("input").val();
                        var price = $(this).prev().children("span").attr("merchandisePrice");
                        $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                        $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));
                    }

                    totalMoney();
                })


                // 全选
                $(".container").on("change", "#allCheck", function () {
                    if ($(this).is(":checked")) {
                        $(":checkbox").prop("checked", true);
                    } else {
                        $(":checkbox").prop("checked", false);
                    }
                    totalMoney();

                })


                // 复选框变化
                $(".container").on("change", ".check", function () {
                    if (!$(this).is(":checked")) {
                        $("#allCheck").prop("checked", false);
                    }
                    totalMoney();
                })

                // 收藏商品
                $("table").on('click', '.collect', function () {
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
                        }
                    });
                })

                // 删除购物车商品
                $("table").on('click', '.delete', function () {
                    var shoppingCarId = $(this).attr("shoppingCarId");
                    $.ajax({
                        url: "/shoppingCar/deleteMerchandise",
                        async: false,
                        cache: false,
                        type: "post",
                        dataType: 'json',
                        data: {
                            shoppingCarId: shoppingCarId,
                        },
                        success: function (data) {
                            alert(data.msg);
                            if (data.success) {
                                location.href = "/html/shoppingCar/shoppingCar.html";
                            }
                        }
                    });
                })

                // 一键删除
                $("table").on('click', '#delAll', function () {
                    if(confirm("您确定要删除所选商品吗?")){
                        $('.select:checked').each(function (index) {
                            var shoppingCarId = $(this).closest("td").closest("tr").attr("shoppingCarId");
                            $.ajax({
                                url: '/shoppingCar/deleteMerchandise',
                                async: false,
                                cache: false,
                                type: "post",
                                dataType: 'json',
                                data: {
                                    shoppingCarId: shoppingCarId,
                                },
                                success: function (data) {
                                    alert(data.msg);
                                }
                            })

                        })
                    }

                })

                // 一键购买
                $("table").on('click', '#purchaseAll', function () {
                    var shoppingCarIds = "";

                    $('.select:checked').each(function (index) {
                        if (index != 0) {
                            shoppingCarIds += "&";
                        }
                        shoppingCarIds += "shoppingCarId" + parseInt(index + 1) + "=" + $(this).closest("td").closest("tr").attr("shoppingCarId");
                    })

                    if (shoppingCarIds == "") {
                        alert("请选择商品~");
                    } else {
                        location.href = "/html/purchase/submitShoppingCarOrder.html?" + shoppingCarIds;
                    }

                })


            } else {
                swiperHtml += '<p>' + data.msg + '</p>';
                $(".container").html(swiperHtml);
            }

        }


    })


    // 在购物车中搜索商品
    $("#search-form", window.parent.document).on("click", "#search-submit", function () {

        var keyword = $("#search", window.parent.document).val();

        $.ajax({
            url: '/shoppingCar/searchShoppingCar',
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                keyword: keyword,
            },
            success: function (data) {
                var swiperHtml = '';
                var totalMoney = 0.0;
                if (data.success) {
                    swiperHtml += '<div class="col-xs-11">\n' +
                        '        <table class="table" style=" border: solid 1px #a6a6a6;">\n' +
                        '            <tr id="tabtop">\n' +
                        '                <td>\n' +
                        '                    <input type="checkbox" id="all">\n' +
                        '                    <label for="all"><span>全选</span></label>\n' +
                        '                </td>\n' +
                        '                <td colspan="2">\n' +
                        '                    <span>商品信息</span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <span>规格</span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <span>单价</span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <span>数量</span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <span>金额</span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <span>操作</span>\n' +
                        '                </td>\n' +
                        '            </tr>';

                    for (var i = 0; i < data.shoppingCars.length; i++) {
                        swiperHtml += '<tr merchandiseId="' + data.shoppingCars[i].merchandise.merchandiseId + '" shoppingCarId="' + data.shoppingCars[i].shoppingCarId + '">\n' +
                            '                <td class="check">\n' +
                            '                    <input type="checkbox">\n' +
                            '                </td>\n' +
                            '                <td class="merchandiseImage">\n' +
                            '                    <img class="img-rounded" src="' + data.shoppingCars[i].merchandise.merchandiseMainImage + '">\n' +
                            '                </td>\n' +
                            '                <td class="merchandiseMessage">\n' +
                            '                    <p>' + data.shoppingCars[i].merchandise.merchandiseIntroduce + '</p>\n' +
                            '                </td>\n' +
                            '                <td class="merchandiseSpecification">\n' +
                            '                    <span>' + data.shoppingCars[i].merchandise.merchandiseSpecifications + '</span>\n' +
                            '                </td>\n' +
                            '                <td class="price">\n' +
                            '                    <span> ¥' + data.shoppingCars[i].merchandise.merchandisePrice + ' </span>\n' +
                            '                </td>\n' +
                            '                <td class="quantity">\n' +
                            '                    <input type="number" placeholder="输入商品数量" value="1" min="1"\n' +
                            '                           style="width: 50px; height: 30px;">\n' +
                            '                </td>\n' +
                            '                <td class="totalPrice">\n' +
                            '                    <span> ¥' + data.shoppingCars[i].merchandise.merchandisePrice + ' </span>\n' +
                            '                </td>\n' +
                            '                <td class="merchandiseOpera">\n' +
                            '                    <div class="row">\n' +
                            '                        <p><a href="/test.html" target="right">购买</a></p>\n' +
                            '                        <p><a class="btn collect" merchandiseId="' + data.shoppingCars[i].merchandise.merchandiseId + '">收藏</a></p>\n' +
                            '                        <p><a class="btn delete" shoppingCarId="' + data.shoppingCars[i].shoppingCarId + '">删除</a></p>\n' +
                            '                    </div>\n' +
                            '                </td>\n' +
                            '            </tr>';
                    }
                    swiperHtml += '<tr>\n' +
                        '                <td colspan="4">\n' +
                        '                </td>\n' +
                        '                <td colspan="2">\n' +
                        '                    <span id="totalMoney"> 总价： ¥ 0.00 </span>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <a id="delAll"><button class="btn button"> 一键删除 </button></a>\n' +
                        '                </td>\n' +
                        '                <td>\n' +
                        '                    <a id="purchaseAll"><button class="btn button"> 一键购买 </button></a>\n' +
                        '                </td>\n' +
                        '            </tr>\n' +
                        '        </table>\n' +
                        '    </div>';

                    $(".container").html(swiperHtml);

                    $(".container").on("change", ".quantity", function () {
                        var merchandiseQuantity = $(this).children("input").val();
                        var price = $(this).prev().children("span").attr("merchandisePrice");
                        $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                        $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));

                        totalMoney();
                    })

                    $(".container").on("keyup", ".quantity", function () {
                        var merchandiseQuantity = $(this).children("input").val();
                        var price = $(this).prev().children("span").attr("merchandisePrice");
                        $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                        $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));

                        totalMoney();
                    })

                    $(".container").on("blur", ".quantity", function () {
                        if ($(this).children("input").val() == '') {
                            $(this).children("input").val("1");
                            var merchandiseQuantity = $(this).children("input").val();
                            var price = $(this).prev().children("span").attr("merchandisePrice");
                            $(this).next().children("span").text('¥ ' + new Number(price * merchandiseQuantity).toFixed(2));
                            $(this).next().children("span").attr("totalPrice", new Number(price * merchandiseQuantity).toFixed(2));
                        }

                        totalMoney();
                    })


                    // 全选
                    $(".container").on("change", "#allCheck", function () {
                        if ($(this).is(":checked")) {
                            $(":checkbox").prop("checked", true);
                        } else {
                            $(":checkbox").prop("checked", false);
                        }
                        totalMoney();

                    })


                    // 复选框变化
                    $(".container").on("change", ".check", function () {
                        if (!$(this).is(":checked")) {
                            $("#allCheck").prop("checked", false);
                        }
                        totalMoney();
                    })

                    // 收藏商品
                    $("table").on('click', '.collect', function () {
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
                            }
                        });
                    })

                    // 删除购物车商品
                    $("table").on('click', '.delete', function () {
                        var shoppingCarId = $(this).attr("shoppingCarId");
                        $.ajax({
                            url: "/shoppingCar/deleteMerchandise",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                shoppingCarId: shoppingCarId,
                            },
                            success: function (data) {
                                alert(data.msg);
                                if (data.success) {
                                    location.href = "/html/shoppingCar/shoppingCar.html";
                                }
                            }
                        });
                    })

                    // 一键删除
                    $("table").on('click', '#delAll', function () {
                        if(confirm("您确定要删除所选商品吗?")){
                            $('.select:checked').each(function (index) {
                                var shoppingCarId = $(this).closest("td").closest("tr").attr("shoppingCarId");
                                $.ajax({
                                    url: '/shoppingCar/deleteMerchandise',
                                    async: false,
                                    cache: false,
                                    type: "post",
                                    dataType: 'json',
                                    data: {
                                        shoppingCarId: shoppingCarId,
                                    },
                                    success: function (data) {
                                        alert(data.msg);
                                    }
                                })

                            })
                        }

                    })

                    // 一键购买
                    $("table").on('click', '#purchaseAll', function () {
                        var shoppingCarIds = "";

                        $('.select:checked').each(function (index) {
                            if (index != 0) {
                                shoppingCarIds += "&";
                            }
                            shoppingCarIds += "shoppingCarId" + parseInt(index + 1) + "=" + $(this).closest("td").closest("tr").attr("shoppingCarId");
                        })

                        if (shoppingCarIds == "") {
                            alert("请选择商品~");
                        } else {
                            location.href = "/html/purchase/submitShoppingCarOrder.html?" + shoppingCarIds;
                        }

                    })

                } else {
                    swiperHtml += '<p>' + data.msg + '</p>';
                    $(".container").html(swiperHtml);
                }

            }


        })

    })

    // 计算已选择的总价函数
    function totalMoney() {
        var totalMoney = 0;
        $('.select:checked').each(function () {
            var totalPrice = $(this).closest("td").closest("tr").children(".totalPrice").children("span").attr("totalPrice");
            totalMoney += parseFloat(totalPrice);
        })
        $("#totalMoney").text(" 总价： ¥ " + new Number(totalMoney).toFixed(2));
    }


})
$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?merchandiseId=");

    var merchandiseId = args[1];

    $.getJSON("/merchandise/merchandiseParticular", {
            merchandiseId: merchandiseId
        },
        function (data) {
        var swiperHtml='';
            if (data.success) {
                swiperHtml += '<div class="row">\n' +
                    '        <!-- 左侧轮播图 -->\n' +
                    '        <div id="carousel-example-generic" class="col-xs-5 carousel slide" data-ride="carousel" style="margin: 10px; ">\n' +
                    '            <!--Indicators-->\n' +
                    '            <ol class="carousel-indicators">';
                for (var i = 0; i < data.images.length; i++) {
                    if (i == 0) {
                        swiperHtml += '<li data-target="#carousel-example-generic" data-slide-to="0" class="active">';
                    } else {
                        swiperHtml += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>';
                    }
                }
                swiperHtml += '</ol>\n' +
                    '\n' +
                    '            <!--Wrapper for slides-->\n' +
                    '            <div class="carousel-inner" role="listbox">';
                for (var i = 0; i < data.images.length; i++) {
                    if (i == 0) {
                        swiperHtml += '<div class="item active">\n' +
                            '                    <img src="' + data.images[i] + '" alt="...">\n' +
                            '                    <div class="carousel-caption">\n' +
                            '                        ' + data.merchandise.merchandiseName + '\n' +
                            '                    </div>\n' +
                            '                </div>';
                    } else {
                        swiperHtml += '<div class="item">\n' +
                            '                    <img src="' + data.images[i] + '" alt="...">\n' +
                            '                    <div class="carousel-caption">\n' +
                            '                        ' + data.merchandise.merchandiseName + '\n' +
                            '                    </div>\n' +
                            '                </div>';
                    }
                }
                swiperHtml += '</div>\n' +
                    '            <!-- Controls -->\n' +
                    '            <a class="left carousel-control img-rounded" href="#carousel-example-generic" role="button"\n' +
                    '               data-slide="prev">\n' +
                    '                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
                    '                <span class="sr-only">Previous</span>\n' +
                    '            </a>\n' +
                    '            <a class="right carousel-control img-rounded" href="#carousel-example-generic" role="button"\n' +
                    '               data-slide="next">\n' +
                    '                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
                    '                <span class="sr-only">Next</span>\n' +
                    '            </a>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <!-- 右侧商品详情 -->\n' +
                    '        <div class="col-xs-6 merchandise" style="margin: 10px; ">\n' +
                    '            <!-- 商品介绍 -->\n' +
                    '            <span class="row" style="font-size: 20px; white-space: normal; color: #5664ed">' + data.merchandise.merchandiseName + '</span>\n' +
                    '            <!-- 进入店铺 -->\n' +
                    '            <a class="row" href="/html/store/storeParticular.html?storeId=' + data.merchandise.store.storeId + ' " target="right" style="white-space: normal;"><span style="font-size: 13px; ">' + data.merchandise.store.storeName + ' </span><span style="font-size: 8px; color: #a65e45">进入店铺</span></a>\n' +
                    '            <span class="row" style="font-size: 20px; white-space: normal;">' + data.merchandise.merchandiseIntroduce + '</span>\n' +
                    '            <!-- 商品库存/销量 -->\n' +
                    '            <span class="col-xs-6 navbar-right" style="font-size: 8px; white-space: normal;">月销 1000+</span>\n' +
                    '            <!-- 商品价格 -->\n' +
                    '            <span class="row" style="font-size: 20px; color: red;"> ¥' + data.merchandise.merchandisePrice + '</span>\n' +
                    '            <!-- 商品参数 -->\n' +
                    '            <span class="row" style="font-size: 15px;">宝贝参数：</span>\n' +
                    '            <span style="font-size: 12px; white-space: pre; margin-top: 0; padding: 0;">\n' +
                    '' + data.merchandise.merchandiseParameter + '\n' +
                    '           </span>\n' +
                    '\n' +
                    '            <!-- 选择商品规格 -->\n' +
                    '            <div class="col-xs-8">\n' +
                    '                <!-- 选择商品规格 -->\n' +
                    '                <div class="row" style="line-height:10px; height: 20px; margin-top: 20px">\n' +
                    '                    <span>商品规格：' + data.merchandise.merchandiseSpecifications + '</span>\n' +
                    '                </div>\n' +
                    '\n' +
                    '                <!-- 选择商品数量 -->\n' +
                    '                <div class="row" style="line-height:10px;">\n' +
                    '                    <span>库存：' + data.merchandise.merchandiseQuantity + '件</span>\n' +
                    '                </div>\n' +
                    '            </div>' +
                    '\n' +
                    '            <!-- 选择商品数量 -->\n' +
                    '            <div class="col-xs-4" style="margin: 20px 20px 0 0;">\n' +
                    '                <label>商品数量</label>\n' +
                    '                <input type="number" placeholder="输入商品数量" value="1" min="1"\n' +
                    '                       style="width: 50px; height: 30px;.">\n' +
                    '            </div>\n' +
                    '\n' +
                    '            <!-- 编辑/删除 -->\n' +
                    '            <div class="col-xs-5 navbar-right" style="margin: 10px auto; padding: 0;">\n' +
                    '                <a class="col-xs-6 btn editMyMerchandise" merchandiseId="'+data.merchandise.merchandiseId+'" href="/html/store/editMyMerchandise.html?merchandiseId='+data.merchandise.merchandiseId+'" \n' +
                    '                     style="padding: 10px 0 0 0; border: solid 1px #d43f3a; border-radius: 5px; background-color: #edbc3b">\n' +
                    '                    <span class="glyphicon glyphicon-edit"\n' +
                    '                          style="padding: 3px;"></span>\n' +
                    '                    <span style="color: black; font-size: 15px">编辑宝贝</span>\n' +
                    '                </a>\n' +
                    '                <a class="col-xs-6 btn deleteMyMerchandise" merchandiseId="'+data.merchandise.merchandiseId+'"\n' +
                    '                     style="padding: 10px 0 0 0; border: solid 1px #d43f3a; border-radius: 5px;  background-color: #ed3a93">\n' +
                    '                    <span class="glyphicon glyphicon-trash"\n' +
                    '                          style="padding: 3px;"></span>\n' +
                    '                    <span style="color: black; font-size: 15px">下架宝贝</span>\n' +
                    '                </a>\n' +
                    '            </div>\n' +
                    '\n' +
                    '        </div>\n' +
                    '    </div>';
                if (data.appraises.length == 0) {
                    swiperHtml += '<!-- 用户评价 -->\n' +
                        '    <div class="row">\n' +
                        '        <div class="row">' +
                        '           <span style="margin: 20px; margin-left: 40px; align-content: center">暂无任何商品评论~</span>';
                } else {
                    swiperHtml += '<!-- 用户评价 -->\n' +
                        '    <div class="row">\n' +
                        '        <div class="row">\n' +
                        '            <hr style="margin: 20px"/>\n' +
                        '            <div class="btn-group col-xs-4" role="group" aria-label="..." id="appraiseBtn" style="margin-left: 10px">\n' +
                        '                <button type="button" class="btn btn-default" value="allAppraise" style="margin-right: 10px; margin-left: 5px; font-size: 5px">全部</button>\n' +
                        '                <button type="button" class="btn btn-default" value="goodAppraise" style="margin-right: 10px; font-size: 5px">好评</button>\n' +
                        '                <button type="button" class="btn btn-default" value="badAppraise" style=" font-size: 5px">差评</button>\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="row" id="merchandiseAppraise" style="margin-left: 10px;margin-top: 5px;">';
                    for (var i = 0; i < data.appraises.length; i++) {
                        swiperHtml += '<span style="margin-left: 5px;font-size: 8px">' + data.appraises[i].order.user.userName + '</span>\n' +
                            '            <span style="font-size: 5px">' + data.appraises[i].order.orderTime + ' ' + data.appraises[i].order.merchandiseSpecifications + ' 评价：' + data.appraises[i].appraiseStart + '星</span>\n' +
                            '            <p style="margin-left: 10px; margin-right: 20px; padding: 8px; font-size: 5px; border: solid 1px #8c8c8c; border-radius: 2px">' + data.appraises[i].apprise + '</p>';
                    }
                }

                swiperHtml += '</div>\n' +
                    '    </div>';

                $(".container").html(swiperHtml);

                // 下架商品
                $(".merchandise").on('click', '.deleteMyMerchandise', function () {
                    var merchandiseId = $(this).attr("merchandiseId");
                    if(confirm("您确定要下架这个宝贝吗?")) {
                        $.ajax({
                            url: "/merchandise/deleteMyMerchandise",
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
                                    location.href = "/html/store/myStore.html";
                                }
                                else {
                                    window.location.reload();
                                }
                            }
                        });
                    };
                })

            }
            else {
                alert(data.msg);
            }

    });




})
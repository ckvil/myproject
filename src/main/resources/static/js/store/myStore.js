$(function (){

    $.ajax({
        url: '/store/myStore',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            var swiperHtml='';
            if (data.success) {
                swiperHtml+='<div class="row">\n' +
                    '            <div class="row">\n' +
                    '                <div class="col-xs-10"><img src="'+data.store.storeImage+'" style="height: 50px; ">\n' +
                    '                    <span id="storeName">'+data.store.storeName+'</span>\n' +
                    '                    <a class="btn" id="addMerchandise" target="right" href="/html/merchandise/addMerchandise.html?storeId='+data.store.storeId+'"> 添加商品 </a>\n' +
                    '                    <a class="btn" id="allOrder" target="right" href="/html/order/myStoreOrder.html?storeId='+data.store.storeId+'"> 所有订单 </a>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="row">\n' +
                    '                <span id="merchandiseQuantity"> 共有 '+data.merchandiseCount+' 件宝贝 </span>\n' +
                    '                <span id="saleQuantity"> 已售出 '+data.store.saleQuantity+' 件宝贝 </span>\n' +
                    '                <span id="credit"> '+data.store.credit+'</span>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    <div class="row">';
                for (var i=0;i<data.merchandiseCount;i++){
                    swiperHtml+='<div class="btn btn-default col-xs-2 merchandise"\n' +
                        '             style="background-color: #f4f4f4; border-radius: 5px; margin: 10px; padding: 0; height: 180px">\n' +
                        '            <div style="position:relative; width: 100%; height: 125px; margin-bottom: 10px;">\n' +
                        '                <a target="right" href="/html/store/myMerchandiseParticular.html?merchandiseId=' + data.store.merchandises[i].merchandiseId + '"><img src="'+data.store.merchandises[i].merchandiseMainImage+'" class="row img-rounded"\n' +
                        '                     style="position:relative; height: 100%;">' +
                        '                </a>\n' +
                        '            </div>\n' +
                        '            <div class="col-xs-9" style="padding: 0; margin: 0">\n' +
                        '                <a class="col-xs-10" target="right" href="/html/store/myMerchandiseParticular.html?merchandiseId=' + data.store.merchandises[i].merchandiseId + '"\n' +
                        '                   style=" float: left; display:-webkit-box; height: 40px; white-space: normal; overflow:hidden;text-overflow: ellipsis; padding: 0; ">\n' +
                        '                    <span style="font-size: 8px;">'+data.store.merchandises[i].merchandiseName+'</span>\n' +
                        '                    <span style="font-size: 4px; color: #3c3c3c">'+data.store.merchandises[i].merchandiseIntroduce+'</span>\n' +
                        '                </a>\n' +
                        '                <span style="font-size: 20px; color: red; position:relative;top: -13px">¥'+data.store.merchandises[i].merchandisePrice+'</span>\n' +
                        '            </div>\n'
                    if (data.store.merchandises[i].merchandiseQuantity !=0 && data.store.merchandises[i].merchandiseQuantity !=null){
                        swiperHtml+='<div class="col-xs-3" style="margin: auto; padding: 0; ">\n' +
                            '                <a class="col-xs-6 btn editMyMerchandise" merchandiseId="' + data.store.merchandises[i].merchandiseId + '"  href="/html/store/editMyMerchandise.html?merchandiseId='+data.store.merchandises[i].merchandiseId+'" style="margin: 10px 0 0 0; padding: 0; ">\n' +
                            '                    <span class="glyphicon glyphicon-edit" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%;"></span>\n' +
                            '                </a>\n' +
                            '                <a class="col-xs-6 btn deleteMyMerchandise" merchandiseId="' + data.store.merchandises[i].merchandiseId + '" style="margin: 10px 0 0 0; padding: 0; ">\n' +
                            '                    <span class="glyphicon glyphicon-trash" style="padding: 3px; border: solid 1px #5a5a5a; border-radius: 100%;"></span>\n' +
                            '                </a>\n' +
                            '        </div>';
                    }
                    else {
                        swiperHtml+='<div class="col-xs-3" style="margin: 8px 0 0 0; padding: 0; font-size: 8px;">\n' +
                            '                <span class="row" style="margin: 0; padding: 0;">商品售罄</span>\n' +
                            '                <a class="row editMyMerchandise" merchandiseId="' + data.store.merchandises[i].merchandiseId + '" href="/html/store/editMyMerchandise.html?merchandiseId='+data.store.merchandises[i].merchandiseId+'" style="margin: 0; padding: 0;">\n' +
                            '                    <span>重新上架</span>\n' +
                            '                </a>\n' +
                            '        </div>';
                    }
                    swiperHtml+='</div>\n';
                }
                swiperHtml+='</div>';

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
                                window.location.reload();
                            }
                        });
                    };
                })

            } else {
                if (data.open){
                    swiperHtml+='<p>'+data.msg+'</p>\n' +
                        '        <a href="/html/store/openStore.html" target="right" style="color: red; font-size: 8px; ">我要开店</a>';
                }
                else {
                    swiperHtml+='<p>'+data.msg+'</p>';
                }
                $(".container").html(swiperHtml);
            }


        }
    });


})
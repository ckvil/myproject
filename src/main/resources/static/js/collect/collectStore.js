$(function () {

    $.ajax({
        url: '/collect/collectStores',
        async: false,
        cache: false,
        type: "post",
        dataType: 'json',
        success: function (data) {
            var swiperHtml = '';
            if (data.success) {
                swiperHtml += '<div class="col-xs-11">\n' +
                    '            <table class="table">\n' +
                    '                <tr id="tabtop">\n' +
                    '                    <td colspan="2">\n' +
                    '                        <span>店铺简介</span>\n' +
                    '                    </td>\n' +
                    '                    <td>\n' +
                    '                        <span>粉丝数量</span>\n' +
                    '                    </td>\n' +
                    '                    <td>\n' +
                    '                        <span>信誉度</span>\n' +
                    '                    </td>\n' +
                    '                    <td>\n' +
                    '                        <span>操作</span>\n' +
                    '                    </td>\n' +
                    '                </tr>';
                for (var i = 0; i < data.collectStores[0].collectStores.length; i++) {
                    swiperHtml += '<tr>\n' +
                        '                    <td class="storeImage">\n' +
                        '                        <img class="img-rounded" src="' + data.collectStores[0].collectStores[i].store.storeImage + '">\n' +
                        '                    </td>\n' +
                        '                    <td class="storeName">\n' +
                        '                        <p> ' + data.collectStores[0].collectStores[i].store.storeName + ' </p>\n' +
                        '                        <p><a href="/html/store/storeParticular.html?storeId=' + data.collectStores[0].collectStores[i].store.storeId + ' " target="right"> 进入店铺 </a></p>\n' +
                        '                    </td>\n' +
                        '                    <td class="fensQuantity">\n' +
                        '                        <span class="row">' + data.collectStores[0].collectStores[i].store.fans + '</span>\n' +
                        '                    </td>\n' +
                        '                    <td class="creditworthiness">\n' +
                        '                        <span class="row">' + data.collectStores[0].collectStores[i].store.credit + '</span>\n' +
                        '                    </td>\n' +
                        '\n' +
                        '                    <td class="collectOpera">\n' +
                        '                        <div class="row">\n' +
                        '                            <p><a class="deleteCollectStore" href="" target="right" storeId="' + data.collectStores[0].collectStores[i].store.storeId + '" collectId="' + data.collectStores[0].collectStores[i].collectId + '" >删除</a></p>\n' +
                        '                            <p><a class="similarStore" href="" target="right" storeId="' + data.collectStores[0].collectStores[i].store.storeId + '" collectId="' + data.collectStores[0].collectStores[i].collectId + '">相似店铺</a></p>\n' +
                        '                        </div>\n' +
                        '                    </td>\n' +
                        '                </tr>';
                }
                swiperHtml += '</table>\n' +
                    '        </div>';

            } else {
                swiperHtml += '<p>' + data.msg + '</p>';
            }
            $(".container").html(swiperHtml);

            $(".collectOpera").on("click", ".deleteCollectStore", function () {
                var storeId=$(this).attr("storeId");
                $.ajax({
                    url: '/collect/cancelCollectStore',
                    async: false,
                    cache: false,
                    type: "post",
                    dataType: 'json',
                    data: {
                        storeId: storeId,
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
        }


    });


})
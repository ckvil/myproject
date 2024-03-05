$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?");

    var orderIds = args[1].split("&");

    $(".container").on("click", "#submit", function () {
        var payMethod = $("#payMethod input[name='paymentMethod']:checked").val();

        if (payMethod != null && payMethod != '') {
            for (var i=0;i<orderIds.length;i++){
                $.ajax({
                    url: '/order/payment',
                    async: false,
                    cache: false,
                    type: "post",
                    dataType: 'json',
                    data: {
                        orderId: orderIds[i].split("=")[1],
                    },
                    success: function (data) {
                        if (data.success){
                            location.href = "/html/order/myOrder.html";
                        }
                    }

                })
            }

        }


    })

})
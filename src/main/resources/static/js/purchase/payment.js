$(function () {

    var url = decodeURI(window.location.href);

    var args = url.split("?orderId=");

    var orderId = args[1];

    $(".container").on("click", "#submit", function () {
        var payMethod = $("#payMethod input[name='paymentMethod']:checked").val();

        if (payMethod != null && payMethod != '') {
            $.ajax({
                url: '/order/payment',
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    orderId: orderId,
                },
                success: function (data) {
                    alert(data.msg);
                    if (data.success){
                        location.href = "/html/order/myOrder.html";
                    }
                }

            })
        }


    })

})
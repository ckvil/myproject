$(function (){

    var btnValue="recommendMerchandise";

    $("#leftnav").on("click","h5 a, ul li a",function (){
        btnValue=$(this).attr("value");
    })


})
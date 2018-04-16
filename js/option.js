define(["jquery"], function($){
    function option(){
        $("main2 .title button").click(function(){
            // $(".main2 .title button").attr("id", "");
            // $(this).attr("id", "active");
            alert(this);
            $("#div1").find("div").css("display", "none");
            $("#div1").find("div").eq($(this).index()).css("display", "block");

            $(".goods_1 img").attr("src", "")

        })
    }
    exports.option = option;
})
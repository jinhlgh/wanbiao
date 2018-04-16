define(["jquery", "jquery-cookie"], function ($, require) {
    var product = function () {
        console.log("商品详情页");
        $(function(){
            // alert(1);
            $.ajax({
                url: "data/product.json",
                type: "GET",
                success: function(data){
                    // alert(data[1].watch2[0].subtitle);
                    var zoom = "";
                    var zoom1 = "";
                    
                    $(".product_banner img").attr("src", data[0].banner);
                    for(var i = 0; i < data[1].zoom.length; i++){
                        zoom += '<li class=""><img src="' + data[1].zoom[i].zoom1 + '"alt=""></li>';
                        zoom1 += '<img src="' + data[1].zoom[i].zoom1 + '"alt="">';
                    }
                    $(".header_left_bottom").html('<img src="images/icon-a-g-left02.png" alt="">' + zoom + '<img src="images/icon-a-g-right02.png" alt="">');
                    $(".header_left_zoom").html(zoom1);

                    //右侧数据
                    $(".main_header_right").html('<dt>' + data[1].watch2[0].subtitle + '</dt><dd>' + data[1].watch2[1].banner + '</dd><dd><span>' + data[1].watch2[2].model + '</span><span>' + data[1].watch2[3].number + '</span><span>' + data[1].watch2[3].number + '</span><span>' + data[1].watch2[4].brand + '</span><span>' + data[1].watch2[5].sales + '</span></dd><dd><p><span>' + data[1].watch2[6].watchPrice + '</span><span>' + data[1].watch2[7].price + '</span><span>' + data[1].watch2[8].del + '</span></p><p><span>' + data[1].watch2[9].stages + '</span><span>' + data[1].watch2[10].stagesText + '</span></p><p><span>' + data[1].watch2[11].ticket + '</span><span>' + data[1].watch2[12].coupon + '</span><span>' + data[1].watch2[13].more + '</span></p></dd><dd><span>' + data[1].watch2[14].send + '</span><span>' + data[1].watch2[15].sendTo + '</span></dd><dd><span>' + data[1].watch2[16].style + '</span><p><span></span><img src="' + data[1].watch2[17].sImg + '"><span>' + data[1].watch2[18].content + '</span></p></dd><dd><span>' + data[1].watch2[19].count + '</span><button>-</button><input type="text" value="1"><button>+</button></dd><dd><button>立即购买</button><button>加入购物车</button></dd>');
                    
                    // alert(data[1].pic[1].pic);
                    var pic = "";
                    for(var i = 0; i < data[1].pic.length; i++){
                        pic += '<li><img src="' + data[1].pic[i].pic + '" alt=""></li>'
                    }
                    $(".content_right_pic").html(pic);
                }
            })

            //选项卡
            
            $(".header_left_bottom").on("mouseover", "li", function(){
                $(".header_left_bottom li").css("opacity", ".5");
                $(this).css("opacity", "1");
                
                // alert($(this).index());
                $(".header_left_zoom img").css("display", "none");
                $(".header_left_zoom img").eq($(this).index() - 1).css("display", "block");
            })


            //放大镜
            var oS_box = $(".header_left_zoom");
            $(".main_header_left").on("mouseover", "div", function(){
                $(this).find("img").css({ "width": 960, "height": 960 });
            })
            $(".main_header_left").on("mouseout", "div", function(){
                $(this).find("img").css({ "width": 480, "height": 480, "left": 0, "top": 0});
            })
            $(".main_header_left").on("mousemove", "div", function(ev){
                var e = ev || window.event;
                var left = e.offsetX;
                $(this).find("img").css("left", -left / 2);

                var top = e.offsetY;
                $(this).find("img").css("top", -top / 2);
            })


            
            //购物车hide
            $("header").on("click", ".cart_hide", function () {
                $(".sc_hide").slideDown();
                $(".float_panel").css("right", "260px");
            })
            $("header").on("click", ".close", function(){
                $(".sc_hide").slideUp();
                $(".float_panel").css("right", "0")
            })
            
        })
    }
    return {
        product: product
    }
})
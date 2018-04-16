define(["jquery", "jquery-cookie"], function($, require){
    var index = function(){
        console.log("首页");

        $(function(){
            $.ajax({
                url: "data/data.json",
                type: "GET",
                success: function(data){
                    var subNav = "";
                    var subNav2 = "";
                    var subNav3 = "";
                    var subNav4 = "";
                    var subNav5 = "";
                    var subNav6 = "";
                    var recom = "";
                    var recom2 = "";
                    var recom3 = "";
                    var recom4 = "";
                    var recom5 = "";
                    var goods1 = "";
                    
                    
                    // for(var i = 0; i < data[0].nav.length; i++){
                    //     $(".topTitle a").eq(i).text(data[0].nav[i].title);   
                    // }

                    //导航栏各一个变色
                    // $(".subnav dd:odd").css("background", "#332424");
                    // $(".subnav dd:even").css("background", "#402d2d");
                    
                    
                    

                    //顶级品牌
                    for(var i = 0; i < data[1].subtitle.length; i++){
                        subNav += '<li><a href="#"><img src="'+data[1].subtitle[i].img+'" alt=""><p>'+data[1].subtitle[i].title+'</p></a></li>';
                    }
                    $(".childNav ul").html(subNav);
                    
                    //顶级品牌 推荐品牌
                    for(var i = 0; i < data[2].recommend.length; i++){
                        recom += '<a href="#">'+data[2].recommend[i].title+'</a>';
                    }
                    $(".childNav .recom").html(recom);
                    
                    //奢华品牌
                    for(var i = 0; i < data[3].subtitle.length; i++){
                        subNav2 += '<li><a href="#"><img src="' + data[3].subtitle[i].img + '" alt=""><p>' + data[3].subtitle[i].title + '</p></a></li>';
                    }
                    $(".childNav2 ul").html(subNav2);
                    
                    //奢华品牌 推荐品牌
                    for (var i = 0; i < data[4].recommend.length; i++) {
                        recom2 += '<a href="#">' + data[4].recommend[i].title + '</a>';
                    }
                    $(".childNav2 .recom").html(recom2);

                    //轻奢品牌
                    for (var i = 0; i < data[5].subtitle.length; i++) {
                        subNav3 += '<li><a href="#"><img src="' + data[5].subtitle[i].img + '" alt=""><p>' + data[5].subtitle[i].title + '</p></a></li>';
                    }
                    $(".childNav3 ul").html(subNav3);
                    //轻奢品牌 推荐品牌
                    for (var i = 0; i < data[6].recommend.length; i++) {
                        recom3 += '<a href="#">' + data[6].recommend[i].title + '</a>';
                    }
                    $(".childNav3 .recom").html(recom3);

                    //时尚潮牌
                    for (var i = 0; i < data[7].subtitle.length; i++) {
                        subNav4 += '<li><a href="#"><img src="' + data[7].subtitle[i].img + '" alt=""><p>' + data[7].subtitle[i].title + '</p></a></li>';
                    }
                    $(".childNav4 ul").html(subNav4);
                    //时尚潮牌 推荐品牌
                    for (var i = 0; i < data[8].recommend.length; i++) {
                        recom4 += '<a href="#">' + data[8].recommend[i].title + '</a>';
                    }
                    $(".childNav4 .recom").html(recom4);

                    //智能 国产
                    for (var i = 0; i < data[9].subtitle.length; i++) {
                        subNav5 += '<li><a href="#"><img src="' + data[9].subtitle[i].img + '" alt=""><p>' + data[9].subtitle[i].title + '</p></a></li>';
                    }
                    $(".childNav5 ul").html(subNav5);

                    //智能 国产 推荐品牌
                    for (var i = 0; i < data[10].recommend.length; i++) {
                        recom5 += '<a href="#">' + data[10].recommend[i].title + '</a>';
                    }
                    $(".childNav5 .recom").html(recom5);
                    //表带
                    for (var i = 0; i < data[11].subtitle.length; i++) {
                        subNav6 += '<li><a href="#"><img src="' + data[11].subtitle[i].img + '" alt=""><p>' + data[11].subtitle[i].title + '</p></a></li>';
                    }
                    $(".childNav6 ul").html(subNav6);

                    //商品
                    for(var i = 0; i < data[12].goods.length; i++){
                        goods1 += '<li><img src='+ data[12].goods[i].img + '><p class="p1">'+ data[12].goods[i].title +'</p><p class="p2">' + data[12].goods[i].price +'</p></li>';
                    }
                    $(".main3 ul a").html(goods1);
                    $(".content_one_watch ul a").html(goods1);
                    $(".more ul a").html(goods1);
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
            })
            

            //效果
            

            //轮播图

                var aBtns = $(".buttons button");
                var oUl = $(".slide_show ul");
                var aLis = $(".slide_show ul li");
                var iNow = 0;
                var timer = null;
                aBtns.click(function(){
                    iNow = $(this).index();
                    tab();
                })
            
            timer = setInterval(timerInner, 3000);

            function tab(){
                aBtns.attr("id", "");
                aBtns.eq(iNow).attr("id", "button_active");
                oUl.animate({left: -1500 * iNow}, 600   , function(){
                    if(iNow == 6){
                        oUl.css("left", 0);
                        iNow = 0;
                    }
                })
            }

            function timerInner() {
                iNow++;
                tab();
                if(iNow == 6) {
                    aBtns.eq(0).attr("id", "button_active");
                }
            }
            
            oUl.hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(timerInner, 2000);
            })

            //广告
            $(".icon").click(function(){
                $(".top_banner").css("display", "none");
            })
            
            //二级导航
            $(".detail_subnav").hover(function(){
                $(this).find("dd").slideDown();
            }, function(){
                $(this).find("dd").slideUp();
            })

            

            // $(".red_border").hover(function(){
            //     $(this).find(".red_hide").slideDown(200);
            // }, function(){
            //     $(this).find(".red_hide").slideUp(200);
            // })
            

            // $(".service_line").hover(function () {
            //     $(this).find(".service_line_hide").slideDown(200);
            // }, function () {
            //     $(this).find(".service_line_hide").slideUp(200);
            // })
           //三级导航
            var subDD = $(".subnav dd");
            for(var i = 0; i < 6; i++){
                subDD.eq(i).hover(function(){
                    $(this).find("div").css("display", "block");
                    $(".super_mask").css("display", "block");
                }, function(){
                    $(this).find("div").css("display", "none");
                    $(".super_mask").css("display", "none");
                })
            }

            //选项卡
            (function(){
                $(".main2 .title button").click(function(){
                    $(".main2 .title button").attr("id", "");
                    $(this).attr("id", "active");

                    $(".goods .goods_2").css("display", "none");
                    $(".goods .goods_2").eq($(this).index()).css("display", "block");
                })
            }());

            (function(){
                $(".option button").click(function(){
                    $(".option button").attr("id", "");
                    $(this).attr("id", "active");

                    $("option ul").css("display", "none");
                    $("option ul").eq($(this).index()).css("display", "block");
                })
            })();
            // 二维码2
            $(".praise a img").click(function(){
                $(".code2").css("display", "block");
            })

            $(".praise i").click(function(){
                $(".code2").css("display", "none");
            })

            //footer二维码  选项卡

            
            $(".screen").hover(function(){
                $(".screen").attr("id", "");
                $(this).attr("id", "border");

                $(".code1_hide").css("display", "none");
                $(".code1_hide").eq($(this).index()).css("display", "block");
            })

            $(".screen2").hover(function () {
                $(".screen2").attr("id", "");
                $(this).attr("id", "border");

                $(".code2_hide").css("display", "none");
                $(".code2_hide").eq($(this).index()).css("display", "block");
            })

            $(".red_hide span").hover(function(){
                $(".red_hide span").attr("id", "");
                $(this).attr("id", "red_active");

                $(".red_hide img").css("display", "none");
                $(".red_hide img").eq($(this).index()).css("display", "block");
            })

            $(".float_panel li").hover(function(){
                $(this).find(".float_panel_hide").fadeIn();
                $(this).css("background", "#f1f1f1");
            }, function(){
                $(this).find(".float_panel_hide").fadeOut();
                $(this).css("background", "#fff");
            })
            
            //锚点滑动效果
            $("#green, #main2, #banner3, #content1, #content2, #content3, #float_anchor").click(function () {
                $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top + "px" }, 500);
                return false;//不要这句会有点卡顿
            });

            //浮动广告
            $(document).scroll(function(){
                // alert($(document).scrollTop());
                if($(document).scrollTop() >= 900){
                    $(".float_panel_left").slideDown();
                }else{
                    $(".float_panel_left").slideUp();
                }
            })

            $(".customer_service").hover(function(){
                $(".customer_service_hide").fadeIn();
            }, function(){
                $(".customer_service_hide").fadeOut();
            })
            // if($(document).scrollTop() == 1000){
            //     
            // }
        })
    }
   return {
		index: index
	}
})
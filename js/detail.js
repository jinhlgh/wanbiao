define(["jquery", "jquery-cookie"], function($, require){
    var detail = function(){
        console.log("详情页");
        $(function(){
            //点击
            $(".toggle").click(function(){
                if ($(this).find("span").text() == "更多选项(表盘、表带、功能、防水等)"){
                    $(".search_right_hide").css("display", "block");
                    $(".search_left_hide").css("display", "block");
                    // $(this).removeClass(".search_toggle");
                    $(this).attr("class", "");
                    $(this).attr("class", "search_toggle_hide");
                    $(this).find("span").html("收起")
                }else{
                    $(".search_right_hide").css("display", "none");
                    $(".search_left_hide").css("display", "none");
                    // $(this).removeClass(".search_toggle");
                    $(this).attr("class", "");
                    $(this).attr("class", "search_toggle");
                    $(this).find("span").html("更多选项(表盘、表带、功能、防水等)")
                }
            })

            $(".search_right button").click(function(){
                // alert($(this).parent().index());
                if (!($(this).attr("class") == "button_hide")){
                    $(this).attr("class", "button_hide");
                    $(this).next().css("display", "block");

                    //判断search_left 的高度
                    if ($(this).parent().index() == 0 || $(this).parent().index() == 3
                        || $(this).parent().index() == 10){
                        $(".search_left li").eq($(this).parent().index() + 5).css("height", "120px");
                    }
                    if($(this).parent().index() == 2 || $(this).parent().index() == 6
                        || $(this).parent().index() == 8 || $(this).parent().index() == 11
                        || $(this).parent().index() == 13){
                        $(".search_left li").eq($(this).parent().index() + 5).css("height", "80px");
                    }
                }else{
                    $(this).attr("class", "");
                    $(this).next().css("display", "none");
                }
            })

            //轮播图
            var aBtns = $(".detail_main_left").find("button");
            var oUl = $(".detail_main_left_slide");
            var aLis = $(".detail_main_left_slide li");
            var iNow = 0;
            var timer = null;
            aBtns.click(function () {
                iNow = $(this).index() - 1;
                tab();
            })

            timer = setInterval(timerInner, 2000);
            function tab() {
                aBtns.removeClass("detail_slide_active").eq(iNow).addClass("detail_slide_active");
                if (iNow >= 4) {
                    aBtns.eq(0).addClass("detail_slide_active");
                }
                //ul动
                oUl.animate({
                    left: -210 * iNow
                }, 1000, function () {
                    if (iNow >= 4) {
                        
                        oUl.css("left", 0)
                        iNow = 0;
                    }
                })
            }

            function timerInner() {
                iNow++;
                tab();
                if (iNow == 4) {
                    aBtns.eq(0).attr("class", "detail_slide_active");
                }
            }
            
            
            $(".detail_main_left_slide").hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(timerInner, 2000);
            })

            //购物车
            sc_car();

            $(".detail_main_right").on("click", ".cart", function () {
                // alert(this.id);
                //是否是第一次添加cookie
                var id = this.id;
                var first = $.cookie("goods") == null ? true : false;
                if (first) {
                    //第一次添加  [{id:id,num:2}]
                    $.cookie("goods", '[{id:' + id + ',num:1}]', {
                        expires: 7
                    });
                } else {
                    var str = $.cookie("goods");
                    var arr = eval(str);
                    var same = false; //代表是否有相同商品

                    //遍历所有的对象，判断是否id相同，num++
                    for (var i in arr) {
                        if (arr[i].id == id) {
                            arr[i].num = arr[i].num + 1;
                            var cookieStr = JSON.stringify(arr);
                            $.cookie("goods", cookieStr, {
                                expires: 7
                            });
                            same = true;
                            break;
                        }
                    }

                    //没有相同的商品
                    if (!same) {
                        var obj = { id: id, num: 1 };
                        arr.push(obj);
                        var cookieStr = JSON.stringify(arr);
                        $.cookie("goods", cookieStr, {
                            expires: 7
                        });
                    }
                }
                sc_car();

                // alert($.cookie("goods"));


                return false;
            })

            /*
                mouseenter  移入
                mouseleave  移出
            */
            $(".cart").mouseenter(function () {
                $(this).stop().animate({
                    right: 0
                })
                sc_msg();
            });
            $(".cart").mouseleave(function () {
                $(this).stop().animate({
                    right: -270
                })
            });

            //购物车数字
            function sc_car() {
                var sc_str = $.cookie("goods");
                if (sc_str) { //判断字符串是否存在
                    var sc_arr = eval(sc_str);
                    var sc_num = 0;
                    for (var i in sc_arr) {
                        sc_num = Number(sc_arr[i].num) + sc_num;
                    }
                    $(".sc_num").html(sc_num);
                }
            }

            // 已经存储在cookie数据进行加载
            function sc_msg() {
                $.ajax({
                    url: "data/detail_goods.json",
                    type: "get",
                    success: function (res) {
                        var sc_arr = eval($.cookie("goods"));
                        var html = '';
                        for (var i in sc_arr) {
                            html += '<li><div class="sc_goodsPic"><img src="' + res[0].goods[i].img+ '" alt=""></div><div class="sc_goodsTitle"><p>这是商品曲奇饼干</p></div><div class="sc_goodsBtn" id="' + sc_arr[i].id + '">购买</div><div class="sc_goodsNum">商品数量:' + sc_arr[i].num + '</div></li>';
                        }
                        $(".sc_right ul").html(html);
                    }
                })
            }


            //ajax
            $.ajax({
                url: "data/detail_goods.json",
                type: "GET",
                success: function(data){
                    // alert(data[0].goods[0].img);
                    var goods = "";
                    for(var i = 0; i < data[0].goods.length; i++){
                        goods += '<li><a href="product.html"><img src="' + data[0].goods[i].img + '"></a><div class="right_goods_box_text"><div class="goods_box_price cl"><span> ' + data[0].goods[i].price + '</span><span>' + data[0].goods[i].sales + '</span></div><p><a href="#">' + data[0].goods[i].title + '</a></p></div><div class="goods_box_store"><a href="#"><i></i><span class="goods_box_store_span">顶级专营店</span></a><p><span>自营</span></p><a href="#">加入收藏</a><a id="cart" class="cart" href="#javascript:void(0)">加入购物车</a></div></li>'; 
                    }
                    $(".right_goods_box").html(goods + goods + goods + goods);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 状态码
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息   
                    console.log(textStatus);
                }
            })     
            
            // $(".right_goods_box cl li:eq(0) a").attr("href", "product.html"); 
            $(".right_goods_box").on("click", "li:eq(0) img", function(){
                // alert($(".right_goods_box li:eq(0) a").attr("href", "product.html")); 
            })  
            // $(".right_goods_box cl li:eq(0) img").click(function(){
            //     alert(1);
            // })
        })
    }
    return {
        detail: detail
    }
})
define(["jquery", "jquery-cookie"], function($, require){
    var login = function(){
        console.log("登陆");

        $(function(){

            $(".login_header_code_hide img").hover(function(){
                $(".login_header_code_hide img:eq(0)").animate({left: -80}, 600);
                $(".login_header_code_hide img:eq(1)").animate({ opacity: 1 }, 600);
            }, function(){
                $(".login_header_code_hide img:eq(0)").animate({ left: 0 }, 600);
                $(".login_header_code_hide img:eq(1)").animate({ opacity: 0 }, 600);
            })
            //选项卡
            $(".login_header_code span").click(function(){
                $(".login_header_code span").attr("id", "");
                $(this).attr("id", "code_active");

                $(".login_header_code_hide").css("display", "none");
                $(".login_header_code_hide").eq($(this).index()).css("display", "block");
            })

            //验证码
            
            

            //验证
            var phone = $(".login_header_code_hide input:eq(0)");
            var pic = $(".login_header_code_hide_box input");
            var message = $(".login_header_code_hide input:eq(1)");


            //判断手机号
            phone.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;
                

                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!oValue) {
                    phone.next().text("手机号不能为空");
                    phone.css("borderColor", "#cc5252");
                }else if(!myreg.test(oValue)){
                    phone.next().text("请输入正确的手机号");
                    phone.css("borderColor", "#cc5252");
                }else{
                    phone.next().text("");
                    phone.css("borderColor", "#ddd");
                }
            })

            var CAPTCHA = Math.random().toString(30).substring(9);
            $(".login_captcha").html(CAPTCHA);
            //判断图形验证码
            pic.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;

                var loginCaptcha = $(".login_captcha").text();
                
                if(!oValue){
                    
                    pic.next().text("验证码不能为空");
                    pic.css("borderColor", "#cc5252");
                } else if (!(oValue == loginCaptcha)){
                    pic.next().text("请输入正确的验证码")
                    pic.css("borderColor", "#cc5252");
                }else{
                    pic.next().text("")
                    pic.css("borderColor", "#ddd");
                }
            })
        })
    }
    return {
        login: login
    }
})
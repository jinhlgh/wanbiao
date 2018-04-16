define(["jquery", "jquery-cookie"], function ($, require) {
    var register = function(){
        console.log("注册")
        $(function(){
            // alert(1);
            
            var phone = $(".register_main_content dd:eq(0) input");
            var pic = $(".register_main_content dd:eq(1) input");
            var message = $(".register_main_content dd:eq(2) input");
            var password = $(".register_main_content dd:eq(3) input");
            var confirmPass = $(".register_main_content dd:eq(4) input");
            var hint = $(".register_main_content").find("p");

            //手机号码
            phone.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;

                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(!oValue){
                    hint.eq(0).text("请输入您的手机号")
                    hint.eq(0).css("display", "block");
                    $(".register_main_content dd:eq(0)").css("marginBottom", "0");
                }else if(!myreg.test(oValue)){
                    hint.eq(0).text("请输入正确的手机号")
                    hint.eq(0).css("display", "block");
                    $(".register_main_content dd:eq(0)").css("marginBottom", "0");
                    this.value = "";
                }else{
                    hint.eq(0).text("")
                    hint.eq(0).css("display", "none");
                    $(".register_main_content dd:eq(0)").css("marginBottom", "16px");
                }
            })

            //验证码
            var CAPTCHA = Math.random().toString(30).substring(9);
            var judge = null;
            $(".register_captcha").html(CAPTCHA);
            pic.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;

                var registerCaptcha = $(".register_captcha").html();

                if(!oValue){
                    hint.eq(1).text("请输入图形验证码");
                    hint.eq(1).css("display", "block");
                    $(".register_main_content dd:eq(1)").css("marginBottom", "0");
                } else if (!(oValue == registerCaptcha)){
                    hint.eq(1).text("请输入正确的图形验证码");
                    hint.eq(1).css("display", "block");
                    $(".register_main_content dd:eq(1)").css("marginBottom", "0");
                    judge = false;
                    this.value = "";
                }else{
                    hint.eq(1).text("");
                    hint.eq(1).css("display", "none");
                    $(".register_main_content dd:eq(1)").css("marginBottom", "16px");
                    judge = true;
                }
            })

            //短信验证码
            var CAPTCHA2 = Math.random().toString(30).substring(9);
            $(".getCaptcha").click(function(){
                if (judge){
                    alert(CAPTCHA2)
                }else{
                    hint.eq(2).text("请输入正确的图形验证码");
                    hint.eq(2).css("display", "block");
                    $(".register_main_content dd:eq(2)").css("marginBottom", "0");
                }
            })

            message.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;

                if (!oValue) {
                    hint.eq(2).text("请输入验证码");
                    hint.eq(2).css("display", "block");
                    $(".register_main_content dd:eq(2)").css("marginBottom", "0");
                } else if (!(oValue == CAPTCHA2)) {
                    hint.eq(2).text("请输入正确的验证码");
                    hint.eq(2).css("display", "block");
                    $(".register_main_content dd:eq(2)").css("marginBottom", "0");
                    this.value = "";
                } else {
                    hint.eq(2).text("");
                    hint.eq(2).css("display", "none");
                    $(".register_main_content dd:eq(2)").css("marginBottom", "16px");
                }
            })

            var passValue = null;
            //设置密码
            password.blur(function(){
                passValue = this.value.replace(/\s/g, "");
                this.value = passValue;
                var passwordJudge = /.{6,20}/;

                if (!passValue) {
                    hint.eq(3).text("请输入密码");
                    hint.eq(3).css("display", "block");
                    $(".register_main_content dd:eq(3)").css("marginBottom", "0");
                } else if (!(passwordJudge.test(passValue))) {
                    this.value = "";
                    hint.eq(3).text("密码应为6-20位任意字符组合");
                    hint.eq(3).css("display", "block");
                    $(".register_main_content dd:eq(3)").css("marginBottom", "0");
                } else {
                    hint.eq(3).text("");
                    hint.eq(3).css("display", "none");
                    $(".register_main_content dd:eq(3)").css("marginBottom", "16px");
                }
                
            })
            
            
            //确认密码
            confirmPass.blur(function(){
                var oValue = this.value.replace(/\s/g, "");
                this.value = oValue;
                // alert(passValue);
                if((oValue != passValue)){
                    hint.eq(4).text("两次密码不一致，请检查您的密码");
                    this.value = "";
                    hint.eq(4).css("display", "block");
                    $(".register_main_content dd:eq(4)").css("marginBottom", "0");
                }else{
                    hint.eq(4).text("");
                    hint.eq(4).css("display", "none");
                    $(".register_main_content dd:eq(4)").css("marginBottom", "16px");
                }
            })
        })
    }
    return {
        register: register
    }
})
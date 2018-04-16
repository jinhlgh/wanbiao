console.log("载入成功");

require.config({
    //配置模块路径
    paths: {
        jquery: "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        index: "index",
        login: "login",
        register: "register",
        detail: "detail",
        product: "product"

    },
    //设置依赖关系
    shim: { 
        "jquery-cookie": ["jquery"],
    }
})

//执行模块
require(["index"], function(index){
    index.index();
})
require(["login"], function(login){
    login.login();
})
require(["register"], function(register){
    register.register();
})
require(["detail"], function (detail) {
    detail.detail();
})
require(["product"], function (product) {
    product.product();
})
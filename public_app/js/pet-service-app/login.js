/**
 * Created by razer on 2017/8/20.
 */

$(function () {
    var loginPageObj = new LoginPageObject();
    loginPageObj.init();
});

function LoginPageObject() {



}
LoginPageObject.prototype = {

    init : function () {
        var _self = this;
        _self.login();
        _self.toRegister();
    },
    login : function () {
        $(".w-login-btn").on("tap",function () {
            $commonObj.loadAjax({
                url : $commonObj.baseUrl()+"/users/login",
                data : {
                    username : $(".w-username").val(),
                    password : $(".w-password").val()
                },
                success : function (res) {
                    if(res == "error"){
                        mui.alert("对不起，登录失败，请检查您输入的信息是否正确","提示","确认",function () {});
                    }else{
                        console.log(res);
                        sessionStorage.setItem("userid",res.id);
                        mui.toast("登录成功");
                        mui.openWindow({
                            url: "./index.html",
                            id: "index"
                        });
                    }
                }
            })
        });
    },
    toRegister : function () {
        $(".w-to-register").on("tap",function () {
            mui.openWindow({
                url: "./register.html",
                id: "register"
            });
        });
    }

};
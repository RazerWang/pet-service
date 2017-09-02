/**
 * Created by razer on 2017/8/20.
 */

$(function () {
    var registerPageObj = new RegisterPageObject();
    registerPageObj.init();
});

function RegisterPageObject() {

    this.names = ["username","password","nickname","age","sex","telphone","email"];


}
RegisterPageObject.prototype = {

    init : function () {
        var _self = this;
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        _self.register();
        _self.back();
    },
    register : function () {
        var _self = this;
        $(".w-register-btn").on("tap",function () {
            if(_self.checkForm() !== false){
                var db = $("#formsub").serialize();
                $commonObj.loadAjax({
                    url : $commonObj.baseUrl()+"/users/register",
                    data : db,
                    success : function (res) {
                        mui.toast("注册成功");
                        mui.openWindow({
                            url: "../login.html",
                            id: "login"
                        });
                    }
                })
            }

        });
    },
    checkForm : function () {
        var _self = this;
        for(var i = 0;i<_self.names.length;i++){
            var currentName = _self.names[i];
            var currentValue = $('[name = "'+currentName+'"]').val();
            if($commonObj.trim(currentValue).length === 0){
                mui.alert("注册信息请填写完整","提示","确认",function () {});
                return false;
            }
        }
    },
    back : function () {
        $(".w-back").on("tap",function () {
            window.history.back();
        });
    }


};
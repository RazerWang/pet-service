/**
 * Created by razer on 2017/5/20.
 */

$(function () {
    var myInfoPageObj = new MyInfoPageObject();
    myInfoPageObj.init();
});

function MyInfoPageObject() {
    this.userid = sessionStorage.getItem("userid");
    this.names = ["username","password","nickname","age","sex","telphone","email"];

}
MyInfoPageObject.prototype = {

    init : function () {
        var _self = this;
        _self.initData();
        _self.register();
        _self.back();
    },
    initData : function () {
        var _self = this;
        $commonObj.loadAjax({
            url : $commonObj.baseUrl()+"/users/load",
            data : {
                id : _self.userid,
            },
            success : function (res) {
                var res = JSON.parse(res);
                _self.initDataAfter(res[0]);
            }
        })
    },
    initDataAfter : function (datas) {
        $('[name="id"]').val(datas.id);
        $('[name="username"]').val(datas.username);
        $('[name="password"]').val(datas.password);
        $('[name="nickname"]').val(datas.nickname);
        $('[name="age"]').val(datas.age);
        $('[value="'+datas.sex+'"]').attr("checked",true);
        $('[name="telphone"]').val(datas.telphone);
        $('[name="email"]').val(datas.email);
    },
    register : function () {
        var _self = this;
        $(".w-update-btn").on("tap",function () {
            if(_self.checkForm() !== false){
                var btnArray = ['否', '是'];
                mui.confirm('是否修改个人信息？', '提示', btnArray, function(e){
                    if (e.index == 1){
                        var db = $("#formsub").serialize();
                        console.log(db);
                        $commonObj.loadAjax({
                            url : $commonObj.baseUrl()+"/users/update",
                            data : db,
                            success : function (res) {
                                mui.toast("修改成功");
                                mui.openWindow({
                                    url: "../../index.html?id=info",
                                    id: "index"
                                });
                            }
                        })
                    }else{
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
                mui.alert("个人信息请填写完整","提示","确认",function () {});
                return false;
            }
        }
    },
    back : function () {
        $(".w-back").on("tap",function () {
            mui.openWindow({
                url: "../../index.html?id=info",
                id: "index"
            });
        });
    }


};
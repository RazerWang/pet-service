/**
 * Created by razer on 2017/5/19.
 */


function InfoPageObject() {
    this.userid = sessionStorage.getItem("userid");

}
InfoPageObject.prototype = {

    init : function () {
        var _self = this;
        _self.getInfo();
        _self.toMyInfoAction();
        _self.logout();
    },
    getInfo : function () {
        var _self = this;
        $commonObj.loadAjax({
            url : $commonObj.baseUrl()+"/users/load",
            data : {
                id : _self.userid,
            },
            success : function (res) {
                var res = JSON.parse(res);
                _self.getInfoAfter(res[0]);
            }
        })
    },
    getInfoAfter : function (data) {
        var _self = this;
        var _parentNode = $('[w-render-name="nodeParent"]');
        $commonObj.loadSingleData({
            sourceData : data,
            dataRootNode : _parentNode,
            dataAttrName : "w-render-name",
            dataHandleFn : function () {
                var t = _parentNode.find('[w-render-name="sex"]').text();
                if(t==="man"){
                    t = "男"
                }else{
                    t = "女"
                }
                _parentNode.find('[w-render-name="sex"]').text(t);
            }

        });
    },
    toMyInfoAction : function () {
        $('.w-to-my-info').on("tap",function () {
            mui.openWindow({
                url: "./modules/views/myInfo.html",
                id: "myInfo"
            });
        });
    },
    logout : function () {
        $(".w-logout-btn").on("tap",function () {
            sessionStorage.removeItem("userid");
            mui.openWindow({
                url: "./login.html",
                id: "login"
            });
        });
    }

};
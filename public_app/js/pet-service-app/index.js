/**
 * Created by razer on 2017/8/20.
 */

$(function () {
    var indexFramePageObj = new IndexFramePageObject();
    indexFramePageObj.init();
});

function IndexFramePageObject() {

    this.names = ["home","cart","info"];

}
IndexFramePageObject.prototype = {

    init : function () {
        var _self = this;
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        _self.defaultLoadPage();
    },
    defaultLoadPage : function () {
        $commonObj.loadPage({
            container : $('[data-frame="container"]'),
            pageUrl : "./modules/home.html",
            pageScript : "./js/pet-service-app/home.js",
            onLoaded : function () {
                var homePageObj = new HomePageObject();
                homePageObj.init();
            }
        });
    }


};
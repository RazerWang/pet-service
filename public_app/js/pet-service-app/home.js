/**
 * Created by razer on 2017/8/20.
 */

$(function () {
    // var homePageObj = new HomePageObject();
    // homePageObj.init();
});

function HomePageObject() {


}
HomePageObject.prototype = {

    init : function () {
        var _self = this;
        _self.initSlide();
    },
    initSlide : function () {
        var _self = this;
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    }

};
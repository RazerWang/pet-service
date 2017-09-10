/**
 * Created by razer on 2017/5/19.
 */

function HomePageObject() {
    this.userid = sessionStorage.getItem("userid");


}
HomePageObject.prototype = {

    init : function () {
        var _self = this;
        _self.initSlide();
        _self.toOrderAction();
    },
    initSlide : function () {
        var _self = this;
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    toOrderAction : function () {
        $(".w-to-order").on("tap",function () {
            mui.openWindow({
                url: "./modules/views/order.html?itemId="+$(this).data("item"),
                id: "order"
            });
        });
    }

};
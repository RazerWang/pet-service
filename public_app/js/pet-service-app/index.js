/**
 * Created by razer on 2017/5/19.
 */

$(function () {
    var indexFramePageObj = new IndexFramePageObject();
    indexFramePageObj.init();
});

function IndexFramePageObject() {
    this.userid = sessionStorage.getItem("userid");
    this.names = ["home","cart","info"];
    this.id = $commonObj.getRequestByUrl().id;

}
IndexFramePageObject.prototype = {

    init : function () {
        var _self = this;
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });

        if(_self.id == "home"){
            _self.loadPage("home");
            $('[data-href="home"]').addClass("mui-active");
        }else if(_self.id == "cart"){
            _self.loadPage("cart");
            $('[data-href="cart"]').addClass("mui-active");
        }else if(_self.id == "info"){
            _self.loadPage("info");
            $('[data-href="info"]').addClass("mui-active");
        }else {
            _self.loadPage("home");
            $('[data-href="home"]').addClass("mui-active");
        }
        _self.tabAction();
    },
    loadPage : function (a) {
        var _self = this;
        $('[data-frame="container"]').empty();
        $commonObj.loadPage({
            container : $('[data-frame="container"]'),
            pageUrl : "./modules/"+a+".html",
            pageScript : "./js/pet-service-app/"+a+".js",
            onLoaded : function () {
                switch (a){
                    case "home":
                        var homePageObj = new HomePageObject();
                        homePageObj.init();
                        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);
                        break;
                    case "cart":
                        var cartPageObj = new CartPageObject();
                        cartPageObj.init();
                        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);
                        break;
                    case "info":
                        var infoPageObj = new InfoPageObject();
                        infoPageObj.init();
                        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);
                        break;
                    default:
                        break;
                }

            }
        });
    },
    tabAction : function () {
        var _self = this;
        $(".mui-tab-item").on("tap",function (e) {
            e.preventDefault();
            _self.loadPage($(this).data("href"));
        })
    }


};
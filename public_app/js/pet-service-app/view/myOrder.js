/**
 * Created by razer on 2017/5/21.
 */
$(function () {
    var myOrderPageObj = new MyOrderPageObject();
    myOrderPageObj.init();
});
function MyOrderPageObject() {
    this.userid = sessionStorage.getItem("userid");
    this.id = $commonObj.getRequestByUrl().id;
    this.itemId = $commonObj.getRequestByUrl().itemId;
    this.itemNum = $commonObj.getRequestByUrl().itemNum;
    this.itemState = $commonObj.getRequestByUrl().itemState;
    this.itemTime = $commonObj.getRequestByUrl().itemTime;
    this.itemsList = {
        "w_01":{
            "name" : "宠物寄养",
            "price" : 100,
            "unit" : "天",
            "icon" : "images/keep.png"
        },
        "w_02":{
            "name" : "宠物看养",
            "price" : 100,
            "unit" : "天",
            "icon" : "images/food.png"
        },
        "w_03":{
            "name" : "宠物行为纠正",
            "price" : 200,
            "unit" : "月",
            "icon" : "images/service.png"
        },
        "w_04":{
            "name" : "宠物技能训练",
            "price" : 300,
            "unit" : "月",
            "icon" : "images/play.png"
        },
        "w_05":{
            "name" : "宠物分娩护理",
            "price" : 100,
            "unit" : "次",
            "icon" : "images/other.png"
        },
        "w_06":{
            "name" : "宠物培养",
            "price" : 300,
            "unit" : "月",
            "icon" : "images/dog.png"
        },
        "w_07":{
            "name" : "宠物营养套餐",
            "price" : 10,
            "unit" : "天",
            "icon" : "serviceimg/service01.png"
        },
        "w_08":{
            "name" : "宠物常规驱虫",
            "price" : 50,
            "unit" : "次",
            "icon" : "serviceimg/service02.png"
        },
        "w_09":{
            "name" : "宠物疫苗接种",
            "price" : 80,
            "unit" : "次",
            "icon" : "serviceimg/service03.png"
        },
        "w_10":{
            "name" : "宠物疾病监测",
            "price" : 60,
            "unit" : "次",
            "icon" : "serviceimg/service04.png"
        },
        "w_11":{
            "name" : "宠物常规护理",
            "price" : 15,
            "unit" : "次",
            "icon" : "serviceimg/service05.png"
        },
        "w_12":{
            "name" : "宠物洗澡",
            "price" : 40,
            "unit" : "次",
            "icon" : "serviceimg/service06.png"
        },
        "w_13":{
            "name" : "宠物剪毛",
            "price" : 100,
            "unit" : "次",
            "icon" : "serviceimg/service07.png"
        },
        "w_14":{
            "name" : "宠物解结",
            "price" : 30,
            "unit" : "次",
            "icon" : "serviceimg/service08.png"
        },
        "w_15":{
            "name" : "宠物修甲",
            "price" : 30,
            "unit" : "次",
            "icon" : "serviceimg/service09.png"
        },
        "w_16":{
            "name" : "宠物刷牙",
            "price" : 80,
            "unit" : "次",
            "icon" : "serviceimg/service10.png"
        }
    }

}
MyOrderPageObject.prototype = {

    init : function () {
        var _self = this;
        console.log(_self.itemId);
        _self.initData();
        _self.initDom();
        _self.back();
    },
    initData : function () {
        var _self = this;
        $('[data-order="title"]').text(_self.itemsList[_self.itemId].name);
        $('[data-order="name"]').text(_self.itemsList[_self.itemId].name);
        $('[data-order="unit"]').text(_self.itemsList[_self.itemId].unit);
        $('[data-order="price"]').text(_self.itemsList[_self.itemId].price);
        $('[data-order="total"]').text(_self.itemsList[_self.itemId].price*_self.itemNum);
        $('[data-order="number"]').text(_self.itemNum);
        $('[data-order="state"]').text(decodeURI(_self.itemState));
        $(".data-date-action").val(_self.itemTime);
    },
    initDom : function () {
        var _self = this;
        if(decodeURI(_self.itemState) == "已处理"){
            $(".w-confirm-btn").show();
        }else{
            $(".w-delete-btn").show();
        }
        _self.btnAction();
    },
    btnAction : function () {
        var _self = this;
        $(".w-confirm-btn").on("tap",function () {
            var btnArray = ['否', '是'];
            mui.confirm('确认服务已经完成？', '提示', btnArray, function(e){
                if (e.index == 1){
                    $commonObj.loadAjax({
                        url : $commonObj.baseUrl()+"/shopping/delete",
                        data : {
                            id : _self.id,
                        },
                        success : function (res) {
                            mui.toast("已确认");
                            setTimeout(function () {
                                mui.openWindow({
                                    url: "../../index.html?id=cart",
                                    id: "index"
                                });
                            },200);
                        }
                    });
                }else{
                }
            })
        });
        $(".w-delete-btn").on("tap",function () {
            var btnArray = ['否', '是'];
            mui.confirm('是否确定删除？', '提示', btnArray, function(e){
                if (e.index == 1){
                    $commonObj.loadAjax({
                        url : $commonObj.baseUrl()+"/shopping/delete",
                        data : {
                            id : _self.id,
                        },
                        success : function (res) {
                            mui.toast("已删除");
                            setTimeout(function () {
                                mui.openWindow({
                                    url: "../../index.html?id=cart",
                                    id: "index"
                                });
                            },200);
                        }
                    });
                }else{
                }
            })
        });
    },
    back : function () {
        $(".w-back").on("tap",function () {
            mui.openWindow({
                url: "../../index.html?id=cart",
                id: "index"
            });
        });
    }

};
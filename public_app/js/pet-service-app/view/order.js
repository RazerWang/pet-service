/**
 * Created by razer on 2017/5/20.
 */
$(function () {
    var orderPageObj = new OrderPageObject();
    orderPageObj.init();
});
function OrderPageObject() {
    this.userid = sessionStorage.getItem("userid");
    this.itemId = $commonObj.getRequestByUrl().itemId;
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
OrderPageObject.prototype = {

    init : function () {
        var _self = this;
        console.log(_self.itemId);
        _self.initData();
        _self.numberBtnClickAction();
        _self.dateBtnClickAction();
        _self.submitOrderAction();
        _self.back();
    },
    initData : function () {
        var _self = this;
        $('[data-order="title"]').text(_self.itemsList[_self.itemId].name);
        $('[data-order="name"]').text(_self.itemsList[_self.itemId].name);
        $('[data-order="unit"]').text(_self.itemsList[_self.itemId].unit);
        $('[data-order="price"]').text(_self.itemsList[_self.itemId].price);
        $('[data-order="total"]').text(_self.itemsList[_self.itemId].price);
    },
    numberBtnClickAction : function () {
        var _self = this;
        $(".data-number-action").on("tap",function () {
            setTimeout(function () {
                var number = $('[data-order="number"]').val();
                console.log(number);
                $('[data-order="total"]').text(_self.itemsList[_self.itemId].price*$('[data-order="number"]').val());
            },100);
        });
    },
    dateBtnClickAction : function () {
        var _self = this;
        $(".data-date-action").on("tap",function () {
            var dtPicker = new mui.DtPicker({type:"date"});
            dtPicker.show(function (selectItems) {
                console.log(selectItems.y);//{text: "2016",value: 2016}
                console.log(selectItems.m);//{text: "05",value: "05"}
                console.log(selectItems.d);//{text: "05",value: "05"}
                $(".data-date-action").val(selectItems.y.text+"-"+selectItems.m.text+"-"+selectItems.d.text);
            })
        });
    },
    submitOrderAction : function () {
        var _self = this;
        $(".w-submit-action").on("tap",function () {
            var btnArray = ['否', '是'];
            mui.confirm('确认提交？', '提示', btnArray, function(e){
                if (e.index == 1){
                    $commonObj.loadAjax({
                        url : $commonObj.baseUrl()+"/shopping/in",
                        data : {
                            userid : _self.userid,
                            itemid : _self.itemId,
                            itemnum : $('[data-order="number"]').val(),
                            itime : $(".data-date-action").val()
                        },
                        success : function (res) {
                            mui.toast("提交成功");
                            setTimeout(function () {
                                mui.openWindow({
                                    url: "../../index.html?id=home",
                                    id: "index"
                                });
                            },500);
                        }
                    });
                }else{
                    // info.innerText = 'MUI没有得到你的认可，继续加油'
                }
            })
        });
    },
    back : function () {
        $(".w-back").on("tap",function () {
            mui.openWindow({
                url: "../../index.html?id=home",
                id: "index"
            });
        });
    }

};
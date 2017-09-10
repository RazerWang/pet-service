/**
 * Created by razer on 2017/5/19.
 */


function CartPageObject() {
    this.userid = sessionStorage.getItem("userid");
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
CartPageObject.prototype = {

    init : function () {
        var _self = this;
        _self.getCartList();
    },
    getCartList : function () {
        var _self = this;
        $commonObj.loadAjax({
            url : $commonObj.baseUrl()+"/shopping/itemlist",
            data : {
                userid : _self.userid,
            },
            success : function (res) {
                var res = JSON.parse(res);
                _self.getCartListAfter(res);
            }
        })
    },
    getCartListAfter : function (data) {
        var _self = this;
        var _parentNode = $('[w-render-name="nodeParent"]');
        var _childNode = $('[w-render-name="nodeChild"]');
        $('[w-render-name="nodeChild"]').eq(0).remove();
        $commonObj.loadListData({
            sourceDataList : data,
            dataListRootNode : _parentNode,
            dataListChildNode : _childNode,
            dataAttrName : "w-render-name",
            dataHandleFn : function (curDom,i) {
                var t = curDom.find('[w-render-name="itemid"]').text();
                curDom.find('[w-render-name="itemid"]').text(_self.itemsList[t].name);
                var itemid = t;
                var id = curDom.find('[w-render-name="id"]').val();
                var itemnum = curDom.find('[w-render-name="itemnum"]').val();
                var itime = curDom.find('[w-render-name="itime"]').val();
                var itemstate = curDom.find('[w-render-name="itemstate"]').text();
                if(itemstate == "已处理"){
                    curDom.find('[w-render-name="itemstate"]').addClass("mui-badge-primary");
                }else{
                    curDom.find('[w-render-name="itemstate"]').addClass("mui-badge-warning");
                }
                curDom.on("tap",function () {
                    mui.openWindow({
                        url: "./modules/views/myOrder.html?id="+id+"&itemId="+itemid+"&itemNum="+itemnum+"&itemState="+encodeURI(itemstate)+"&itemTime="+itime,
                        id: "order"
                    });
                });
            }

        });
    }

};
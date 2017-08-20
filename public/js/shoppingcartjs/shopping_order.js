/**
 * Created by Administrator on 2016/12/20.
 */
angular.module("shopping_order",[])
    .controller("sorderctrl",["$scope","$location","$http",function($scope,$location,$http){
        $("#orderBtn").show();
        $scope.itemsList = {
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
        var userid = sessionStorage.getItem("userid");
        $http.get("http://127.0.0.1:8080/shopping/itemlist?userid="+userid)
            .success(function(data){
                var dataInfo = eval(data);
                $scope.itemlist=dataInfo;
                console.log(dataInfo);

            })
        //删除订单
        $scope.delete = function(a){
            var isDel = window.confirm("确定删除该订单吗");
            if(isDel){
                $http.get("http://127.0.0.1:8080/shopping/delete?id="+a)
                    .success(function(data){
                        alert("该订单已删除");
                        var index = getIndex(a);
                        $scope.itemlist.splice(index,1);
                    })
            }
        }
        //确认订单
        $scope.sure = function(a){
            var isDel = window.confirm("确认收货？");
            if(isDel){
                $http.get("http://127.0.0.1:8080/shopping/delete?id="+a)
                    .success(function(data){
                        alert("欢迎下次光临");
                        var index = getIndex(a);
                        $scope.itemlist.splice(index,1);
                    })
            }
        }
        //		获取索引值
        function getIndex(a){
//			forEach 回调函数第一个参数为对象，第二个参数为对象的下标
            var index = 0;
            angular.forEach($scope.itemlist,function(i,j){
                if(i.id == a){
                    index = j
                }
            });
            return index;
        }

    }])
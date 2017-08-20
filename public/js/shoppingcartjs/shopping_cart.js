/**
 * Created by Administrator on 2016/12/20.
 */
angular.module("shopping_cart",[])
    .controller("scartctrl",["$filter","$scope","$location","$window","$http","$routeParams",function($filter,$scope,$location,$window,$http,$routeParams){
        $("#cartBtn").show();
        var itemsList = {
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
        var that = this;
        that.name = $routeParams.id;
        $scope.itemInfo = itemsList[that.name];
        //数量
        $scope.itemNum = 1;
        //减法
        $scope.jian = function(){
            if($scope.itemNum == 1){
                alert("数量最少为1");
            }else{
                $scope.itemNum--;
            }
            console.log($("#time").val());
        }
        //加法
        $scope.jia = function(){
            $scope.itemNum++;
        }
        //重置
        $scope.reset = function(){
            $scope.itemNum = 1;
        }
        //确认提交
        $scope.submit = function(){
            if($("#time").val() == ""){
                alert("请选择服务时间");
            }else{
                var userid = sessionStorage.getItem("userid");
                var time = $("#time").val();
                var db = "userid="+userid+"&itemid="+that.name+"&itemnum="+$scope.itemNum+"&itime="+time;
                $http.get("http://127.0.0.1:8080/shopping/in?"+db)
                    .success(function(data){
                        alert("恭喜您，订单提交成功");
                        $window.location.reload();
                    })
                    .error(function(){
                        alert("对不起，您的订单提交失败");
                    })
            }
        }



    }])

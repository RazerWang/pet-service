/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("manager_login",[])
    .controller("mloginctrl",["$scope","$location","$http",function($scope,$location,$http){
        $("#mloginBtn").show();

//		登陆方式
        $scope.login = function(){
            var db = $("#formsub").serialize();
//			获取数据并且渲染页面
            $http.get("http://127.0.0.1:8080/manager/login?"+db)
                .success(function(data){
                    console.log(data);
                    if(data == "error"){
                        alert("对不起，登录失败，请检查您输入的信息是否正确");
                    }else{
                        sessionStorage.setItem("managerid",data.id);
                        alert("登录成功");
                        $("#logout").show();
                        $location.path("/manager_list");
                    }
                })
                .error(function(){
                    alert("对不起，登录失败，请检查您输入的信息是否正确")
                })
        }
    }])
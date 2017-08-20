/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("user_register",[])
    .controller("uregister",["$scope","$http","$location",function($scope,$http,$location){


//		注册方法
        $scope.register = function(){
            var db = $("#formsub").serialize();
            $http.get("http://127.0.0.1:8080/users/register?"+db)
                .success(function(data){
                    alert("恭喜您，注册成功")
                    $location.path("/user_login");
                })
                .error(function(){
                   alert("对不起，您的注册失败")
                })

        }
    }])
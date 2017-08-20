/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("user_login",[])
    .controller("uloginctrl",["$scope","$location","$http",function($scope,$location,$http){


//		登陆方式
        $scope.login = function(){
            var db = $("#formsub").serialize();
//			获取数据并且渲染页面
            $http.get("http://127.0.0.1:8080/users/login?"+db)
                .success(function(data){
                    if(data == "error"){
                        alert("对不起，登录失败，请检查您输入的信息是否正确");
                    }else{
                        console.log(data);
                        sessionStorage.setItem("userid",data.id);
                        alert("登录成功");
                        window.open("index.html","_self");
                    }
                })
                .error(function(){
                    alert("对不起，登录失败，请检查您输入的信息是否正确")
                })
        }
    }])
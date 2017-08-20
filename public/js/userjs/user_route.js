/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("userapp",["ngRoute","user_login","user_register"])
    .controller("userctrl",["$scope",function($scope){}])
    .config(function($routeProvider){
        $routeProvider
            .when("/user_login",{
                templateUrl : "user_login.html"
            })
            .when("/user_register",{
                templateUrl : "user_register.html"
            })
            .otherwise({
                redirectTo : "/user_login"
            })
    })
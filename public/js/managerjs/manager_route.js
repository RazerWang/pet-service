/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("managerapp",["ngRoute","manager_login","manager_list","manager_itemlist"])
    .controller("managerctrl",["$scope",function($scope){
        $scope.logout = function(){
            sessionStorage.removeItem("managerid");
            $("#logout").hide();
            window.open("index.html","_self");
        }
    }])
    .config(function($routeProvider){
        $routeProvider
            .when("/manager_login",{
                templateUrl : "manager_login.html"
            })
            .when("/manager_list",{
                templateUrl : "manager_list.html"
            })
            .when("/manager_itemlist",{
                templateUrl : "manager_itemlist.html"
            })
            .otherwise({
                redirectTo : "/manager_login",
            })
    })
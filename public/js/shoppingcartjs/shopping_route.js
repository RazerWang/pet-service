/**
 * Created by Administrator on 2016/12/20.
 */
angular.module("shoppingapp",["ngRoute","shopping_cart","shopping_order","myinfoapp"])
    .controller("shoppingctrl",["$scope",function($scope){}])
    .config(function($routeProvider){
        $routeProvider
            .when("/shopping_cart/:id",{
                templateUrl : "shopping_cart.html"
            })
            .when("/shopping_order",{
                templateUrl : "shopping_order.html"
            })
            .when("/myinfo",{
                templateUrl : "myinfo.html"
            })
            .otherwise({
                redirectTo : "/shopping_cart"
            })
    })
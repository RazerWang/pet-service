/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("indexapp",[])
    .controller("indexctrl",["$scope","$http",function($scope,$http){
        sessionStorage.removeItem("managerid");
        var id = sessionStorage.getItem("userid");
        if(id != undefined){
            $http.get("http://127.0.0.1:8080/users/load?id="+id)
                .success(function(data){
                    console.log(data[0]);
                    $scope.showUser = data[0].username;
                    $(".afterHide").hide();
                    $("#showUser").show();
                })
        }else{
            $(".afterHide").show();
            $("#showUser").hide();
        }
        $scope.logout = function(){
            sessionStorage.removeItem("userid");
            window.location.reload();
        }
    }])
/**
 * Created by Administrator on 2016/12/20.
 */
angular.module("myinfoapp",[])
    .controller("myinfoctrl",["$scope","$location","$http",function($scope,$location,$http){
        $("#infoBtn").show();
        var userid = sessionStorage.getItem("userid");
        $http.get("http://127.0.0.1:8080/users/load?id="+userid)
            .success(function(data){
                var dataInfo = eval(data);
                $scope.dataInfo=dataInfo;
                console.log(dataInfo);

            })
        $scope.submitmyinfo = function(){
            var db = $("#mymyinfo").serialize();
            console.log(db);
            $http.get("http://127.0.0.1:8080/users/update?"+db)
                .success(function(data){
                    alert("已确认")
                });
        }

    }])
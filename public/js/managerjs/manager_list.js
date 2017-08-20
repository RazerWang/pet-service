/**
 * Created by Administrator on 2016/12/10.
 */
angular.module("manager_list",[])
    .controller("mlistctrl",["$scope","$location","$http","$window",function($scope,$location,$http,$window){
        $("#listBtn").show();
        $("#itemlistBtn").show();
        $("#mloginBtn").hide();
        var id = sessionStorage.getItem("managerid");
        if(id!=undefined){
            $http.get("http://127.0.0.1:8080/users/list")
                .success(function(data){
                    var dataInfo = eval(data);
                    $scope.users=dataInfo;

//					分页
                    var allusers = $scope.users;
                    $scope.allcounts = allusers.length;
                    $scope.allpages = Math.ceil($scope.allcounts/$scope.pageSize);
                })
        }else {
            alert("请登录后查看");
            $location.path("/my_login");
        }


//		选取对应的用户并且查看信息
        $scope.check = function(a){
            $("#change").show(500);
            var index = getIndex(a);
            $scope.user=$scope.users[index]
        }



//		修改用户信息
        $scope.update = function(){
            var db = $("#formsub").serialize();
            $http.get("http://127.0.0.1:8080/users/update?"+db)
                .success(function(data){
                        alert("修改成功")
                        $("#change").hide(500);
                });

        }


//		关闭模态框
        $scope.close =function(){
            $("#change").hide(500);
        }




//		删除用户
        $scope.del = function(a){
            var isDel = window.confirm("确定删除编号为："+a+"的用户");
            if(isDel){
                $http.get("http://127.0.0.1:8080/users/delete?id="+a)
                    .success(function(data){
                            alert("该用户已经删除");
                            var index = getIndex(a);
                            $scope.users.splice(index,1);
                    })
            }
        }


//		获取索引值
        function getIndex(a){
//			forEach 回调函数第一个参数为对象，第二个参数为对象的下标
            var index = 0;
            angular.forEach($scope.users,function(i,j){
                if(i.id == a){
                    index = j
                }
            });
            return index;
        }

//		分页
        $scope.pageSize = 15;
        $scope.pageNow = 1;

    }])
    .filter("myFilter",function(){
        return function(data,index){
            if(data){
                return data.slice(index);
            }
        }
    })
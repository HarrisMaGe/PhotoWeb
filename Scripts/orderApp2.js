var app = angular.module('orderApp', ['ui.bootstrap']);
var baseAddress = '/api/Order/';
var url = "";

app.controller('orderController', function ($scope, $http, $filter) {

    $scope.editMode = false;//是否显示编辑窗口
    $scope.orders = []; //当前主页面的订单列表
    $scope.order = null; //当前编辑的订单
    $scope.condition = new Object(); //当前的查询条件
    $scope.status = [
        {text:"新订单",value: 0},
        {text:"已支付",value: 1},
        {text:"已取消",value: 2},
        {text:"已发货",value: 3},
        {text:"已完成",value: 4},
    ];//状态选项数组

    //分页相关数据和方法
    $scope.maxSize = 5;
    $scope.pageSize = 5;
    $scope.totalItems = 100;
    $scope.currentPage = 1;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        $scope.pageChanged();
    };
    $scope.pageChanged = function () {
        $scope.find();
        //$log.log('Page changed to: ' + $scope.currentPage);
    };


    //根据条件查询订单
    $scope.search = function () {
        $scope.getCount();
        $scope.find();
    };

    //清除查询条件
    $scope.clearQuery = function () {
        $scope.condition = new Object();
    };

    //获得满足条件的订单数目
    $scope.getCount = function () {
        $http.post(baseAddress + "count", $scope.condition)
            .success(function (data) {
                $scope.totalItems = data;
                //$scope.setPage(1);
            }).error(function (data) {
                $scope.error = "An Error has occured! "
                    + data.ExceptionMessage;
            });
    };

    
    //查询满足条件的订单
    $scope.find = function () {
        $http.post(baseAddress + "find?skip=" + ($scope.currentPage - 1) * $scope.pageSize + "&take=" + $scope.pageSize, $scope.condition)
            .success(function (data) {
                $scope.orders = data;
            }).error(function (data) {
                $scope.error = "An Error has occured! "
                    + data.ExceptionMessage;
            });
    };


    //查询所有订单（未使用）
    $scope.getAll = function () {
        $http.get(baseAddress)
            .success(function (data) {
                $scope.orders = data;
                $scope.totalItems = $scope.orders.length;
                //$scope.setPage(1);
            }).error(function (data) {
                $scope.error = "An Error has occured! " 
                    + data.ExceptionMessage;
            });
    };

    //显示查看订单窗口
    $scope.showview = function () {
        $scope.order = this.order;
        $('#viewModal').modal('show');
    };

    //显示修改订单窗口
    $scope.showedit = function () {
        $scope.order = this.order;
        if (!angular.isDate($scope.order.CreateTime)) {
            $scope.order.CreateTime = new Date($scope.order.CreateTime); //convert CreateTime from string to Date
        }

        $scope.editMode = true;
        $('#editModel').modal('show');
    };

    //显示添加订单窗口
    $scope.showadd = function () {
        $scope.order = new Object();
        $scope.order.Status = 0;
        $scope.order.Items = new Array();
        $scope.editMode = false;
        $('#editModel').modal('show');
    };

    //显示确认窗口
    $scope.showconfirm = function (data) {
        $scope.order = data;
        $('#confirmModal').modal('show');
    };

    //添加订单
    $scope.add = function () {
        var currentOrder = this.order;
        if (currentOrder != null) {
            $http.post(baseAddress, currentOrder)
            .success(function (data) {
                $scope.editMode = false;
                $('#editModel').modal('hide');
                $scope.getCount();
                $scope.find();
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding user! " + data.ExceptionMessage;
            });
        }
    };

    //添加订单项（未保存）
    $scope.addItem = function () {
        var len = this.order.Items.length;
        this.order.Items[len] = new Object();
    };
    
    //删除订单项（未保存）
    $scope.deleteItem = function () {
        $scope.order.Items.splice($.inArray(this.item, $scope.order.Items), 1);
    };


    //提交修改订单
    $scope.update = function () {
        var currentOrder = this.order;
        $http.put(baseAddress + currentOrder.Id, this.order)
          .success(function (data) {
              currentOrder.editMode = false;
              $('#editModel').modal('hide');
              $scope.find();
          }).error(function (data) {
              $scope.error = "An Error has occured while Updating user! " + data.ExceptionMessage;
          });
    };

    //取消修改
    $scope.cancel = function () {
        $scope.order = null;
        $('#editModel').modal('hide');
    }

    // 删除订单
    $scope.delete = function () {
        var currentOrder = this.order;
        $http.delete(baseAddress + currentOrder.Id)
        .success(function (data) {
            $('#confirmModal').modal('hide');
            //$scope.orders.pop(currentOrder);
            $scope.search();
        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting user! " + data.ExceptionMessage;
            $('#confirmModal').modal('hide');
        });
    };


    //初始化数据
    $scope.getCount();
    $scope.find();

});
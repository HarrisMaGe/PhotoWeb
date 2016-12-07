var app = angular.module('orderApp', []);
var baseAddress = '/api/Order/';
var url = "";

app.controller('orderController', function ($scope, $http) {
    $scope.orders = [];
    $scope.order = null;
    $scope.editMode = false;

   

    //get all Users
    $scope.getAll = function () {
        $http.get(baseAddress)
            .success(function (data) {
                $scope.orders = data;
                //$scope.setPage(1);
            }).error(function (data) {
                $scope.error = "An Error has occured! " 
                    + data.ExceptionMessage;
            });
    };

    //show view window
    $scope.showview = function () {
        $scope.order = this.order;
        $('#viewModal').modal('show');
    };

    //show edit window
    $scope.showedit = function () {
        $scope.order = this.order;
        $scope.editMode = true;
        $('#editModel').modal('show');
    };


    //show add window
    $scope.showadd = function () {
        $scope.order = null;
        $scope.editMode = false;
        $('#editModel').modal('show');
    };

    //show delete cofirm window
    $scope.showconfirm = function (data) {
        $scope.order = data;
        $('#confirmModal').modal('show');
    };

    //add User
    $scope.add = function () {
        var currentOrder = this.order;
        if (currentOrder != null) {
            $http.post(baseAddress, currentOrder)
            .success(function (data) {
                $scope.editMode = false;
                $('#editModel').modal('hide');
                $scope.getAll();
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding user! " + data.ExceptionMessage;
            });
        }
    };

    //update user
    $scope.update = function () {
        var currentOrder = this.order;
        $http.put(baseAddress + currentOrder.Id, this.order)
          .success(function (data) {
              currentOrder.editMode = false;
              $('#editModel').modal('hide');
          }).error(function (data) {
              $scope.error = "An Error has occured while Updating user! " + data.ExceptionMessage;
          });
    };

    // delete User
    $scope.delete = function () {
        var currentOrder = this.order;
        $http.delete(baseAddress + currentOrder.Id)
        .success(function (data) {
            $('#confirmModal').modal('hide');
            $scope.orders.pop(currentOrder);
        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting user! " + data.ExceptionMessage;
            $('#confirmModal').modal('hide');
        });
    };

    // cancel changes
    $scope.cancel = function () {
        $scope.order = null;
        $('#editModel').modal('hide');
    }

    // initialize your  data
    $scope.getAll();

});
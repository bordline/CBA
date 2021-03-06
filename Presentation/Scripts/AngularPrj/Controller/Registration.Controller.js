﻿
LoanApp.controller('RegistrationController', ['$scope', 'AspNetUser', '$location', '$window', function ($scope, AspNetUser, $location, $window) {
    // Do something with myService

    $scope.registerUser = function () {
        var userData = {};
        var email = $scope.userData.inputEmail;
        var password = $scope.userData.inputPassword;
        var confirmpassword = $scope.userData.inputConfirmPassword;

        var userData = {
            "Email": email,
            "Password": password,
            "ConfirmPassword": confirmpassword
        }
        AspNetUser.registerUser(userData).then(function (response) {
            $scope.userData.inputEmail = "";
            $scope.userData.inputPassword = "";
            $scope.userData.inputConfirmPassword = "";
            angular.element('#myModalReg').hide();
            $location.path("/RegisterSuccessful");
            $window.location.reload();           
        }).catch(function (response) {
            if ($scope.userData.inputEmail.length != 0 && $scope.userData.inputPassword.length != 0) { $scope.Message = response.data.modelState[""][1]; }
        });
    };
    $scope.ClearMessage = function () {
        $scope.Message = "";
        angular.element('#myModalReg').on('hidden.bs.modal', function (e) { angular.element(this).find('input').val('').end() });
    };
    $scope.SignHere = function () {
        $scope.Message = "";
        angular.element('#myModalReg').modal('hide');
        angular.element('#myModal').modal('show');
        angular.element('#myModalReg').on('hidden.bs.modal', function (e) { angular.element(this).find('input').val('').end() })
        angular.element('#myModalReg').on('hidden.bs.modal', function (e) { angular.element(this).find('Message').val('').end() });
        $scope.modalForm.$setPristine();  
     };
}]);
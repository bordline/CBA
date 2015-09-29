﻿///<reference path="../../angular.min.js" />
///<reference path="../LoanApp.js" />
LoanApp.controller('CustomerController', ['$scope', '$location', 'CustomerService', '$localStorage', function ($scope, $location, CustomerService, $localStorage) {
    // Customers Profile 
    var username = "";

    $scope.init = function () {
        $scope.maritalstatus = CustomerService.getMaritalStatus();
        $scope.sourceofincome = CustomerService.getSourceOfIncome();
        $scope.emailAddress = $localStorage.get('username', '');
        username = $scope.emailAddress;
        $scope.getCustomer(username);
        
        var role = $localStorage.get('role');
        if (role.indexOf("Admin") > 1) {
            
            $scope.showCustomer = true;
        } else {
            $scope.showCustomer = false;
        }
    }

    //Function to Load Customer Record by username.   
    $scope.getCustomer = function (userName) {
        
        var CustomersById = CustomerService.getCustomerById(userName);

        CustomersById.then(function (results) {
            $scope.CustomerByUser = results.data;

            if ($scope.CustomerByUser != '' && $scope.CustomerByUser != null) {

                $scope.firstName = $scope.CustomerByUser.firstName;
                $scope.lastName = $scope.CustomerByUser.lastName;
                $scope.middleName = $scope.CustomerByUser.middleName;
                $scope.homeAddress = $scope.CustomerByUser.address;
                $scope.gender = $scope.CustomerByUser.gender;        
                $scope.birthDate = new Date($scope.CustomerByUser.birthDate);
                $scope.maritalStatus = $scope.CustomerByUser.maritalStatus;
                $scope.sourceOfIncome = $scope.CustomerByUser.sourceOfIncome;
                $scope.hideUpdateButton = false;
                $scope.hideSaveButton = true;
    
            }

            else {

                $scope.hideUpdateButton = true;
                $scope.hideSaveButton = false;

                $scope.firstName = '';
                $scope.lastName = '';
                $scope.middleName = '';
                $scope.homeAddress = '';
                $scope.gender = '';
                $scope.birthDate = new Date();
                $scope.maritalStatus = '';;
                $scope.sourceOfIncome = '';;
            }
            
        }).catch(function (errorResults) {
            //to do for not found here
            $scope.error = 'failure loading Employee', errorResults;
        });
    }

    //Function to Save Record   
    $scope.save = function () {        
        var username = $localStorage.get('username');
        var customerSaved = {           
            Email:          username,
            FirstName:      $scope.firstName,
            MiddleName:     $scope.middleName,
            LastName:       $scope.lastName,
            Gender:         $scope.gender,
            Address:        $scope.homeAddress,
            BirthDate:      new Date($scope.birthDate),
            MaritalStatus: $scope.maritalStatus,
            SourceOfIncome: $scope.sourceOfIncome
        };

        var CustomersToAdd = CustomerService.postCustomer(customerSaved);

        CustomersToAdd.then(function (results) {
            $scope.addConfirmation = results;

            if (results.statusText == 'OK') {
                $scope.hideUpdateButton = false;
                $scope.hideSaveButton = true;
            }
        }).catch(function (errorResults) {
            //to do for not found here
            $scope.error = 'failure loading Employee', errorResults;
        });
    }

    //Function to Update Record   
    $scope.update = function () {

        var customerUpdated = {
            Email: username,
            FirstName: $scope.firstName,
            MiddleName: $scope.middleName,
            LastName: $scope.lastName,
            Gender: $scope.gender,
            Address: $scope.homeAddress,
            BirthDate: $scope.birthDate,
            MaritalStatus: $scope.maritalStatus,
            SourceOfIncome: $scope.sourceOfIncome
        };

        var CustomersToUpdate = CustomerService.putCustomer(customerUpdated);

        CustomersToUpdate.then(function (results) {
            $scope.updateConfirmation = results;
        }).catch(function (errorResults) {
            //to do for not found here
            $scope.error = 'failure loading Employee', errorResults;
        });
    }
  
}]);
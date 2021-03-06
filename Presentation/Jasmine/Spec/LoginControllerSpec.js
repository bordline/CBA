﻿/// <reference path="../../Scripts/jquery-1.10.2.js" />
/// <reference path="../lib/jasmine.js" />
/// <reference path="../../Scripts/angular.min.js" />
/// <reference path="../../Scripts/angular-mocks.js" />
/// <reference path="../../Scripts/AngularPrj/LoanApp.js" />
/// <reference path="../../Scripts/AngularPrj/Controller/Login.Controller.js" />
/// <reference path="../../Scripts/AngularPrj/Service/LocalStorage.Service.js" />

describe('Login Controller', function () {
    beforeEach(function () {
        module(function ($provide) {
            $provide.service('response', function () {
                this.data = { "role" : "Admin" };
            });
        });
        module('LoanApp');
    });

    var loginCtrl;
    var scope;
    var service;
    var localStorage;
    var q;
    var deferred;
    var user;
    var response;
    var $rootScope;

    beforeEach(function () {
        user = {
            "username": "test5@cba.com",
            "password": "Password1!"
        }
        response = {
            "data": {
                "userName": "test5@cba.com",
                "password": "Password1!",
                "access_token": "2974RArhyMUlmeewjp34lmfDaBpl",
                "roles": "Admin"
            }
        }
        service = {
            login:function () {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    beforeEach(inject(['$rootScope', '$controller', '$q', '$localStorage', function ($rootScope, $controller, $q, $localStorage) {
        q = $q;
        scope = $rootScope.$new();
        scope.user = user;
        loginCtrl = $controller('LoginController', {
            $scope: scope,
            AspNetUser: service,
            $localStorage: $localStorage
        });
    }]));

    it('should post to AspNetUser.login service when signIn is called', function () {
        spyOn(service, 'login').and.callThrough();
        scope.signIn();
        deferred.resolve(response);
        scope.$root.$digest();
        expect(service.login).toHaveBeenCalled();
    });
});
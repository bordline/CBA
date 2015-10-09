///<reference path="../../require.js" />
define(["Scripts/ReactPrj/build/LoanTypeStore"], function (store) {
    var LoanTypeService = angular.injector(['ng', 'LoanApp']).get("LoanTypeService");

    var UpdateData = function () {
        LoanTypeService.getLoanTypes().then(function (data) {
            store.UpdateData(data);
        });
    }

    var LoadData = function () {
        LoanTypeService.getLoanTypes().then(function (result) {
            store.LoadData(result);
        });
    }

    return {
        UpdateData: UpdateData,
        LoadData: LoadData
    }
});
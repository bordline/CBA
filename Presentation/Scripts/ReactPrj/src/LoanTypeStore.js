define(function () {
    var UpdateFunction;

    var AddUpdateFunction = function (callback) {
        UpdateFunction = callback;
    }

    var RemoveUpdateFunction = function () {
        UpdateFunction = undefined;
    }

    var LoadFunction;

    var AddLoadFunction = function (callback) {
        LoadFunction = callback;
    }

    var RemoveLoadFunction = function () {
        LoadFunction = undefined;
    }

    var UpdateData = function (data) {
        if (UpdateFunction !== undefined){
            UpdateFunction(data);
        }
    }

    var LoadData = function (data) {
        if (LoadFunction !== undefined) {
            LoadFunction(data);
        }
    }

    return {
        LoadData: LoadData,
        UpdateData : UpdateData,
        AddUpdateFunction: AddUpdateFunction,
        RemoveUpdateFunction: RemoveUpdateFunction,
        AddLoadFunction: AddLoadFunction,
        RemoveLoadFunction: RemoveLoadFunction
    }
});
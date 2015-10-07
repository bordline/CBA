var functions = {};

var AddListener = function (component, callback) {
    functions[component] = callback;
}

var RemoveListener = function (component) {
    delete functions[component];
}

LoanApp.service('LoanTypeService', ['$http', 'loanApiConsUrl', '$localStorage', function ($http, loanApiConsUrl, $localStorage) {
    var URL = loanApiConsUrl;
    var token = $localStorage.get('access_token', '');
    //Function to Fetch all Loan Types
    var getAll = function () {
        //console.log("getAll");
        $http({ method: 'GET', url: URL + "api/LoanType", headers: { 'Authorization': 'Bearer ' + token } })
        .then(function (data) {
            for (var key in functions){
                functions[key](data)
            }
        });
    };

    return {
        getLoanTypes: getAll
    }
}]);
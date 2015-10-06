var func;

var SetListener = function (callback) {
    func = callback;
}

var getData = function () {
    //$.ajax({
    //    type: 'GET',
    //    url: URL + this.props.api,
    //    dataType: 'json',
    //    cache: false,
    //    headers: { 'Authorization': 'Bearer ' + this.props.token},
    //    success: function (data)
    //    {
    //        console.log("successfully received data from web");
    //        this.setState({data: data})
    //    }.bind(this),
    //    error: function (xhr, status, err){
    //        console.error(URL + this.props.api, status, err.toString());
    //    }.bind(this)
    //});
    angular.injector(['ng', 'LoanApp']).get("LoanTypeService").getLoanTypes();
    //.then(function(data){
    //    console.log("successfully received data from web");
    //    component.setState(data);
    //});
}

LoanApp.service('LoanTypeService', ['$http', 'loanApiConsUrl', '$localStorage', function ($http, loanApiConsUrl, $localStorage) {
    var URL = loanApiConsUrl;
    var token = $localStorage.get('access_token', '');
    //Function to Read All Customers
    var getAll = function () {
        console.log("getAll");
        $http({ method: 'GET', url: URL + "api/LoanType", headers: { 'Authorization': 'Bearer ' + token } })
        .then(function (data) {
            if (func !== undefined) {
                func(data);
            }
        });
    };

    return {
        getLoanTypes: getAll
    }
}]);
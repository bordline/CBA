///<reference path="../../react.js" />

var LoanTypeTable = React.createClass({
    getInitialState : function () {
        return {data : []};
    },
    componentDidMount : function(){
        angular.injector(['ng', 'LoanApp']).get("LoanTypeService").getLoanTypes().then(function(data){
            console.log("successfully received data from web");
            this.setState(data);
        }.bind(this))
        .catch(function (errorResults) {
            //to do for not found here
        });

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
    },
    render: function () {
        var rows = [];
        this.state.data.forEach(function(type){
            rows.push(<LoanTypeRow loanTypes={type} />);
        });
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>SI#</th>
                        <th>Descriptions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>    
        );
}
});

var LoanTypeRow = React.createClass({
    render : function(){
        return (
            <tr>
                <td>{this.props.loanTypes.id}</td>
                <td>{this.props.loanTypes.typeDesc}</td>
            </tr>
            );
    }
});

React.render(<LoanTypeTable />, document.getElementById('table-container'));

///<reference path="../../react.js" />

var URL = 'http://localhost:51361/';

var LoanTypeTable = React.createClass({
    getInitialState : function () {
        return {data : []};
    },
    componentDidMount : function(){
        $.ajax({
            type: 'GET',
            url: URL + this.props.api,
            dataType: 'json',
            cache: false,
            headers: { 'Authorization': 'Bearer ' + this.props.token},
            success: function (data)
            {
                console.log("successfully received data from web");
                this.setState({data: data})
            }.bind(this),
            error: function (xhr, status, err){
                console.error(URL + this.props.api, status, err.toString());
            }.bind(this)
        });
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

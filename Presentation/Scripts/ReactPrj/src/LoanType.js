///<reference path="../../react.js" />

var LoanTypeTable = React.createClass({
    getInitialState : function () {
        return {data : []};
    },
    componentDidMount : function(){
        AddListener("LoanTypeTable", this._onChange);
        //setInterval(this.loadData, 60000);
    },
    componentWillUnmount : function(){
        RemoveListener("LoanTypeTable");
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
    },
    _onChange: function(data){
        this.setState(data);
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

//React.render(<LoanTypeTable />, document.getElementById('table-container'));

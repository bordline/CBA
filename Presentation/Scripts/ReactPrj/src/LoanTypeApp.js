require(["Scripts/ReactPrj/build/LoanType"], function (table) {
    React.render(React.createElement(table.LoanTypeTable, null), document.getElementById('table-container'));
});
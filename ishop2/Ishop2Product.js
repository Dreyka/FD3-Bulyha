let Ishop2Product = React.createClass({

    displayName: "Ishop2Product",

    propTypes: {
        name: React.PropTypes.string.isRequired,
        buttonText: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        URL_foto: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        cbDelProduct: React.PropTypes.func.isRequired,
    },
    delButtonClicked: function (EO) {
        if (confirm("Вы хотите удалить "+this.props.name+" ?")){
            this.props.cbDelProduct(this.props.code);
        }
        // this.props.cbDelProduct();
    },
    render: function () {
        return React.DOM.div({className: "Ishop2BlockRow"},
            React.DOM.span({className: "Name"}, this.props.name),
            React.DOM.span({className: "Price"}, this.props.price),
            React.DOM.span({className: "URL_foto"}, this.props.URL_foto),
            React.DOM.span({className: "Count"}, this.props.count),
            React.DOM.button({className: "ButtonDel", onClick: this.delButtonClicked},this.props.buttonText),
        );
    },
});
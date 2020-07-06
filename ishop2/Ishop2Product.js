let Ishop2Product = React.createClass({

    displayName: "Ishop2Product",

    propTypes: {
        name: React.PropTypes.string.isRequired,
        buttonText: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        URL_foto: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        cbDelProduct: React.PropTypes.func.isRequired,
        isDeleted: React.PropTypes.bool,
    },

    getInitialState: function () {
        return {
            isSelected: false,
        };
    },

    delButtonClicked: function (EO) {
        if (confirm("Вы хотите удалить " + this.props.name + " ?")) {
            this.props.cbDelProduct(this.props.code);
        }
        ;
    },
    selectRow: function (EO) {
        if (!this.state.isSelected) {
            this.setState({isSelected: true});
        } else {
            this.setState({isSelected: false});
        }
        ;
    },
    render: function () {
        return (!this.props.isDeleted)
            ? React.DOM.div({className: "Ishop2BlockItemRow", data: this.state.isSelected, onClick: this.selectRow},
                React.DOM.span({className: "Name"}, this.props.name),
                React.DOM.span({className: "Price"}, this.props.price),
                React.DOM.span({className: "URL_foto"}, this.props.URL_foto),
                React.DOM.span({className: "Count"}, this.props.count),
                React.DOM.button({className: "ButtonDel", onClick: this.delButtonClicked}, this.props.buttonText),
            )
            : null
    },
});
let Ishop2Block = React.createClass({

    displayName: "Ishop2Block",

    propTypes: {
        head: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                head: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        ),
        products: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.string.isRequired,
                buttonText: React.PropTypes.string.isRequired,
                URL_foto: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
                count: React.PropTypes.number.isRequired,
                isDeleted: React.PropTypes.bool,
                isSelected: React.PropTypes.bool,
            })
        ),
        cbDelElem: React.PropTypes.func.isRequired,
        cbSelectElem: React.PropTypes.func.isRequired,
    },
    getInitialState: function () {
        return {
            isDeleted: this.props.products.isDeleted,
            isSelected: this.props.products.isSelected,
        };
    },
    delProduct: function (code) {
        this.props.cbDelElem(code);
        this.setState({isDeleted: true});
    },
    selectProduct: function (code) {
        this.props.cbSelectElem(code);
        this.setState({isSelected: true});
    },
    render: function () {
        let prodactsCode = this.props.products.map(v => React.createElement(Ishop2Product, {
            key: v.code, name: v.name,
            price: v.price,
            URL_foto: v.URL_foto,
            count: v.count,
            code: v.code,
            isDeleted: v.isDeleted,
            isSelected: v.isSelected,
            cbDelProduct: this.delProduct,
            cbSelectProduct: this.selectProduct,
            buttonText: v.buttonText,
        }));

        return React.DOM.div({className: "Ishop2Block"},
            React.DOM.div({className: "Ishop2BlockHeadRow"}, this.props.head.map(v =>
                React.DOM.span({key: v.code, className: "Ishop2BlockCell"}, v.head))
            ), prodactsCode
        );
    },
});
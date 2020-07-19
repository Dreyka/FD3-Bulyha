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
                URL_foto: React.PropTypes.string.isRequired,
                count: React.PropTypes.number.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        ),
    },
    getInitialState: function () {
        return {
            head: this.props.head.slice(),
            products: this.props.products.slice(),
            isSelected: -1,
        };
    },

    delProduct: function (code) {
        if (this.state.isSelected === code) this.state.isSelected = -1;
        this.setState({products: this.state.products.filter(v => v.code != code)});
    },
    selectProduct: function (code) {
        if (this.state.isSelected === code) {
            this.setState({isSelected: -1});
        } else {
            this.setState({isSelected: code});
        }
        ;
    },
    render: function () {
        let productsCode = this.state.products.map(v => React.createElement(Ishop2Product, {
            key: v.code, name: v.name,
            price: v.price,
            URL_foto: v.URL_foto,
            count: v.count,
            code: v.code,
            isSelected: ((v.code === this.state.isSelected) ? true : false),
            cbDelProduct: this.delProduct,
            cbSelectProduct: this.selectProduct,
        }));

        return React.DOM.div({className: "Ishop2Block"},
            React.DOM.div({className: "Ishop2BlockHeadRow"}, this.state.head.map(v =>
                React.DOM.span({key: v.code, className: "Ishop2BlockCell"}, v.head))
            ), productsCode
        );
    },
});
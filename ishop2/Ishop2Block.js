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
            isSelected: {mode:false, code:-1},
        };
    },

    delProduct: function (code) {
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].code === code) {
                this.state.products.splice(i, 1);
            }
            ;
        }
        ;
        this.setState({products: this.state.products});
    },
    selectProduct: function (code) {
        if (this.state.isSelected.code===code) {
            this.setState({isSelected: {mode:false, code:-1}});
        } else {
            this.setState({isSelected: {mode:true, code:code}});
        };
    },
    render: function () {
        let productsCode = this.state.products.map(v => React.createElement(Ishop2Product, {
            key: v.code, name: v.name,
            price: v.price,
            URL_foto: v.URL_foto,
            count: v.count,
            code: v.code,
            isSelected: ((v.code===this.state.isSelected.code) ? true: false),
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
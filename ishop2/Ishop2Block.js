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
            })
        ),
    },
    getInitialState: function () {
        let initProducts = this.props.products.slice();
        this.codeProducts(initProducts);
        let initHead = this.props.head.slice();
        this.codeProducts(initHead);
        return {
            head: initHead,
            products: initProducts,
            isDeleted: false,
            isSelected: false,
        };
    },
    codeProducts: function (arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].code = i;
        }
        ;
    },
    delProduct: function (code) {
        this.state.products.splice(code,1);
        this.codeProducts(this.state.products);
        this.setState({isDeleted: true});
    },
    selectProduct: function (code) {
        if (!(this.state.products[code].isSelected === true)) {
            this.state.products.forEach(v => v.isSelected = false);
            this.state.products[code].isSelected = true;
        } else {
            this.state.products[code].isSelected = false;
        }
        ;
        this.setState({isSelected: true});
    },
    render: function () {
        let productsCode = this.state.products.map(v => React.createElement(Ishop2Product, {
            key: v.code, name: v.name,
            price: v.price,
            URL_foto: v.URL_foto,
            count: v.count,
            code: v.code,
            isSelected: v.isSelected,
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
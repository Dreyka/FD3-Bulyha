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
                // cbDelElem: React.PropTypes.func.isRequired,
            })
        ),
    },
    getInitialState: function () {
        return {
            isDeleted: this.props.products.isDeleted,
        };
    },
    delProduct: function () {
        this.setState({isDeleted: true});
        console.log (this.state.isDeleted);
    },

    f: function(code){
        console.log(code)
    },

    render: function () {

        function createVDOM(v, i, a) {
            return React.createElement(Ishop2Product, {key: v.code, name: v.name,
                price: v.price,
                URL_foto: v.URL_foto,
                count: v.count,
                cbDelProduct:this.f,
                buttonText: v.buttonText,
            });
            // if (!v.isDeleted) {
            //
            // }
            // ;
        };

        return React.DOM.div({className: "Ishop2Block"},
            React.DOM.div({className: "Ishop2BlockRow"}, this.props.head.map(v =>
                React.DOM.span({key: v.code, className: "Ishop2BlockCell"}, v.head))
            ), this.props.products.map(createVDOM)
        );
    },
});
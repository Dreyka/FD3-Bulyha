"use strict";

let FilterBlock = React.createClass({
    displayName: "FilterBlock",

    render: function () {

        function createVDOM(v, i, a) {
            return React.DOM.div({key: v.code, className: "IshopBlockTableRow"},
                React.DOM.span({className: "Name"}, v.name),
                React.DOM.span({className: "Price"}, v.price),
                React.DOM.span({className: "URL_foto"}, v.URL_foto),
                React.DOM.span({className: "Count"}, v.count),
            );
        };

        return React.DOM.div({className: "FilterBlock"},
            React.DOM.span({className: "IshopBlockName"}, this.props.name),
            React.DOM.div({className: "IshopBlockTable"}, this.props.products.map(createVDOM)
            )
        );
    },
});



"use strict";

let FilterBlock = React.createClass({
    displayName: "FilterBlock",
    propTypes: {
        str: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                text: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        ),
    },

    getInitialState: function () {
        let copyStr = this.props.str.slice();
        copyStr.forEach(v => v.filter = false);

        return {
            str: copyStr,
            strBefore: null,
            searchMode: false,
        };
    },

    changeOrder: function (EO) {
        if (EO.target.checked) {
            this.setState({strBefore: this.state.str.slice()});
            this.setState({
                str: this.state.str.sort((a, b) => {
                    if (a.text < b.text) return -1;
                    if (a.text > b.text) return 1;
                    return 0;
                })
            });
        } else {
            this.setState({str: this.state.strBefore.slice()});
        }
        ;
    },

    changeSearch: function (EO) {
        this.state.str.forEach(v => {
            if (EO.target.value === "") {
                v.filter = false;
                this.state.searchMode = false;
                return;
            }
            ;
            v.filter = false;
            this.state.searchMode = true;
            if (v.text.indexOf(EO.target.value) !== -1) {
                v.filter = true;
            }
            ;
        });
        this.setState({str: this.state.str, searchMode: this.state.searchMode});
    },

    changeReset: function (EO) {
        this.getInitialState();
        let checkbox = document.getElementById("Container").querySelector(".FilterBlock .FilterBlockOptionsAlphabet");
        if (checkbox.checked) {
            checkbox.checked = false;
        }
        ;
        let inputText = document.getElementById("Container").querySelector(".FilterBlock .FilterBlockOptionsSearch");
        inputText.value = "";
        let copyStr = this.props.str.slice();
        copyStr.forEach(v => v.filter = false);
        this.setState({str: copyStr, searchMode: false});
    },

    render: function () {

        return React.DOM.div({className: "FilterBlock"},
            React.DOM.div({className: "FilterBlockOptions"},
                React.DOM.input({
                    type: "checkbox",
                    className: "FilterBlockOptionsAlphabet",
                    defaultChecked: false,
                    onClick: this.changeOrder,
                }),
                React.DOM.input({type: "text", className: "FilterBlockOptionsSearch", onChange: this.changeSearch}),
                React.DOM.button({className: "FilterBlockOptionsSearch", onClick: this.changeReset}, "сброс"),
            ),
            React.DOM.div({className: "FilterBlockStr"}, (this.state.searchMode)
                ? this.state.str.map(v => (v.filter) ? React.DOM.span({key: v.code}, v.text) : null)
                : this.state.str.map(v => React.DOM.span({key: v.code}, v.text))
            ),
        );
    },
});

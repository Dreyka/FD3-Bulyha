import React from 'react';
import propTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component{
    static propTypes={
        caption1: propTypes.string.isRequired,
        caption2: propTypes.string.isRequired,
        cbPressed: propTypes.func.isRequired,
    };

    button1=()=>this.props.cbPressed(1);
    button2=()=>this.props.cbPressed(2);

    render() {
        return(
            <div className="DoubleButton">
                <button onClick={this.button1}>{this.props.caption1}</button>
                {this.props.children}
                <button onClick={this.button2}>{this.props.caption2}</button>
            </div>
        )
    }
}

export default DoubleButton;
import React from 'react';
import propTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
    static propTypes = {
        colors: propTypes.arrayOf(propTypes.string).isRequired,
    };

    createBorder = (arr, i = 0) => {
        if (i === arr.length) return <span>{this.props.children}</span>;
        return <div className='item' style={{borderColor: arr[i]}}>{this.createBorder(arr, ++i)}</div>;
    };

    render() {
        return (
            <div className='RainbowFrame'>{this.createBorder(this.props.colors)}</div>
        )

    }
}


export default RainbowFrame;

import React from 'react';
import propTypes from 'prop-types';

import './RainbowFrame.css';

const RainbowFrame = props => <div className="RainbowFrame"
                                   style={{
                                       boxShadow: props.colors
                                           .map((v, i) => v = 'inset 0px 0px 0px ' + (2 * i + 1) * 5 + 'px ' + v + ',inset 0px 0px 0px ' + (i + 1) * 10 + 'px white')
                                           .join(',')
                                   }}>
    {props.children}
</div>;

RainbowFrame.propTypes = {
    colors: propTypes.arrayOf(propTypes.string).isRequired,
};

export default RainbowFrame;
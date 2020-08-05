import React from 'react';
import './withRainbowFrame.css';

function withRainbowFrame(color) {
    return function(Component) {
        return props => (
            <div className='withRainbowFrame'>
                {
                    color.reduce((r,v)=><div className='item' style={{borderColor: v}}>{r}</div>,
                        <Component {...props} />)
                }
            </div>
        )

    };
}
export { withRainbowFrame };
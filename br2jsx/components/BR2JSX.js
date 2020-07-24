import React from 'react';
import propTypes from 'prop-types';

import './BR2JSX.css';

const BR2JSX = props =>
    <div className="BR2JSX">
        {
            props.text
                .replace(/<br\s\/>|<br>|<br\/>/g, " <br/> ")
                .split(/\s/)
                .map((v,i) => (v === "<br/>") ? v = <br key={i}/> : v)
        }
    </div>;

BR2JSX.propTypes = {
    text: propTypes.string.isRequired,
};

export default BR2JSX;
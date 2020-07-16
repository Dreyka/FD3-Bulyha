"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Ishop3Block from './components/Ishop3Block';

let ishopHead = [
    {
        head: "Name",
    },
    {
        head: "Price",
    },
    {
        head: "URL",
    },
    {
        head: "Quantity",
    },
    {
        head: "Control",
    },
];
let ishopProducts = require('./products.json');

for (let i = 0; i < ishopHead.length; i++) {
    ishopHead[i].code = i;
}
;
for (let i = 0; i < ishopProducts.length; i++) {
    ishopProducts[i].code = i;
}
;

ReactDOM.render(
    <Ishop3Block
        head={ishopHead}
        products={ishopProducts}/>
    , document.getElementById('container')
);
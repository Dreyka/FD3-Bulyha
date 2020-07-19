import React from 'react';
import PropTypes from 'prop-types';

import './Ishop3Add.css';

class Ishop3Add extends React.Component {
    static propTypes = {
        code: PropTypes.number.isRequired,
        cbAddEndNewProduct: PropTypes.func.isRequired,
        // cbEditChangedProduct: PropTypes.func.isRequired,
    };

    state = {
        name: {value: null, valid: true},
        price: {value: null, valid: true},
        URL_foto: {value: null, valid: true},
        count: {value: null, valid: true},
    };
    // changeControl = () => {
    //     for (let k in this.state) {
    //         if (this.state[k].change) {
    //             this.props.cbEditChangedProduct(true);
    //             return;
    //         }
    //         ;
    //     }
    //     ;
    //     this.props.cbEditChangedProduct(false);
    // };

    nameValid = (EO) => {
        this.setState({
            name: {
                value: (!(EO.target.value === this.props.name) ? EO.target.value : this.state.name.value),
                valid: EO.target.value !== "",
                // change: !(EO.target.value === this.props.name)
            }
        });
    };
    priceValid = (EO) => {
        this.setState({
            price: {
                value: (!(EO.target.value === this.props.price) ? EO.target.value : this.state.price.value),
                valid: EO.target.value !== "",
                // change: !(EO.target.value === this.props.price)
            }
        });
    };
    URL_fotoValid = (EO) => {
        this.setState({
            URL_foto: {
                value: (!(EO.target.value === this.props.URL_foto) ? EO.target.value : this.state.URL_foto.value),
                valid: EO.target.value !== "",
                // change: !(EO.target.value === this.props.URL_foto)
            }
        });
    };
    countValid = (EO) => {
        this.setState({
            count: {
                value: (!(EO.target.value === this.props.count) ? Number(EO.target.value) : this.state.count.value),
                valid: EO.target.value !== "" && Number(EO.target.value),
                // change: !(Number(EO.target.value) === this.props.count)
            }
        });
    };

    add = (EO) => {
        let newItem = {
            name: this.state.name.value,
            price: this.state.price.value,
            URL_foto: this.state.URL_foto.value,
            count: this.state.count.value,
            code: this.props.code
        };
        this.props.cbAddEndNewProduct(1, newItem);
    };
    cancel = (EO) => {
        this.props.cbAddEndNewProduct();
    };

    render() {
        return (

            <div className='Ishop3BlockAdd'>
                <span className='caption'>Edit existing Product</span>
                <span>ID:{this.props.code}</span>
                <div className='item'>
                    <span>Name</span>
                    <input type='text' onBlur={this.nameValid}/>
                    {(!this.state.name.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>Price</span>
                    <input type='text' onBlur={this.priceValid}/>
                    {(!this.state.price.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>URL</span>
                    <input type='text' onBlur={this.URL_fotoValid}/>
                    {(!this.state.URL_foto.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>Quantity</span>
                    <input type='text' onBlur={this.countValid}/>
                    {(!this.state.count.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <button
                    disabled={!this.state.price.valid ||
                    !this.state.URL_foto.valid ||
                    !this.state.count.valid ||
                    !this.state.name.valid ||
                    this.state.name.value===null||
                    this.state.price.value===null||
                    this.state.URL_foto.value===null||
                    this.state.count.value===null}
                    onClick={this.add}>Add
                </button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
};

export default Ishop3Add;
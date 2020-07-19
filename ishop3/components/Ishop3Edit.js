import React from 'react';
import PropTypes from 'prop-types';

import './Ishop3Edit.css';

class Ishop3Edit extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        URL_foto: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        cbEditProduct: PropTypes.func.isRequired,
        cbEditChangedProduct: PropTypes.func.isRequired,
    };

    state = {
        name: {value: this.props.name, valid: true, change: false},
        price: {value: this.props.price, valid: true, change: false},
        URL_foto: {value: this.props.URL_foto, valid: true, change: false},
        count: {value: this.props.count, valid: true, change: false},
    };
    changeControl = () => {
        for (let k in this.state) {
            if (this.state[k].change) {
                this.props.cbEditChangedProduct(true);
                return;
            }
            ;
        }
        ;
        this.props.cbEditChangedProduct(false);
    };

    nameValid = (EO) => {
        this.setState({
            name: {
                value: (!(EO.target.value === this.props.name) ? EO.target.value : this.state.name.value),
                valid: EO.target.value !== "",
                change: !(EO.target.value === this.props.name)
            }
        }, this.changeControl);
    };
    priceValid = (EO) => {
        this.setState({
            price: {
                value: (!(EO.target.value === this.props.price) ? EO.target.value : this.state.price.value),
                valid: EO.target.value !== "",
                change: !(EO.target.value === this.props.price)
            }
        }, this.changeControl);
    };
    URL_fotoValid = (EO) => {
        this.setState({
            URL_foto: {
                value: (!(EO.target.value === this.props.URL_foto) ? EO.target.value : this.state.URL_foto.value),
                valid: EO.target.value !== "",
                change: !(EO.target.value === this.props.URL_foto)
            }
        }, this.changeControl);
    };
    countValid = (EO) => {
        this.setState({
            count: {
                value: (!(EO.target.value === this.props.count) ? Number(EO.target.value) : this.state.count.value),
                valid: EO.target.value !== "" && Number(EO.target.value),
                change: !(Number(EO.target.value) === this.props.count)
            }
        }, this.changeControl);
    };

    save = (EO) => {
        let newItem = {
            name: this.state.name.value,
            price: this.state.price.value,
            URL_foto: this.state.URL_foto.value,
            count: this.state.count.value,
            code: this.props.code
        }
        this.props.cbEditProduct(1, this.props.code, newItem);
    };
    cancel = (EO) => {
        this.props.cbEditProduct();
    };

    render() {
        return (

            <div className='Ishop3BlockEdit'>
                <span className='caption'>Edit existing Product</span>
                <span>ID:{this.props.code}</span>
                <div className='item'>
                    <span>Name</span>
                    <input type='text' defaultValue={this.props.name} onBlur={this.nameValid}/>
                    {(!this.state.name.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>Price</span>
                    <input type='text' defaultValue={this.props.price} onBlur={this.priceValid}/>
                    {(!this.state.price.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>URL</span>
                    <input type='text' defaultValue={this.props.URL_foto} onBlur={this.URL_fotoValid}/>
                    {(!this.state.URL_foto.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <div className='item'>
                    <span>Quantity</span>
                    <input type='text' defaultValue={this.props.count} onBlur={this.countValid}/>
                    {(!this.state.count.valid)
                        ? <span className='Warning'>Please, fill the field</span>
                        : null}
                </div>
                <button
                    disabled={!this.state.price.valid || !this.state.URL_foto.valid || !this.state.count.valid || !this.state.name.valid}
                    onClick={this.save}>Save
                </button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
};

export default Ishop3Edit;
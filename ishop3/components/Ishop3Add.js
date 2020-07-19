import React from 'react';
import PropTypes from 'prop-types';

import './Ishop3Add.css';

class Ishop3Add extends React.Component {
    static propTypes = {
        // name: PropTypes.string.isRequired,
        // price: PropTypes.string.isRequired,
        // URL_foto: PropTypes.string.isRequired,
        // count: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        // cbEditProduct: PropTypes.func.isRequired,
        // cbEditChangedProduct: PropTypes.func.isRequired,
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
        if (EO.target.value === "") {
            this.state.name.valid = false;
        } else {
            this.state.name.valid = true;
        }
        ;
        if (!(EO.target.value === this.props.name)) {
            this.state.name.change = true;
            this.state.name.value = EO.target.value;
        } else {
            this.state.name.change = false;
            this.state.name.value = EO.target.value;
        }
        ;
        this.changeControl();
        this.setState({
            name: {
                value: this.state.name.value,
                valid: this.state.name.valid,
                change: this.state.name.change
            }
        })
    };
    priceValid = (EO) => {
        if (EO.target.value === "") {
            this.state.price.valid = false;
        } else {
            this.state.price.valid = true;
        }
        ;
        if (!(EO.target.value === this.props.price)) {
            this.state.price.change = true;
            this.state.price.value = EO.target.value;
        } else {
            this.state.price.change = false;
            this.state.price.value = EO.target.value;
        }
        ;
        this.changeControl();
        this.setState({
            price: {
                value: this.state.price.value,
                valid: this.state.price.valid,
                change: this.state.price.change
            }
        })
    };
    URL_fotoValid = (EO) => {
        if (EO.target.value === "") {
            this.state.URL_foto.valid = false;
        } else {
            this.state.URL_foto.valid = true;
        }
        ;
        if (!(EO.target.value === this.props.URL_foto)) {
            this.state.URL_foto.change = true;
            this.state.URL_foto.value = EO.target.value;
        } else {
            this.state.URL_foto.change = false;
            this.state.URL_foto.value = EO.target.value;
        }
        ;
        this.changeControl();
        this.setState({
            URL_foto: {
                value: this.state.URL_foto.value,
                valid: this.state.URL_foto.valid,
                change: this.state.URL_foto.change
            }
        })

    };
    countValid = (EO) => {
        if (EO.target.value === "") {
            this.state.count.valid = false;
        } else {
            this.state.count.valid = true;
        }
        ;
        if (!(EO.target.value === this.props.price)) {
            this.state.count.change = true;
            this.state.count.value = EO.target.value;
        } else {
            this.state.count.change = false;
            this.state.count.value = EO.target.value;
        }
        ;
        this.changeControl();
        this.setState({
            count: {
                value: this.state.count.value,
                valid: this.state.count.valid,
                change: this.state.count.change
            }
        })
    };

    add = (EO) => {
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
        this.props.cbEditProduct(0);
    };

    render() {
        return (

            <div>
                {console.log(this.state)}
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
                    disabled={!this.state.price.valid || !this.state.URL_foto.valid || !this.state.count.valid || !this.state.name.valid}
                    onClick={this.add}>Add
                </button>
                {/*<button disabled={!this.state.name.valid}>Save</button>*/}
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
};

export default Ishop3Add;
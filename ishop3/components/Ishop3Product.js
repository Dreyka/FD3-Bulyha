import React from 'react';
import PropTypes from 'prop-types';

import './Ishop3Product.css';

class Ishop3Product extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        URL_foto: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cbDelProduct: PropTypes.func.isRequired,
        cbSelectProduct: PropTypes.func.isRequired,
        cbEditProduct: PropTypes.func.isRequired,
        isSelected: PropTypes.bool,
    };
    delButtonClicked = (EO) => {
        EO.stopPropagation();
        if (confirm("Вы хотите удалить " + this.props.name + " ?")) {
            this.props.cbDelProduct(this.props.code);
        }
        ;
    };
    selectRow = (EO) => {
        this.props.cbSelectProduct(this.props.code);
    };
    editButtonClicked = (EO)=>{
        this.props.cbEditProduct(this.props.code);
    };
    render() {

        return(
            <div className='Ishop2BlockItemRow' data-select={(this.props.isSelected===undefined)?"false":this.props.isSelected.toString()} onClick={this.selectRow}>
                <span className='Name'>{this.props.name}</span>
                <span className='Price'>{this.props.price}</span>
                <span className='URL_foto'>{this.props.URL_foto}</span>
                <span className='Count'>{this.props.count}</span>
                <div  className='ButtonsControl'>
                    <button className='ButtonEdit' onClick={this.editButtonClicked}>Edit</button>
                    <button className='ButtonDel' onClick={this.delButtonClicked}>Delete</button>
                </div>
            </div>
        )
    }

}

export default Ishop3Product;
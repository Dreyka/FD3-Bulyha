import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Ishop3Block.css';

import Ishop3Product from './Ishop3Product';
import Ishop3Edit from './Ishop3Edit';

class Ishop3Block extends React.Component {

    static propTypes = {
        head: PropTypes.arrayOf(
            PropTypes.shape({
                head: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
            })
        ),
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                URL_foto: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
                code: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        head: this.props.head.slice(),
        products: this.props.products.slice(),
        isSelected: {mode: false, item: null},
        // В isSelected храним режим работы компонента (mode: true/false) и ссылку на выбранный продукт (item: link)
        isEdited: {mode: false, item: null},
        isEditedChange: false,
    };

    delProduct = (code) => {
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].code === code) {
                if (this.state.products[i] === this.state.isSelected.item) {
                    this.state.isSelected.item = null;
                    this.state.isSelected.mode = false;
                }
                this.state.products.splice(i, 1);
            }
            ;
        }
        ;
        this.setState({products: this.state.products});
    };

    selectProduct = (code) => {
        if (this.state.isEditedChange) return;
        this.state.isEdited = {mode: false, item: null};
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].code === code) {
                if (!(this.state.products[i].isSelected === true)) {
                    this.state.products.forEach(v => v.isSelected = false);
                    this.state.products[i].isSelected = true;
                    this.setState({isSelected: {mode: true, item: this.state.products[i]}});
                } else {
                    this.state.products[i].isSelected = false;
                    this.setState({isSelected: {mode: false, item: null}});
                }
                ;
            }
            ;
        }
        ;
    };

    editProduct = (code) => {
        if (this.state.isEditedChange) return;

        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].code === code) {
                console.log(this.state.isEdited)
                this.setState({isEdited: {mode: true, item: this.state.products[i]}});
            }
            ;
        }
        ;
    };
    editChangedProduct = (bool) => {
        this.state.isEditedChange = bool;
        console.log(this.state.isEditedChange);
    };

    // editEndProduct:
    // option=0 - изменения не внесены
    // option=1 - изменения внесены
    editEndProduct = (option, code, editedItem) => {
        this.state.isEditedChange = false;
        if (option === 0) {
            // this.setState({isEdited: {mode: false, item: null}});
            // this.state.isEditedChange=false;
            this.setState({isEdited: {mode: false, item: null}});
        }
        ;
        if (option === 1) {
            for (let i = 0; i < this.state.products.length; i++) {
                if (this.state.products[i].code === code) {
                    this.state.products[i] = editedItem;
                    // this.setState({isEdited: {mode: true, item: this.state.products[i]}});
                    this.setState({isEdited: {mode: false, item: null}});
                }
                ;
            }
            ;
            // this.setState({isEdited: {mode: false, item: null}});
        }
        ;
    };

    render() {
        let productsCode = this.state.products.map(v =>
            <Ishop3Product
                key={v.code} name={v.name} price={v.price} URL_foto={v.URL_foto} count={v.count} code={v.code}
                isSelected={v.isSelected} cbDelProduct={this.delProduct} cbSelectProduct={this.selectProduct}
                cbEditProduct={this.editProduct}
            />);
        // let productsEdit = <Ishop3Edit
        //     code={this.state.isEdited.item.code} name={this.state.isEdited.item.name}
        //     price={this.state.isEdited.item.price} URL_foto={this.state.isEdited.item.URL_foto}
        //     count={this.state.isEdited.item.count}
        // />;

        return (
            <Fragment>
                {/*Вся таблица*/}
                <div className='Ishop3Block'>

                    {/*Шапка таблицы*/}
                    <div className='Ishop3BlockHeadRow'>
                        {
                            this.state.head.map(v => <span className='Ishop3BlockCell' key={v.code}>{v.head}</span>)
                        }
                    </div>

                    {/*Тело таблицы*/}
                    {productsCode}
                </div>
                <button className='Ishop3BlockButNew'>New product</button>

                {/*Карточка товара*/}
                {(this.state.isSelected.mode && !this.state.isEdited.mode)
                    ? <div className='Ishop3BlockProductSelected'>
                        <span>{this.state.isSelected.item.name}</span>
                        <span>Price: {this.state.isSelected.item.price}</span>
                        <span>URL: {this.state.isSelected.item.URL_foto}</span>
                    </div>
                    : null}

                {/*Режим редактирования*/}
                {(this.state.isEdited.mode)
                    ? <Ishop3Edit
                        code={this.state.isEdited.item.code} name={this.state.isEdited.item.name}
                        price={this.state.isEdited.item.price} URL_foto={this.state.isEdited.item.URL_foto}
                        count={this.state.isEdited.item.count} cbEditProduct={this.editEndProduct}
                        cbEditChangedProduct={this.editChangedProduct}
                    />
                    : null}
            </Fragment>
        )
    }
}

export default Ishop3Block;
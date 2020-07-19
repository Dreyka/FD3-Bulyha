import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Ishop3Block.css';

import Ishop3Product from './Ishop3Product';
import Ishop3Edit from './Ishop3Edit';
import Ishop3Add from './Ishop3Add';

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

        // В isSelected храним:
        // mode - режим работы карточки товара (true-показываем, false-скрываем)
        // code - код товара выделенного цветом
        isSelected: {mode: false, code: -1},

        // В isEdited храним:
        // change - внесены ли изменения в наш товар (true-изменения внесены, false-изменений нет)
        // code - код товара который редактируем
        isEdited: {change: false, code: -1},

        isNewProduct: false,
    };

    // Удалить товар
    delProduct = (code) => {
        this.setState({
            products: this.state.products.filter(v => v.code != code),
            isSelected: (code === this.state.isSelected.code) ? {mode: false, code: -1} : this.state.isSelected
        });
    };

    // Выделить товар
    selectProduct = (code) => {
        if (this.state.isEdited.change || this.state.isNewProduct) return;

        if (this.state.isSelected.code === code) {
            this.setState({isSelected: {mode: false, code: -1}, isEdited: {change: false, code: -1}});
        } else {
            this.setState({isSelected: {mode: true, code: code}, isEdited: {change: false, code: -1}});
        }
        ;
    };

    // Изменить товар
    editProduct = (code) => {
        if (this.state.isEdited.change) return;
        this.setState({isEdited: {change: false, code: code}, isSelected: {mode: false, code: code}});
    };

    // Контролируем изменения (true-изменения были внесены, false-изменений нет)
    editChangedProduct = (bool) => {
        this.state.isEdited.change = bool;
    };

    // editEndProduct сохраняем изменения:
    // option=1 - изменения внесены
    editEndProduct = (option, code, editedItem) => {
        // this.state;
        if (option === 1) {
            for (let i = 0; i < this.state.products.length; i++) {
                if (this.state.products[i].code === code) {
                    this.state.products[i] = editedItem;
                }
                ;
            }
            ;
        }
        ;
        this.setState({isEdited: {change: false, code: -1}, isSelected: {mode: false, code: -1}});
    };

    // Добавить новый товар
    addNewProduct = (EO) => {
        this.setState({isNewProduct: true, isSelected: {mode: false, code: -1}});
    };

    addEndNewProduct = (option, newItem) => {
        if (option === 1) this.state.products.push(newItem);
        this.setState({isNewProduct: false})
    };

    render() {
        let productsCode = this.state.products.map(v =>
            <Ishop3Product
                key={v.code} name={v.name} price={v.price} URL_foto={v.URL_foto} count={v.count} code={v.code}
                isSelected={(v.code === this.state.isSelected.code) ? true : false}
                isEdited={(this.state.isEdited.code != -1) ? true : false}
                isNewProduct={this.state.isNewProduct}
                cbDelProduct={this.delProduct} cbSelectProduct={this.selectProduct} cbEditProduct={this.editProduct}
            />);

        let selectVDOM = this.state.products
            .filter(v => v.code === this.state.isSelected.code)
            .map(v => <div className='Ishop3BlockProductSelected' key={v.code}>
                <span className='caption'>{v.name}</span>
                <span>Price: {v.price}</span>
                <span>URL: {v.URL_foto}</span>
                <span>Quantity: {v.count}</span>
            </div>);

        let editVDOM = this.state.products
            .filter(v => v.code === this.state.isSelected.code)
            .map(v => <Ishop3Edit
                key={v.code} code={v.code} name={v.name} price={v.price} URL_foto={v.URL_foto} count={v.count}
                cbEditProduct={this.editEndProduct} cbEditChangedProduct={this.editChangedProduct}
            />);

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
                <button className='Ishop3BlockButNew'
                        disabled={this.state.isEdited.code != -1 || this.state.isNewProduct}
                        onClick={this.addNewProduct}>
                    New product
                </button>

                {/*Карточка товара*/}
                {(this.state.isSelected.mode && !this.state.isEdited.mode) ? selectVDOM : null}

                {/*Режим редактирования*/}
                {(this.state.isEdited.code != -1) ? editVDOM : null}

                {/*Режим добавления нового продукта*/}
                {(this.state.isNewProduct)
                    ? <Ishop3Add
                        code={this.state.products[this.state.products.length - 1].code + 1}
                        cbAddEndNewProduct={this.addEndNewProduct}
                    />
                    : null}
            </Fragment>
        )
    }
}

export default Ishop3Block;
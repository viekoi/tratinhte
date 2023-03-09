import classes from './CartItem.module.css'
import React, {useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import CartContext from '../store/cart-context'


const CartItem = props => {

    const item = props.item
    console.log(item)

    const cartCtx = useContext(CartContext);

    const addToCartHandler = () => {
        cartCtx.addItem({
            ...item, amount: 1
        });
    };

    const removefromCartHandler = (amount) => {
        cartCtx.removeItem({
            ...item, amount: amount
        });
    };


    return (
        <div className={classes.cart__item}>
            <div className={classes.image}>
                <img src={item.image} alt="" />
            </div>
            <div className={classes.info}>
                <div className={classes.group}>
                    <div className={classes.name}>
                        <Link to={`/catalog/${item.slug}`}>
                            {item.title}
                        </Link>
                    </div>
                    <div className={classes.size}>
                        <ul>
                            <span>Size: {item.selectedSize}</span>

                        </ul>
                    </div>
                    <div className={classes.cartDescription}>

                        {
                            item.selectedToppings.length > 0 && <ul>
                                <span >Topping:</span>
                                {item.selectedToppings.map((topping, index) => {
                                    return (<li key={index}>+ {topping.name}</li>)
                                })}

                            </ul>
                        }

                    </div>
                </div>
                <div className={classes.price}>
                    {item.price.toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup>
                </div>
                <div className={classes[`info__quantity`]}>
                    <div className={classes.quantity}>
                        <div className={classes[`quantity__btn`]} onClick={() => { removefromCartHandler(1) }} >
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className={classes[`quantity__input`]}>
                            {item.amount}
                        </div>
                        <div className={classes[`quantity__btn`]} onClick={addToCartHandler}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className={classes.del} onClick={() => { removefromCartHandler("all") }}>
                    <i className='fa-solid fa-trash' ></i>
                </div>
            </div>

        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem

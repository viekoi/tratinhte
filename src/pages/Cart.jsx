import classes from './Cart.module.css'
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'


import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import CartContext from '../store/cart-context'

const Cart = () => {

    const cartCtx = useContext(CartContext)
    const cartItems = cartCtx.items







    const [cartProducts, setCartProducts] = useState(cartItems)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(cartItems)
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.amount) * Number(item.price)), 0))
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.amount), 0))
    }, [cartItems])

    return (
        <Helmet title="Giỏ hàng">
            <div className={classes.cart}>
                <div className={classes.info}>
                    <div className={classes.txt}>
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className={classes[`txt-price`]}>
                            <span>Thành tiền:</span> <span>{Number(totalPrice).toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup> </span>
                        </div>
                    </div>
                    <div className={classes.btn}>
                        {cartItems.length > 0 ? <Link to={`/checkout`}>
                            <Button size="block">
                                Đặt hàng
                            </Button>
                        </Link>:<Button size="block">
                                Đặt hàng
                            </Button>
                        }
                        
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className={classes[`cart__list`]}>
                    {
                      cartProducts.map((item,index)=>{
                        return (<CartItem control={true} item={item} key={index}></CartItem>)
                      })
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
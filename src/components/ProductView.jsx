import classes from './ProductView.module.css'
import React, { useState,useEffect,useReducer,useContext } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


import Button from './Button'

import CartContext from '../store/cart-context'

const ProductView = props => {



    let product = props.product
    
    const [size, setSize] = useState(product.size[0])
    const toppingList = product.toppings.map((topping)=>{
        return({name:topping.name,isChecked:false})
    })

    const [toppingActive,setToppingActive] = useState(toppingList)
    const setSizeHander=(e)=>{
        setSize(e)
        setSizeProducerHander(e)
    }
    const setToppingActiveHander=(index,item)=>{
        const newToppingActive = [...toppingActive]
        newToppingActive[index].isChecked = !newToppingActive[index].isChecked
        setToppingActive(newToppingActive)
        setSelectedToppingsProducerHander(item)
    }
        
    
    

    useEffect(() => {
        setToppingActive(toppingList)
        setSize(product.size[0])
    },[product] );

    const findKey=function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }


    const productDefaultState={
        ...product,
        selectedToppings:[],
        selectedSize:product.size[0],
        price:product.priceOnSize[product.size[0]],
        cartDescription:`${product.size[0]}`,
        amount:1,

    }

    const productReducer = (state,action)=>{
        
        if(action.type === "SETSIZE"){
            const updatedSize = action.size
            const updatedPrice = state.price*1 + state.priceOnSize[updatedSize]*1 - state.priceOnSize[state.selectedSize]*1
            const updatedItem = {...state}
            const updatedCartDescription = state.selectedToppings.reduce((accumulator,currentValue)=>accumulator +" / "+ currentValue.name,updatedSize)
            updatedItem.selectedSize = updatedSize 
            updatedItem.price = [updatedPrice]
            updatedItem.cartDescription = updatedCartDescription
            return updatedItem
        }
        if(action.type==="SETTOPPING"){
            const existingToppingIndex = state.selectedToppings.findIndex(
                (item) => item.slug===action.item.slug
            );

            if(existingToppingIndex===-1){
                const updatedPrice = state.price*1 + action.item.price*1
                const updatedSelectedToppings = [...state.selectedToppings,action.item].sort((a, b) =>
                a.name.localeCompare(b.name))
                const updatedCartDescription =updatedSelectedToppings.reduce((accumulator,currentValue)=>accumulator +" / "+ currentValue.name,state.selectedSize)
                const updatedItem ={...state}
                updatedItem.selectedToppings = updatedSelectedToppings
                updatedItem.price = updatedPrice
                updatedItem.cartDescription = updatedCartDescription
                return updatedItem
            }else{
                const updatedSelectedToppings = state.selectedToppings.filter(topping => topping.slug!== action.item.slug);
                const updatedPrice = state.price*1 - action.item.price*1
                const updatedCartDescription = updatedSelectedToppings.reduce((accumulator,currentValue)=>accumulator +" / "+ currentValue.name,state.selectedSize)
                const updatedItem ={...state}
                updatedItem.selectedToppings = updatedSelectedToppings
                updatedItem.price = updatedPrice
                updatedItem.cartDescription = updatedCartDescription
                return updatedItem
            }
        }
    }

    const setSizeProducerHander=(size)=>{
        dispatchProductAction({type:"SETSIZE",size:size})
    }

    const setSelectedToppingsProducerHander=(item)=>{
        dispatchProductAction({type:"SETTOPPING",item:item})
    }

    const [productState,dispatchProductAction] = useReducer(productReducer,productDefaultState)


    const cartCtx = useContext(CartContext);

    const addToCartHandler = () => {
        cartCtx.addItem({
          ...productState
        });
      };

    const onAdd=()=>{
        addToCartHandler()
        if(props.onClose){
            props.onClose()
        }
        alert("Thêm vào giỏ thành công!!!")
        
            
    }
    return (
        
        <div className={classes.product}>
            <div className={classes.image}>
                <img src={product.image} alt="" />
            </div>
            <div className={classes.info}>
                <h1 className={classes.title}>{product.title}</h1>
                <div className={classes[`info-item`]}>
                    <div className={classes[`info-item-content`]}>
                        <div className={classes[`info-item-description`]}>
                            {product.description}
                        </div>
                    </div>
                </div>
                <div className={classes[`info-item`]}>
                    <span className={classes.price}>

                        {productState.price.toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup>
                    </span>
                </div>

                {
                    product.toppings.length > 0 && <div className={`${classes[`info-item`]} `}>
                        <div className={`${classes[`info-item-content`]} topping-content`}>
                            <div className={classes[`info-item-title`]}>
                                Topping:
                            </div>
                            <div className={`${classes[`info-item-list`]} topping-list`}>
                                {
                                    product.toppings.map((item, index) => {
                                        
                                        return (
                                            <>
                                                <div onClick={() => { setToppingActiveHander(index,item) }}  className={`${classes[`info-item-list-item`]} ${toppingActive[index].isChecked ? `active` : ``} topping-hover`} key={index}>
                                                    <div className={`${classes.circle}`}> <img src={item.image} alt="" /> </div>
                                                    <div className={`${classes[`topping-item-description`]} bg-${product.color}`}>
                                                        <div className={classes[`topping-item-description-name`]}>{item.name}</div>
                                                        <div className={classes[`topping-item-description-price`]}>+{item.price.toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup></div>
                                                    </div>
                                                </div>
                                            </>



                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }

                <div className={classes[`info-item`]}>
                    <div className={classes[`info-item-content`]}>
                        <div className={classes[`info-item-title`]}>
                            Size:
                        </div>
                        <div className={classes[`info-item-list`]} >
                            {
                                product.size.map((item, index) => {
                                    return(
                                        <div onClick={() => { setSizeHander(item) }} className={`${classes[`info-item-list-item`]} ${size===item ? `active` : ``} `} key={index}>
                                                   <div className={`${classes.circle} bg-${product.color}`}>{item}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
              
                <div className={classes[`info-item`]}>
                    <div className={classes[`info-item-content`]}>
                        <Link to='/Cart'>
                            <Button
                                size="l"
                                backgroundColor={product.color}
                                onclick={addToCartHandler}
                            >
                                Mua ngay
                            </Button>
                        </Link>
                        <Button
                            size="l"
                            backgroundColor={product.color}
                            onclick={onAdd}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}
export default ProductView

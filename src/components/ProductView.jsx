import classes from './ProductView.module.css'
import React, { useState,useEffect,useReducer } from 'react'
import PropTypes from 'prop-types'
// import ProductViewModal from './ProductViewModal'

import Button from './Button'

const ProductView = props => {



    let product = props.product
    const baseSize = {}
    baseSize[product.size[0]] = true
    const [size, setSize] = useState(baseSize)
    const [toppingActive,setToppingActive] = useState({})
    const setSizeHander=(e)=>{
        const newSize = {...size}
        for(var i in  newSize ){
            newSize[i]=false
          }
          newSize[e] = true
          setSize(newSize)
          setSizeProducerHander()
    }
    const setToppingActiveHander=(name,item)=>{
        if(toppingActive[name]){
            if(toppingActive[name]===true){
                const newToppingActive = {...toppingActive}
                newToppingActive[name]=false
                setToppingActive(newToppingActive)
            }else {
                const newToppingActive = {...toppingActive}
                newToppingActive[name]=true
                setToppingActive(newToppingActive)
            }
        }else{
            const newToppingActive = {...toppingActive}
            newToppingActive[name]= true
            setToppingActive(newToppingActive)
        }
        setSelectedToppingsProducerHander(item)
        
    }

    useEffect(() => {
        setToppingActive({})
        setSize(baseSize)
    },[product] );

    const findKey=function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }


    const productDefaultState={
        ...product,
        selectedToppings:[],
        selectedSize:product.size[0],
        price:product.priceOnSize[product.size[0]],

    }

    const productReducer = (state,action)=>{
        if(action.type === "SETSIZE"){
            const newSize = findKey(size,true)
            const updatedPrice = state.price*1 + state.priceOnSize[newSize]*1 - state.priceOnSize[state.selectedSize]*1
            const updatedItem = {...state}
            updatedItem.selectedSize = [newSize]
            updatedItem.price = [updatedPrice]
            return updatedItem
        }
        if(action.type==="SETTOPPING"){
            
            const existingToppingIndex = state.selectedToppings.findIndex(
                (item) => item.id===action.item.id
            );

            if(existingToppingIndex===-1){
                const updatedPrice = state.price*1 + action.item.price*1
                const updatedSelectedToppings = [...state.selectedToppings,action.item].sort((a, b) =>
                a.name.localeCompare(b.name))
                const updatedItem ={...state}
                updatedItem.selectedToppings = updatedSelectedToppings
                updatedItem.price = updatedPrice
                return updatedItem
            }else{
                const updatedSelectedToppings = state.selectedToppings.filter(topping => topping.id !== action.item.id);
                const updatedPrice = state.price*1 - action.item.price*1
                const updatedItem ={...state}
                updatedItem.selectedToppings = updatedSelectedToppings
                updatedItem.price = updatedPrice
                return updatedItem
            }
        }
    }

    const setSizeProducerHander=()=>{
        dispatchProductAction({type:"SETSIZE"})
    }

    const setSelectedToppingsProducerHander=(item)=>{
        dispatchProductAction({type:"SETTOPPING",item:item})
    }

    const [productState,dispatchProductAction] = useReducer(productReducer,productDefaultState)




    
    return (
        
        <div className={classes.product}>
            {console.log("re")}
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
                                        const{name} =item

                                        return (
                                            <>
                                                <div onClick={() => { setToppingActiveHander(name,item) }}  className={`${classes[`info-item-list-item`]} ${toppingActive[`${name}`]===true? `active` : ``} topping-hover`} key={index}>
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
                                        <div onClick={() => { setSizeHander(item) }} className={`${classes[`info-item-list-item`]} ${size[item]===true ? `active` : ``} `} key={index}>
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
                        <Button
                            size="l"
                            backgroundColor={product.color}
                        >
                            Mua ngay
                        </Button>
                        <Button
                            size="l"
                            backgroundColor={product.color}
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

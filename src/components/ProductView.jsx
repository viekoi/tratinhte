import classes from './ProductView.module.css'
import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
// import ProductViewModal from './ProductViewModal'

import Button from './Button'

const ProductView = props => {



    let product = props.product
    const baseSize = {}
    baseSize[Object.keys(product.priceOnSize[0])[0]] = true
    const [size, setSize] = useState(baseSize)
    const [toppingActive,setToppingActive] = useState({})
    const setSizeHander=(e)=>{
        const newSize = {...size}
        for(var i in  newSize ){
            newSize[i]=false
          }
          newSize[e] = true
          setSize(newSize)
    }
    const setToppingActiveHander=(name)=>{
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
    }

    useEffect(() => {
        setToppingActive({})
        setSize(baseSize)
    },[product] );


    return (

        <div className={classes.product}>
            <div className={classes.image}>
                <img src={product.image} alt="" />
            </div>
            <div className={classes.info}>
                <h1 className={classes.title}>{product.title}</h1>
                <div className={classes[`info-item`]}>
                    <span className={classes.price}>
                        {product.priceOnSize[0]["M"].toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup>
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
                                                <div onClick={() => { setToppingActiveHander(name) }}  className={`${classes[`info-item-list-item`]} ${toppingActive[`${name}`]===true? `active` : ``} topping-hover`} key={index}>
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
                                product.priceOnSize.map((item, index) => {
                                    for (var i in item) {
                                        return (
                                            <div onClick={() => { setSizeHander(i) }} className={`${classes[`info-item-list-item`]} ${size[i]===true ? `active` : ``} `} key={index + Math.random()}>
                                                <div className={`${classes.circle} bg-${product.color}`}>{i}</div>
                                            </div>)
                                    }
                                    return null

                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={classes[`info-item`]}>
                    <div className={classes[`info-item-content`]}>
                        <div className={classes[`info-item-title`]}>
                            Mô tả:
                        </div>
                        <div className={classes[`info-item-description`]}>
                            {product.description}
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

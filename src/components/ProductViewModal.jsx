import React from 'react'
import classes from './ProductViewModal.module.css'



import ProductView from './ProductView'
import Button from './Button'



const ProductViewModal = (props) => {
    const product = props.product
    return (
        <div className={`${classes[`product-view__modal`]}`} >
            <div className={classes.content}  >
                <ProductView product={product} onClose={props.onClose} />
                <div className={classes.close}>
                    <Button
                        size="sm"
                        onclick={props.onClose}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal

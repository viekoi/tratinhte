import React,{useState,useEffect} from 'react'
import ReactDOM from "react-dom" 
import classes from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import Button from './Button'
import ProductViewModal from './ProductViewModal'

const ProductCard = props => {





    const portalElement = document.getElementById('overlays');
    const[modalActive,setModalActive] =useState(false)
    const setModalActiveHandler =()=>{
        setModalActive(!modalActive)
    }

    useEffect(() => {
        window.addEventListener("resize",()=>{
            setModalActive(false)
        })
        return ()=>{
            window.removeEventListener("resize",()=>{
                setModalActive(false)
            })
        }
    }, []);
    return (
        <div className={`${classes[`product-card`]} col l-${props.lcol} m-${props.mcol} c-${props.ccol}`}>
            <Link to={`/catalog/${props.item.slug}`} state={{props:props.item}}>
                <div className={classes.image}>
                    <img src={props.item.image} alt="" />
                </div>
                <h3 className={classes.name}>{props.item.title}</h3>
                <div className={classes.price}>
                    {props.item.size.map((item,index)=>{
                        const price = (props.item.priceOnSize[item]*1).toLocaleString({ style: "currency", currency: "VND" })
                        return(
                            
                            <span key={index}>{item +" " + price}<sup>đ</sup></span>
                        )
                    })}
                    {/* <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span> */}
                </div>
            </Link>
            <div className={classes.btn}>
                <Button
                    backgroundColor={props.item.color}
                    size="sm"    
                    icon="fa-solid fa-cart-shopping"
                    animate={true}
                   onclick={setModalActiveHandler}
                >
                    chọn mua
                </Button>
            </div>
            {modalActive && ReactDOM.createPortal(<ProductViewModal onClose={setModalActiveHandler} product={props.item}></ProductViewModal>,portalElement)}
        </div>
    )
}



export default ProductCard

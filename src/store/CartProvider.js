import { useReducer } from 'react';

import CartContext from './cart-context';



const cartItems = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : {items:[],totalAmount:0}


const defaultCartState = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
};


const cartReducer = (state, action) => {
   

    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.cartDescription + item.slug === action.item.cartDescription + action.item.slug
        );
        const updatedTotalAmount = state.totalAmount*1 + action.item.price*1 * action.item.amount*1;
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount*1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item);
        }
        localStorage.setItem('cartItems', JSON.stringify({
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }))
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE"){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.cartDescription + item.slug === action.item.cartDescription + action.item.slug
        );
        const removingItem = state.items[existingCartItemIndex];
        if(action.item.amount==="all"){
            const updatedTotalAmount = state.totalAmount*1 - removingItem.price*1 * removingItem.amount*1;
            const updatedItems = state.items.filter(item => item.cartDescription + item.slug !== removingItem.cartDescription + removingItem.slug)
            localStorage.setItem('cartItems', JSON.stringify({
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }))
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        }else{
            if(removingItem.amount===1){
                return {
                    items:state.items,
                    totalAmount: state.totalAmount
                };
            }else{
                let updatedItems;
                const updatedTotalAmount = state.totalAmount*1 - removingItem.price*1;
                const updatedItem = { ...removingItem, amount: removingItem.amount - action.item.amount*1 }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem
                localStorage.setItem('cartItems', JSON.stringify({
                    items: updatedItems,
                    totalAmount: updatedTotalAmount,
                }))
                return {
                    items: updatedItems,
                    totalAmount: updatedTotalAmount
                };
            }
        }
        
    }

    if(action.type === "RESET"){
        localStorage.removeItem("cartItems");
        return {
            items: [],
            totalAmount: 0,
        };
    }


    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );


    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };


    const removeItemFromCartHandler = (item) => {
        dispatchCartAction({ type: 'REMOVE', item: item});
    };

    const resetCartHandler = () => {
        dispatchCartAction({ type: 'RESET'});
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        reset:resetCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
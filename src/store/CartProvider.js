import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};


const cartReducer = (state,action)=>{
    const existingCartItemIndex = state.items.findIndex(
            (item) => item.slug===action.item.slug
    );

    if(action.type==="ADD"){
        if(existingCartItemIndex)
        {
            const updatedTotalAmount = state.totalAmount + action.item.totalPrice * action.item.totalAmount;
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;
            if('amount' in state.items[existingCartItemIndex]){

            }

        }
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        // addItem: addItemToCartHandler,
        // removeItem: removeItemFromCartHandler,
        // updateItem: updateItemFromCartHandler
    };
        
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

// const cartReducer = (state, action) => {


//     const existingCartItemIndex = state.items.findIndex(
//         (item) => item.cartItemDsc + item.id === action.item.cartItemDsc + action.item.id
//       );
        


//     if (action.type === 'ADD') {

//         const updatedTotalAmount =
//             state.totalAmount + action.item.totalPrice * action.item.totalAmount;
//         const existingCartItem = state.items[existingCartItemIndex];
//         let updatedItems;

//         if (existingCartItem) {
//             const updatedItem = {
//                 ...existingCartItem,
//                 totalAmount: existingCartItem.totalAmount + action.item.totalAmount,
//             };
//             updatedItems = [...state.items];
//             updatedItems[existingCartItemIndex] = updatedItem;
//         } else {
//             updatedItems = state.items.concat(action.item);
//         }

//         return {
//             items: updatedItems,
//             totalAmount: updatedTotalAmount,
//         };
//     }
//     if (action.type === 'REMOVE') {
//         const existingItem = state.items[existingCartItemIndex];
//         const updatedTotalAmount = state.totalAmount - existingItem.totalPrice;
//         let updatedItems;
//         if (existingItem.totalAmount === 1) {
//             const removeItem = state.items[existingCartItemIndex]
//             updatedItems = state.items.filter(item => item !== removeItem)
//         } else {
//             const updatedItem = { ...existingItem, totalAmount: existingItem.totalAmount - 1 };
//             updatedItems = [...state.items];
//             updatedItems[existingCartItemIndex] = updatedItem;
//         }

//         return {
//             items: updatedItems,
//             totalAmount: updatedTotalAmount
//         };
//     }

//     if (action.type === 'UPDATE') {
//         const existingItem = state.items[existingCartItemIndex];
//         let updatedTotalAmount;


//         let updatedItems;
//         //action.item.totalAmount trả về chuỗi từ input  để khi nhập không bị lỗi
//         if (action.item.totalAmount === "0") {
//             updatedTotalAmount = state.totalAmount - (existingItem.totalAmount * action.item.totalPrice*1);
//             const removeItem = state.items[existingCartItemIndex]
//             updatedItems = state.items.filter(item => item !== removeItem)
//         }
//         // *1 để chuyển chuỗi thành số cho phép toán
//         else if (action.item.totalAmount * 1 <= 0) {
           
//             if (existingItem.totalAmount > 1) {
//                 console.log("aaa")
//                 updatedTotalAmount = state.totalAmount - (existingItem.totalAmount * action.item.totalPrice) + action.item.totalPrice;
//             }else{
//                 updatedTotalAmount = state.totalAmount
//             }
//             const updatedItem = { ...existingItem, totalAmount: 1 /* *1 để chuyển từ chuỗi lại thành số để xử dụng */ };
//             updatedItems = [...state.items];
//             //update giá trường hợp <=0
//             updatedItems[existingCartItemIndex] = updatedItem;
//         }
//         else {
//             if (existingItem.totalAmount < action.item.totalAmount*1) {
//                 updatedTotalAmount = state.totalAmount + ((action.item.totalAmount*1 - existingItem.totalAmount) * action.item.totalPrice);
//             } else if (existingItem.totalAmount >= action.item.totalAmount) {
//                 updatedTotalAmount = state.totalAmount - ((existingItem.totalAmount - action.item.totalAmount*1) * action.item.totalPrice);
//             }
//             const updatedItem = { ...existingItem, totalAmount: action.item.totalAmount * 1 /* *1 để chuyển từ chuỗi lại thành số để xử dụng */ };
//             updatedItems = [...state.items];
//             updatedItems[existingCartItemIndex] = updatedItem;
//         }

//         return {
//             items: updatedItems,
//             totalAmount: updatedTotalAmount
//         };
//     }



//     return defaultCartState;
// };

// const CartProvider = (props) => {
//     const [cartState, dispatchCartAction] = useReducer(
//         cartReducer,
//         defaultCartState
//     );

//     const addItemToCartHandler = (item) => {
//         dispatchCartAction({ type: 'ADD', item: item });
//     };

//     const removeItemFromCartHandler = (item) => {
//         dispatchCartAction({ type: 'REMOVE', item: item });
//     };

//     const updateItemFromCartHandler = (item) => {
//         dispatchCartAction({ type: 'UPDATE', item: item });
//     };

//     const cartContext = {
//         items: cartState.items,
//         totalAmount: cartState.totalAmount,
//         addItem: addItemToCartHandler,
//         removeItem: removeItemFromCartHandler,
//         updateItem: updateItemFromCartHandler
//     };

//     return (
//         <CartContext.Provider value={cartContext}>
//             {props.children}
//         </CartContext.Provider>
//     );
// };

export default CartProvider;
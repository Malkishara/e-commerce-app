import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, { ...action.payload, quantity: 1 }];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        default:
            return state;
    }
};

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addItemToCart = item => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeItemFromCart = id => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const updateItemQuantity = (id, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

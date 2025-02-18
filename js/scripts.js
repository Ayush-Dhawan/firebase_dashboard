import React, { createContext, useContext, useReducer } from "react";

// Create Cart Context const CartContext = createContext();

// Initial state const initialState = { cart: [], };

// Reducer function const cartReducer = (state, action) => { switch (action.type) { case "ADD_TO_CART": return { ...state, cart: [...state.cart, action.payload] }; case "REMOVE_FROM_CART": return { ...state, cart: state.cart.filter((item) => item.id !== action.payload), }; case "CLEAR_CART": return { ...state, cart: [] }; default: return state; } };

// CartProvider component export const CartProvider = ({ children }) => { const [state, dispatch] = useReducer(cartReducer, initialState);

return ( <CartContext.Provider value={{ state, dispatch }}> {children} </CartContext.Provider> ); };

// Custom hook to use the cart context export const useCart = () => { return useContext(CartContext); };


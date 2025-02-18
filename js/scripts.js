import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
  // carts: { customerId: [ { item: { ...reward, quantity } }, ... ] }
  carts: {}
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // action.payload: { item: rewardWithQuantity }
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: [...(state.carts[action.id] || []), action.payload],
        },
      };
    }
    case 'UPDATE_CART_QUANTITY': {
      // action.payload: { rewardId, quantity }
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: state.carts[action.id].map((cartItem) =>
            cartItem.item.id === action.payload.rewardId
              ? { ...cartItem, item: { ...cartItem.item, quantity: action.payload.quantity } }
              : cartItem
          ),
        },
      };
    }
    case 'REMOVE_FROM_CART': {
      // action.payload is the rewardId (number)
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]:
            state.carts[action.id]?.filter((cartItem) => cartItem.item.id !== action.payload) ||
            [],
        },
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: [],
        },
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

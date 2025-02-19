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
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: state.carts[action.id].map((item) =>
            item.item.id === action.payload.id
              ? { ...item, item: { ...item.item, quantity: action.payload.quantity } }
              : item
          ),
        },
      }
    case 'REMOVE_FROM_CART': {
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
    TypeError: Cannot destructure property 'state' of '((cov_s90ywmcz3(...).s[9]++) , (0 , _CartContext.useCart)(...))' as it is null.
 
      28 |   const [pointsCost, setPointsCost] = useState(0);
      29 |   const [isProcessing, setIsProcessing] = useState(false);
> 30 |   const {state, dispatch} = useCart();

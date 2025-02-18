case "UPDATE_CART_QUANTITY":
  return {
    ...state,
    carts: {
      ...state.carts,
      [action.userId]: state.carts[action.userId].map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ),
    },
  };

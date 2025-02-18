case "UPDATE_CART_QUANTITY":
  return {
    ...state,
    carts: {
      ...state.carts,
      [action.id]: state.carts[action.id].map((cartItem) =>
        cartItem.item.id === action.payload.rewardId // Compare by item.id
          ? { ...cartItem, item: { ...cartItem.item, quantity: action.payload.quantity } } // Update quantity inside item
          : cartItem
      ),
    },
  };

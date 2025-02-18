case "UPDATE_CART_QUANTITY":
  return {
    ...state,
    carts: {
      ...state.carts,
      [action.id]: state.carts[action.id].map((item) =>
        item.id === action.payload.rewardId  // Compare by rewardId
          ? { ...item, quantity: action.payload.quantity }  // Update the quantity of the rewardItem
          : item
      ),
    },
  };

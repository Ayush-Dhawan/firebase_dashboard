const cartReducer = (state, action) => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: state.carts[action.id].map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };

now modify this accordingly to update quantity field inside the rewardItem

 case 'CLEAR_CART': {
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: [],
        },
      };
    }

  const handleSubmission = () => {
    // setIsProcessing(true);


    handleUpdateCustomerPoints(customer.points - totalPrice);

        toast["success"]("Redeemed", {theme: 'light'});

    dispatch({
      type: "CLEAR_CART"
    });

  }

use clear cart

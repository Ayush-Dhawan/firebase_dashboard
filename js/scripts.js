  const addItemToCart = (e) => {
    e.preventDefault();
    if (!reward) return;
    dispatch({
      type: "ADD_TO_CART",
      id: customer.id,
      payload: { item: {...reward, quantity: 1} },
    });
    setCartQuantity(1);
    setIsInCart(true)
  };

i want quantity to be inside reward, it is adding it with reward as a new field inside item

useEffect(() => {
  // Check if the customer has any items in the cart
  const customerCart = state.carts[customer?.id] || [];

  // Find the item with the matching rewardId
  const itemInCart = customerCart.find(item => item.item.id === rewardId);

  // If item is found, set the initial quantity; otherwise, set it to 0
  if (itemInCart) {
    setCartQuantity(itemInCart.item.quantity);
  } else {
    setCartQuantity(0);
  }
}, [rewardId, state.carts, customer?.id]);

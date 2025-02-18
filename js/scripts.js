useEffect(() => {
  setItems(state.carts[customer.id] || []);

  const cartItems = state.carts[customer.id] || [];

  setTotalQuantity(cartItems.reduce((sum, item) => sum + Number(item.item.quantity), 0));
  setTotalPrice(cartItems.reduce((sum, item) => sum + Number(item.item.quantity) * Number(item.item.itemCost), 0));

}, [state.carts, customer.id]);

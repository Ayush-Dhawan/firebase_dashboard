
  useEffect(() => {
    console.log("state: ", totalQuantity, totalPrice)
  }, [totalQuantity, totalPrice]);

  useEffect(() => {
    setItems(state.carts[customer.id])
    setTotalQuantity(items ? items.reduce((sum, item) => sum + Number(item.item.quantity), 0): 0)
    setTotalPrice(items? items.reduce((sum, item) => sum + Number(item.item.quantity) * Number(item.item.itemCost), 0): 0)

  }, [state.carts, customer.id, state.carts[customer.id]]);

totalPrice and totalQuantity runs one state behind

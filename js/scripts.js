  const [cartQuantity, setCartQuantity] = useState(0);

  console.log("ye hai carts: ", state.carts[customer?.id])

this takes us to the cart of the user, now using rewardId you need to check which item we are on based on item.id and then use that items.quantity attribute to set initial state of cartQuantity

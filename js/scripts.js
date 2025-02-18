const CartPage = ({customer}) => {

  const {state, dispatch} = useCart();
  useEffect(() => {
    console.log("current customer: ", customer)
    console.log("currrent cart: ", state.carts[customer.id])
  }, []);
  const [items, setItems] = useState(state.carts[customer.id] || []);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log("state: ", totalQuantity, totalPrice)

  async function handleRedeem(){
    const newCustomer = {...customer, points -= totalPrice}
  await doCustomerUpdate(newCustomer)
  }

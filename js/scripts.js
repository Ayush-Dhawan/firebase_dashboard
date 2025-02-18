import {useEffect, useState} from 'react';
import {useCart} from '../../contexts/CartContext';

const CartPage = ({customer}) => {

  const {state, dispatch} = useCart();
  useEffect(() => {
    console.log("current customer: ", customer)
    console.log("currrent cart: ", state.carts[customer.id])
  }, []);



  const [items, setItems] = useState(state.carts[customer.id])
  useEffect(() => {
    setItems(state.carts[customer.id])
  }, [state.carts, customer.id]);

  return(
    <div>
      <p>Cart</p>
      <Header />
      {items.map((item, index) => <CartItem item={item.item} index={index} customer={customer} dispatch={dispatch} setItems={setItems} items={items} />)}
    </div>
  )
}

function CartItem({ item, index, customer, dispatch, setItems, items }) {
  function handleRemove(){
    dispatch({
      type: "REMOVE_FROM_CART",
      id: customer.id,
      payload: item.id,  // Using rewardId to remove the item
    });
    setItems(items.filter(x => x.id !== item.id))
  }
  console.log(item);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
      <span style={{
        fontSize: '14px',
        fontWeight: '700',
        color: '#007bff',
        flex: 1,
        textAlign: 'left',
      }}>
        {item.itemName}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#28a745',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.itemCost}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#fd7e14',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.quantity}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.quantity * item.itemCost}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.status}
      </span>
      <button onClick={handleRemove} style={{backgroundColor: 'orangered', color: 'white', fontWeight: "bold", border: "none", borderRadius: "10px", padding: "2px"}}>Remove from cart</button>
    </div>
  );
}

function Header() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    }}
>
      <span style={{
        fontSize: '14px',
        fontWeight: '700',
        color: '#007bff',
        flex: 1,
        textAlign: 'left',
      }}>
        {"Name"}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#28a745',
        flex: 1,
        textAlign: 'center',
      }}>
        {"Cost"}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#fd7e14',
        flex: 1,
        textAlign: 'center',
      }}>
        {"Quantity"}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        flex: 1,
        textAlign: 'center',
      }}>
        {"TotalCost"}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        flex: 1,
        textAlign: 'center',
      }}>
        {"Status"}
      </span>
      <div style={{ border: "none", borderRadius: "10px", padding: "2px", width: '120px'}}>Action</div>
    </div>
  );
}

export default CartPage;


below the cartItems mapping i want a row which shows total of all columns above such as totalPrice, etc

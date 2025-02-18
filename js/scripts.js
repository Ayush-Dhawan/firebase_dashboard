import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";

const CartPage = ({ customer }) => {
  const { state, dispatch } = useCart();
  const [items, setItems] = useState(state.carts[customer.id] || []);

  useEffect(() => {
    setItems(state.carts[customer.id] || []);
  }, [state.carts, customer.id]);

  // Calculate Totals
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.itemCost, 0);

  return (
    <div>
      <p>Cart</p>
      <Header />
      {items.length > 0 ? (
        items.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            index={index}
            customer={customer}
            dispatch={dispatch}
            setItems={setItems}
            items={items}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Cart is empty</p>
      )}

      {/* Summary Row */}
      {items.length > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          borderTop: "2px solid #000",
          backgroundColor: "#f1f1f1",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          color: "#333",
          marginTop: "10px",
          borderRadius: "5px"
        }}>
          <span style={{ flex: 1, textAlign: "left", color: "#007bff" }}>Total</span>
          <span style={{ flex: 1, textAlign: "center" }}>-</span>
          <span style={{ flex: 1, textAlign: "center", color: "#fd7e14" }}>{totalQuantity}</span>
          <span style={{ flex: 1, textAlign: "center", color: "#6c757d" }}>{totalPrice}</span>
          <span style={{ flex: 1, textAlign: "center" }}>-</span>
          <span style={{ flex: 1, textAlign: "center" }}>-</span>
        </div>
      )}
    </div>
  );
};

export default CartPage;

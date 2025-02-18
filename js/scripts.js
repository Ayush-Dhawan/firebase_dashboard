Here’s a demo component that allows updating the quantity of items in a user’s cart.


---

Enhancements:

Users can increase or decrease item quantity.

If quantity reaches zero, the item is removed from the cart.



---

Demo Component: Updating Cart Quantity

import React, { useState } from "react";
import { useCart } from "./CartContext";

const CartDemo = () => {
  const { state, dispatch } = useCart();
  const [userId, setUserId] = useState("1"); // Default user ID
  const [product, setProduct] = useState("");

  const addItem = () => {
    if (!product) return;

    dispatch({
      type: "ADD_TO_CART",
      userId,
      payload: { id: Date.now(), name: product, quantity: 1 }, // Default quantity
    });

    setProduct(""); // Clear input after adding
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        userId,
        payload: { id, quantity: newQuantity },
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_CART",
        userId,
        payload: id,
      });
    }
  };

  const userCart = state.carts[userId] || [];

  return (
    <div>
      <h2>Cart for User ID: {userId}</h2>

      {/* User ID Input */}
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {/* Add Product */}
      <input
        type="text"
        placeholder="Enter product name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button type="button" onClick={addItem}>Add to Cart</button>

      {/* Cart Items */}
      <ul>
        {userCart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} 
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartDemo;


---

Cart Context Update

Modify the reducer in CartContext.js to handle quantity updates:

case "UPDATE_CART_QUANTITY":
  return {
    ...state,
    carts: {
      ...state.carts,
      [action.userId]: state.carts[action.userId].map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ),
    },
  };


---

How It Works

1. Users enter their userId and add a product.


2. Products start with quantity: 1.


3. Users can increase/decrease quantity:

If quantity reaches zero, the item is removed from the cart.



4. Updates are applied dynamically.



This ensures quantity management per user. Let me know if you need improvements!


import React, { useState } from "react";
import { useCart } from "./CartContext";

const CartDemo = () => {
  const { state, dispatch } = useCart();
  const [userId, setUserId] = useState("1"); // Default user ID for demo
  const [product, setProduct] = useState("");

  const addItem = () => {
    if (!product) return;
    dispatch({
      type: "ADD_TO_CART",
      userId,
      payload: { id: Date.now(), name: product },
    });
    setProduct("");
  };

  const userCart = state.carts[userId] || []; // Ensure cart exists for the user

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
      <button onClick={addItem}>Add to Cart</button>

      {/* Cart Items */}
      <ul>
        {userCart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

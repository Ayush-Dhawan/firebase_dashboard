{cartQuantity > 0 ? (
  <>
    <button onClick={(e) => updateQuantity(e, rewardId, cartQuantity + 1)}>+</button>
    {cartQuantity}
    <button onClick={(e) => updateQuantity(e, rewardId, cartQuantity - 1)}>-</button>
    <p>is in cart</p>
  </>
) : (
  <button onClick={addItemToCart}>Add to cart</button>
)}

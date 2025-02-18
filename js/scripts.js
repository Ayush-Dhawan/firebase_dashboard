function CartItem({item}) {
console.log(item)
  return(
    <div>
      <span>{item.itemName}</span>
      <span>{item.itemCost}</span>
      <span>{item.quantity}</span>
      <span>{item.status}</span>
    </div>
  )
}

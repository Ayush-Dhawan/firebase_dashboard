import React, { useEffect, useState } from 'react'; import { Link, useParams } from 'react-router-dom'; import { getReward, getRewardsList } from '../../api/RewardsApi'; import RewardsCard from './RewardsCard'; import { doFulfillment } from '../../api/FulfillmentApi'; import RewardsModal from './RewardsModal'; import { toast, ToastContainer } from 'react-toastify';

const RewardsDetailsPage = ({ category = { name: 'unknown', catalogId: false }, handleUpdateCustomerPoints, handleCategoryChange, customer = { username: 'unknown', points: 0 } }) => { const { rewardId } = useParams(); const initialState = { itemDescription: 'loading', itemName: 'loading' }; const [reward, setReward] = useState(initialState); const [items, setItems] = useState([]); const [qty, setQty] = useState(1); const [showRewardsModal, setShowRewardsModal] = useState(false); const [pointsCost, setPointsCost] = useState(0); const [isProcessing, setIsProcessing] = useState(false); const [isInCart, setIsInCart] = useState(false); const [cartQuantity, setCartQuantity] = useState(0);

useEffect(() => { setPointsCost(qty * reward.itemCost); }, [qty, reward.itemCost]);

useEffect(() => { const getRewardItem = async () => { const data = await getReward(rewardId); setReward(data); if (!category.id) { handleCategoryChange(data.rewardCatalogId); } }; getRewardItem(); }, [rewardId, category.id, handleCategoryChange]);

useEffect(() => { const customerCart = JSON.parse(localStorage.getItem(cart_${customer.id})) || []; const cartItem = customerCart.find(item => item.id === Number(rewardId)); setIsInCart(!!cartItem); setCartQuantity(cartItem ? cartItem.quantity : 0); }, [rewardId, customer.id]);

useEffect(() => { if (category.id || reward.rewardCatalogId) { const setRandomRewardItems = async () => { const data = await getRewardsList(category.id || reward.rewardCatalogId); setItems(data.slice(0, 6)); }; setRandomRewardItems(); } else { setItems([]); } }, [rewardId, category.id, reward.rewardCatalogId]);

const toggleShowRewardsModal = e => { e.preventDefault(); setShowRewardsModal(!showRewardsModal); };

const handleSubmission = qty => { setIsProcessing(true); const fulfillment = { customerId: customer.id, qty, rewardsItemId: reward.id };

doFulfillment(fulfillment).then(response => {
  if (response?.pointsLeft) {
    handleUpdateCustomerPoints(response.pointsLeft);
  }
  toast[response?.type === 'Success' ? 'success' : 'error'](
    `${response?.message}. You have ${customer?.points} points remaining.`,
    { theme: 'light' }
  );
  setIsProcessing(false);
  setShowRewardsModal(false);
});

};

const updateLocalStorageCart = (newCart) => { localStorage.setItem(cart_${customer.id}, JSON.stringify(newCart)); };

const addItemToCart = e => { e.preventDefault(); const customerCart = JSON.parse(localStorage.getItem(cart_${customer.id})) || []; const newCart = [...customerCart, { ...reward, quantity: 1 }]; updateLocalStorageCart(newCart); setCartQuantity(1); setIsInCart(true); };

const updateQuantity = (e, newQuantity) => { e.preventDefault(); let customerCart = JSON.parse(localStorage.getItem(cart_${customer.id})) || [];

if (newQuantity < 1) {
  customerCart = customerCart.filter(item => item.id !== Number(rewardId));
  setIsInCart(false);
} else {
  customerCart = customerCart.map(item =>
    item.id === Number(rewardId) ? { ...item, quantity: newQuantity } : item
  );
}

updateLocalStorageCart(customerCart);
setCartQuantity(newQuantity);

};

return ( <main> <nav aria-label="breadcrumb" role="navigation"> <ol className="breadcrumb"> <li className="breadcrumb-item"><Link to="/">Home</Link></li> <li className="breadcrumb-item"><Link to="/category">Reward Categories</Link></li> <li className="breadcrumb-item"><Link to={/category/${category.id}}>{category.name}</Link></li> <li className="breadcrumb-item active" aria-current="page">{reward.itemName}</li> </ol> </nav> <div className="container-fluid pt-3"> <div className="row"> <div className="col-5 text-center"> <RewardsCard reward={reward} isUpdatable={false} /> </div> <div className="col-7 reward-item-panel"> <h1 className="text-uppercase">{reward.itemName}</h1> <hr /> <p>{reward.itemDescription}</p> <h2 className="text-success">{reward.itemCost} Points</h2> <select className="form-control" onChange={e => setQty(e.target.value)} value={qty}> {[1, 2, 3, 4, 5].map(num => ( <option key={num}>{num}</option> ))} </select> {customer.points >= pointsCost ? ( <> <button className="btn btn-primary" onClick={toggleShowRewardsModal}>Redeem</button> {isInCart ? ( <> <button onClick={e => updateQuantity(e, cartQuantity + 1)}>+</button> {cartQuantity} <button onClick={e => updateQuantity(e, cartQuantity - 1)}>-</button> </> ) : ( <button onClick={addItemToCart}>Add to cart</button> )} </> ) : ( <small>Not enough points</small> )} </div> </div> </div> <RewardsModal customer={customer} reward={reward} showRewardsModal={showRewardsModal} toggleShowRewardsModal={toggleShowRewardsModal} handleSubmission={handleSubmission} initQty={qty} isProcessing={isProcessing} /> <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={true} /> </main> ); };

export default RewardsDetailsPage;

  

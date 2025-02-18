import React, { useEffect, useState } from 'react'; import { Link, useParams } from 'react-router-dom'; import { getReward, getRewardsList } from '../../api/RewardsApi'; import RewardsCard from './RewardsCard'; import { doFulfillment } from '../../api/FulfillmentApi'; import RewardsModal from './RewardsModal'; import { toast, ToastContainer } from 'react-toastify'; import { useCart } from '../../contexts/CartContext';

const RewardsDetailsPage = ({ category, handleUpdateCustomerPoints, handleCategoryChange, customer }) => { const { rewardId } = useParams(); const [reward, setReward] = useState(null); const [qty, setQty] = useState(1); const [showRewardsModal, setShowRewardsModal] = useState(false); const [isProcessing, setIsProcessing] = useState(false); const { state, dispatch } = useCart(); const [cartQuantity, setCartQuantity] = useState(0);

useEffect(() => { const fetchReward = async () => { const data = await getReward(rewardId); setReward(data); if (!category.id) handleCategoryChange(data.rewardCatalogId); }; fetchReward(); }, [rewardId, category.id, handleCategoryChange]);

useEffect(() => { if (state.carts[customer.id]) { const cartItem = state.carts[customer.id].find(item => item.item.id === Number(rewardId)); if (cartItem) setCartQuantity(cartItem.item.quantity); else setCartQuantity(0); } }, [state.carts, customer.id, rewardId]);

const toggleShowRewardsModal = (e) => { e.preventDefault(); setShowRewardsModal(!showRewardsModal); };

const addItemToCart = (e) => { e.preventDefault(); if (!reward) return; dispatch({ type: "ADD_TO_CART", id: customer.id, payload: { item: { ...reward, quantity: 1 } }, }); setCartQuantity(1); };

const updateQuantity = (e, newQuantity) => { e.preventDefault(); if (newQuantity < 1) { dispatch({ type: "REMOVE_FROM_CART", id: customer.id, payload: Number(rewardId), }); setCartQuantity(0); } else { dispatch({ type: "UPDATE_CART_QUANTITY", id: customer.id, payload: { rewardId: Number(rewardId), quantity: newQuantity }, }); setCartQuantity(newQuantity); } };

return ( <main> <nav aria-label="breadcrumb"> <ol className="breadcrumb"> <li className="breadcrumb-item"><Link to="/">Home</Link></li> <li className="breadcrumb-item"><Link to="/category">Reward Categories</Link></li> <li className="breadcrumb-item"><Link to={/category/${category.id}}>{category.name}</Link></li> <li className="breadcrumb-item active">{reward?.itemName || 'Loading...'}</li> </ol> </nav> <div className="container-fluid pt-3"> <div className="row"> <div className="col-5 text-center"> <RewardsCard reward={reward} isUpdatable={false} /> </div> <div className="col-7"> <h1 className="text-uppercase">{reward?.itemName}</h1> <hr /> <p>{reward?.itemDescription}</p> <h2 className="text-success">{reward?.itemCost} Points</h2> <div> <select className="form-control" onChange={e => setQty(Number(e.target.value))} value={qty}> {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)} </select> {cartQuantity > 0 ? ( <> <button onClick={(e) => updateQuantity(e, cartQuantity + 1)}>+</button> {cartQuantity} <button onClick={(e) => updateQuantity(e, cartQuantity - 1)}>-</button> </> ) : ( <button onClick={addItemToCart}>Add to Cart</button> )} </div> </div> </div> </div> <RewardsModal customer={customer} reward={reward} showRewardsModal={showRewardsModal} toggleShowRewardsModal={toggleShowRewardsModal} handleSubmission={() => {}} initQty={qty} isProcessing={isProcessing} /> <ToastContainer position='top-right' autoClose={3000} hideProgressBar newestOnTop /> </main> ); };

export default RewardsDetailsPage;

  

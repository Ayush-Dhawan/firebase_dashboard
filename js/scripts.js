import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import {getReward, getRewardsList} from '../../api/RewardsApi';
import RewardsCard from './RewardsCard';
import {doFulfillment} from '../../api/FulfillmentApi';
import RewardsModal from './RewardsModal';
import {toast, ToastContainer} from 'react-toastify';
import {useCart} from '../../contexts/CartContext';

const RewardsDetailsPage = ({
  category = {
    name: 'unknown',
    catalogId: false
  },
  handleUpdateCustomerPoints,
  handleCategoryChange,
  customer = {username: 'unknown', points: 0}
}) => {


  const {rewardId} = useParams();
  const initialState = {itemDescription: 'loading', itemName: 'loading'}
  const [reward, setReward] = useState(initialState);
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [pointsCost, setPointsCost] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const {state, dispatch} = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const cardOptions = {showDescription: false};

  useEffect(() => {
    setPointsCost(qty * reward.itemCost);
  }, [qty, reward.itemCost]);

  useEffect(() => {
    const getRewardItem = async () => {
      const data = await getReward(rewardId);
      setReward(data)
      if (!category.id) {
        handleCategoryChange(data.rewardCatalogId);
      }
    }
    getRewardItem();
  }, [rewardId, category.id, handleCategoryChange]);

  function verifyInCart(customerId, itemId){
    console.log("in verify cart,,,"+ rewardId )
    const customerCart = state.carts[customerId] || [];

    setIsInCart(customerCart.some(item => item.item.id === Number(rewardId)))
    console.log("bool check: ", customerCart.some(item => item.item.id === Number(rewardId)), customerCart)
  }

  useEffect(() => {
    verifyInCart(customer.id, rewardId)
  }, [rewardId, customer.id]);

  useEffect(() => {
    if (category.id || reward.rewardCatalogId) {
      const setRandomRewardItems = async () => {
        const data = await getRewardsList(category.id || reward.rewardCatalogId);
        const finalRandomItemArray = [];

        while (finalRandomItemArray.length < 6) {
          const index = Math.floor(Math.random() * data.length);
          if (!finalRandomItemArray.includes(data[index])) {
            finalRandomItemArray.push(data[index])
          }
        }
        setItems(finalRandomItemArray)
      }
      setRandomRewardItems()
    } else {
      setItems([]);
    }
  }, [rewardId, category.id, reward.rewardCatalogId]);

  const toggleShowRewardsModal = e => {
    e.preventDefault();
    setShowRewardsModal(!showRewardsModal);
  }

  const handleSubmission = (qty) => {
    setIsProcessing(true);
    const fulfillment = {
      customerId: customer.id,
      qty: qty,
      rewardsItemId: reward.id
    }



    doFulfillment(fulfillment).then(response => {
        if (response?.pointsLeft) {
          handleUpdateCustomerPoints(response?.pointsLeft);
        }
        const type = response?.type === 'Success' ? 'success' : 'error';

        const message = response?.message + '. You have ' + customer?.points+' points remaining.';
        toast[type](message, {theme: 'light'});
        setIsProcessing(false);
        setShowRewardsModal(!showRewardsModal);
      }
    );
  }
  const addItemToCart = (e) => {
    e.preventDefault();
    if (!reward) return;
    dispatch({
      type: "ADD_TO_CART",
      id: customer.id,
      payload: { item: {...reward, quantity: 1} },
    });
    setCartQuantity(1);
    setIsInCart(true)
  };
  const updateQuantity = (e, id, newQuantity) => {
    e.preventDefault();
if(newQuantity < 1) {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: customer.id,
      payload: Number(rewardId),
    });
  setIsInCart(false)
}
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        id: customer.id,
          payload: { rewardId, quantity: newQuantity },
      });
      setCartQuantity(newQuantity)

    // else {
    //   dispatch({
    //     type: "REMOVE_FROM_CART",
    //     id: customer.id,
    //     payload: id,
    //   });
    //   setCartQuantity(0)
    // }
  };
  return (
    <main>
      <nav aria-label="breadcrumb" role="navigation">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/category">Reward Categories</Link></li>
          <li className="breadcrumb-item"><Link to={`/category/${category.id}`}>{category.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{reward.itemName}</li>
        </ol>
      </nav>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-5 text-center">
            <RewardsCard reward={reward} isUpdatable={false} cardOptions={cardOptions} />
          </div>
          <div className="col-7 reward-item-panel">
            <h1 className="text-uppercase">{reward.itemName}</h1>
            <hr />
            <p>{reward.itemDescription}</p>
            <form>
              <div className="form-row">
                <div className="col-10">
                  <h2 className="text-success">{reward.itemCost} Points</h2>
                </div>
                <div className="col">
                  <select className="form-control" onChange={e => setQty(e.target.value)} value={qty}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="col">
                  {(customer.points >= pointsCost) ?
                    <>
                      <button type="submit" className="btn btn-primary" onClick={toggleShowRewardsModal}>Redeem</button>
                      {isInCart ? (

                        <>
                          <button onClick={(e) => updateQuantity(e, rewardId, cartQuantity + 1)}>+</button>
                          {cartQuantity}
                          <button onClick={(e) => updateQuantity(e, rewardId, cartQuantity - 1)}>-</button>
                          {/*<p>is in cart</p>*/}
                        </>
                      ) : (
                        <button onClick={addItemToCart}>Add to cart {`${isInCart}`}</button>
                      )}
                    </> :
                    <small>Not enough points</small>}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <h3>Not so sure? How about some other options?</h3>
        </div>
        <div className="row-cols-1 row-cols-md-6 card-deck">
          {items?.map(reward => (
            <RewardsCard key={reward.id} reward={reward} isUpdatable={true} cardOptions={cardOptions} />
          ))}
        </div>
      </div>
     <RewardsModal customer={customer} reward={reward} showRewardsModal={showRewardsModal} toggleShowRewardsModal={toggleShowRewardsModal} handleSubmission={handleSubmission}
      initQty={qty} isProcessing={isProcessing}/>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
      />
    </main>
  );
};

export default RewardsDetailsPage

import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const initialState = { carts: {}, };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": return { ...state, carts: { ...state.carts, [action.id]: [...(state.carts[action.id] || []), action.payload], }, };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        carts: {
          ...state.carts,
          [action.id]: state.carts[action.id].map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };
    case "REMOVE_FROM_CART": return { ...state, carts: { ...state.carts, [action.id]: state.carts[action.id]?.filter((item) => item.id !== action.payload) || [], }, };
    case "CLEAR_CART": return { ...state, carts: { ...state.carts, [action.id]: [], }, };
    default: return state;
  }
};

export const CartProvider = ({ children }) => { const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}> {children} </CartContext.Provider> );
};

export const useCart = () => { return useContext(CartContext); };


in rewardDetails page.jsx make remove from cart work please inside updateQuantity function

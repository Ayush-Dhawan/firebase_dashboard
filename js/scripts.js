import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReward, getRewardsList } from '../../api/RewardsApi';
import RewardsCard from './RewardsCard';
import { doFulfillment } from '../../api/FulfillmentApi';
import RewardsModal from './RewardsModal';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';

const RewardsDetailsPage = ({
  category = { name: 'unknown', catalogId: false },
  handleUpdateCustomerPoints,
  handleCategoryChange,
  customer = { username: 'unknown', points: 0, id: 0 },
}) => {
  const { rewardId } = useParams();
  const [reward, setReward] = useState(null);
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pointsCost, setPointsCost] = useState(0);
  const { state, dispatch } = useCart();
  const [cartQuantity, setCartQuantity] = useState(0);

  // Calculate total cost in points
  useEffect(() => {
    if (reward) {
      setPointsCost(qty * reward.itemCost);
    }
  }, [qty, reward]);

  // Fetch reward details and update category if needed
  useEffect(() => {
    const fetchReward = async () => {
      const data = await getReward(rewardId);
      setReward(data);
      if (!category.id) {
        handleCategoryChange(data.rewardCatalogId);
      }
    };
    fetchReward();
  }, [rewardId, category.id, handleCategoryChange]);

  // Sync cart quantity when cart state changes
  useEffect(() => {
    const customerCart = state.carts[customer.id] || [];
    const cartItem = customerCart.find((item) => item.item.id === Number(rewardId));
    if (cartItem) {
      setCartQuantity(cartItem.item.quantity);
    } else {
      setCartQuantity(0);
    }
  }, [state.carts, customer.id, rewardId]);

  // Fetch random rewards for suggestion area
  useEffect(() => {
    if (category.id || (reward && reward.rewardCatalogId)) {
      const fetchRandomRewards = async () => {
        const data = await getRewardsList(category.id || reward.rewardCatalogId);
        const finalRandomItemArray = [];
        while (finalRandomItemArray.length < 6 && data.length) {
          const index = Math.floor(Math.random() * data.length);
          if (!finalRandomItemArray.some((item) => item.id === data[index].id)) {
            finalRandomItemArray.push(data[index]);
          }
        }
        setItems(finalRandomItemArray);
      };
      fetchRandomRewards();
    } else {
      setItems([]);
    }
  }, [reward, category.id]);

  const toggleShowRewardsModal = (e) => {
    e.preventDefault();
    setShowRewardsModal((prev) => !prev);
  };

  const handleSubmission = (selectedQty) => {
    setIsProcessing(true);
    const fulfillment = {
      customerId: customer.id,
      qty: selectedQty,
      rewardsItemId: reward.id,
    };

    doFulfillment(fulfillment).then((response) => {
      if (response?.pointsLeft) {
        handleUpdateCustomerPoints(response.pointsLeft);
      }
      const type = response?.type === 'Success' ? 'success' : 'error';
      const message = `${response?.message}. You have ${customer?.points} points remaining.`;
      toast[type](message, { theme: 'light' });
      setIsProcessing(false);
      setShowRewardsModal(false);
    });
  };

  const addItemToCart = (e) => {
    e.preventDefault();
    if (!reward) return;
    const rewardWithQuantity = { ...reward, quantity: 1 };
    dispatch({
      type: 'ADD_TO_CART',
      id: customer.id,
      payload: { item: rewardWithQuantity },
    });
    setCartQuantity(1);
  };

  const updateQuantity = (e, newQuantity) => {
    e.preventDefault();
    if (newQuantity < 1) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        id: customer.id,
        payload: Number(rewardId),
      });
      setCartQuantity(0);
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        id: customer.id,
        payload: { rewardId: Number(rewardId), quantity: newQuantity },
      });
      setCartQuantity(newQuantity);
    }
  };

  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/category">Reward Categories</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {reward ? reward.itemName : 'Loading...'}
          </li>
        </ol>
      </nav>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-5 text-center">
            <RewardsCard reward={reward} isUpdatable={false} cardOptions={{ showDescription: false }} />
          </div>
          <div className="col-7 reward-item-panel">
            <h1 className="text-uppercase">{reward?.itemName}</h1>
            <hr />
            <p>{reward?.itemDescription}</p>
            <form>
              <div className="form-row">
                <div className="col-10">
                  <h2 className="text-success">{reward?.itemCost} Points</h2>
                </div>
                <div className="col">
                  <select
                    className="form-control"
                    onChange={(e) => setQty(Number(e.target.value))}
                    value={qty}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  {customer.points >= pointsCost ? (
                    <>
                      <button type="submit" className="btn btn-primary" onClick={toggleShowRewardsModal}>
                        Redeem
                      </button>
                      {cartQuantity > 0 ? (
                        <>
                          <button onClick={(e) => updateQuantity(e, cartQuantity + 1)}>+</button>
                          <span className="mx-2">{cartQuantity}</span>
                          <button onClick={(e) => updateQuantity(e, cartQuantity - 1)}>-</button>
                        </>
                      ) : (
                        <button onClick={addItemToCart}>Add to Cart</button>
                      )}
                    </>
                  ) : (
                    <small>Not enough points</small>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <h3>Not so sure? How about some other options?</h3>
        </div>
        <div className="row row-cols-1 row-cols-md-6 card-deck">
          {items.map((item) => (
            <RewardsCard
              key={item.id}
              reward={item}
              isUpdatable={true}
              cardOptions={{ showDescription: false }}
            />
          ))}
        </div>
      </div>
      <RewardsModal
        customer={customer}
        reward={reward}
        showRewardsModal={showRewardsModal}
        toggleShowRewardsModal={toggleShowRewardsModal}
        handleSubmission={handleSubmission}
        initQty={qty}
        isProcessing={isProcessing}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
    </main>
  );
};

export default RewardsDetailsPage;

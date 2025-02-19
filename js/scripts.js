import { useEffect, useState } from "react";
import { getTop10FulFillments } from "../../api/FulfillmentApi";
import NavBar from "../common/NavBar";

export default function MostRedeemedRewards() {
  const [rewards, setRewards] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default: descending order

  useEffect(() => {
    async function getMostRedeemedRewards() {
      const res = await getTop10FulFillments();
      setRewards(res);
    }

    getMostRedeemedRewards();
  }, []);

  // Sorting function
  const sortedRewards = [...rewards].sort((a, b) => {
    return sortOrder === "asc"
      ? a.fulfillment_count - b.fulfillment_count
      : b.fulfillment_count - a.fulfillment_count;
  });

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          style={{
            marginBottom: "10px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="desc">Sort by Fulfillment: High to Low</option>
          <option value="asc">Sort by Fulfillment: Low to High</option>
        </select>

        {/* Reward Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {sortedRewards.map((item, index) => (
            <RewardItemCard reward={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

const RewardItemCard = ({ reward }) => {
  return (
    <div className="col-md-4" style={{ width: "100%" }}>
      <div className="card shadow-sm mb-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/${reward.img_src}.jpg`}
          className="card-img-top"
          alt={reward.item_name}
        />
        <div className="card-body">
          <h5 className="card-title">{reward.item_name}</h5>
          <p className="card-text">{reward.item_description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Cost:</strong> ${reward.item_cost}
            </li>
            <li className="list-group-item">
              <strong>Times Fulfilled:</strong> {reward.fulfillment_count}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

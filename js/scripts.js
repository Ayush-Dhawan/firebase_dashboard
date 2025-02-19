  <select id="getTop10FulfillmentsByRewardItem" resultMap="com.jpmorgan.et.model.RewardItem">
    SELECT rci.id, rci.item_name, COUNT(f.reward_catalog_item_id) AS occurence FROM rewards_catalog_items rci LEFT JOIN fulfillment f on rci.id = f.reward_catalog_item_id
    GROUP BY rci.id, rci.item_name, rci.img_src ORDER BY occurence DESC LIMIT 10;
  </select>

table fulfillment -> id, customer_id, reward_catalog_item_id, qty, status, creation_date
table rewards_catalog_items -> id, reward_catalog_id, item_name, item_cost, item_description, status, img_src

Unable to understand why this doesnt work

i want to get top 10 most fulfilled items, this can be obained by checking the total number of times a reward_catalog_item has been fulfilled using reward_catalog_item_id field in the fulfillment table
i want to return entire reward catalog items for those 10 most fulfilled ones
<select id="getTop10FulfillmentsByRewardItem" resultType="com.jpmorgan.et.model.RewardItem">
    SELECT rci.id, rci.item_name, rci.img_src, rci.item_cost, rci.item_description, COUNT(f.reward_catalog_item_id) AS occurrence
    FROM rewards_catalog_items rci
    LEFT JOIN fulfillment f ON rci.id = f.reward_catalog_item_id
    GROUP BY rci.id, rci.item_name, rci.img_src, rci.item_cost, rci.item_description
    ORDER BY occurrence DESC
    LIMIT 10;
</select>

import React from "react";

const RewardItemCard = ({ reward }) => {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm mb-4">
        <img src={reward.imgSrc} className="card-img-top" alt={reward.itemName} />
        <div className="card-body">
          <h5 className="card-title">{reward.itemName}</h5>
          <p className="card-text">{reward.itemDescription}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Cost:</strong> ${reward.itemCost}
            </li>
            <li className="list-group-item">
              <strong>Times Fulfilled:</strong> {reward.fulfillmentCount}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RewardItemCard;

  <select id="getTop10FulfillmentsByRewardItem" resultType="com.jpmorgan.et.model.RewardItem">
    SELECT rci.id, rci.item_name, rci.img_src, rci.item_cost, rci.item_description, 
           COUNT(f.reward_catalog_item_id) AS fulfillment_count
    FROM rewards_catalog_items rci
    LEFT JOIN fulfillment f ON rci.id = f.reward_catalog_item_id
    GROUP BY rci.id, rci.item_name, rci.img_src, rci.item_cost, rci.item_description
    ORDER BY fulfillment_count DESC
    LIMIT 10;
</select>

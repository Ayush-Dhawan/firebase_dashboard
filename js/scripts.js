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

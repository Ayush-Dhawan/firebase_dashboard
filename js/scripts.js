useEffect(() => {
  const fetchRedemptionCounts = async () => {
    try {
      if (!customer?.id) return; // Ensure customer ID exists

      const fulfillments = await getFulfillments(customer.id);
      console.log("Fulfillments: ", fulfillments);

      const counts = fulfillments?.reduce((acc, fulfillment) => {
        if (fulfillment.reward_catalog_id) {
          acc[fulfillment.reward_catalog_id] = (acc[fulfillment.reward_catalog_id] || 0) + fulfillment.qty;
        }
        return acc;
      }, {});

      setRedemptionCounts(counts);
    } catch (error) {
      console.error("Error fetching redemption counts:", error);
    }
  };

  fetchRedemptionCounts();
}, [customer]);

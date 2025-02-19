import React, { useEffect, useState } from 'react'; import { getRewardsList } from '../../api/RewardsApi'; import { getFulfillments } from '../../api/FulfillmentsApi'; import { Link, useNavigate, useParams } from 'react-router-dom'; import RewardsCard from './RewardsCard'; import SearchBar from '../common/SearchBar'; import { Button } from 'reactstrap';

const RewardsSelectionPage = () => { const [rewardItems, setRewardItems] = useState([]); const [isLoading, setIsLoading] = useState(false); const { categoryId } = useParams(); const [allData, setAllData] = useState([]); const [redemptionCounts, setRedemptionCounts] = useState({}); const [isActive, setIsActive] = useState(false); const [isInactive, setIsInactive] = useState(false); const [isSale, setIsSale] = useState(false); const [isAll, setIsAll] = useState(true); const [count, setCount] = useState(0); const [searchQuery, setSearchQuery] = useState(''); const [sortCriteria, setSortCriteria] = useState('');

const navigate = useNavigate();

const updateCount = (num) => { setCount(count + num); };

useEffect(() => { getFulfillments().then((fulfillments) => { const counts = fulfillments.reduce((acc, fulfillment) => { acc[fulfillment.reward_catalog_id] = (acc[fulfillment.reward_catalog_id] || 0) + fulfillment.qty; return acc; }, {}); setRedemptionCounts(counts); }); }, []);

useEffect(() => { let filteredItems = allData;

if (searchQuery) {
  filteredItems = filteredItems.filter((item) =>
    item.itemName && item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

switch (sortCriteria) {
  case 'A-Z':
    filteredItems.sort((a, b) => a.itemName.localeCompare(b.itemName));
    break;
  case 'Z-A':
    filteredItems.sort((a, b) => b.itemName.localeCompare(a.itemName));
    break;
  case 'Most Expensive':
    filteredItems.sort((a, b) => b.itemCost - a.itemCost);
    break;
  case 'Least Expensive':
    filteredItems.sort((a, b) => a.itemCost - b.itemCost);
    break;
  case 'Most Redeemed':
    filteredItems.sort((a, b) => (redemptionCounts[b.id] || 0) - (redemptionCounts[a.id] || 0));
    break;
  case 'Least Redeemed':
    filteredItems.sort((a, b) => (redemptionCounts[a.id] || 0) - (redemptionCounts[b.id] || 0));
    break;
  default:
    break;
}

setRewardItems([...filteredItems]);

}, [searchQuery, allData, sortCriteria, redemptionCounts]);

useEffect(() => { setIsLoading(true); getRewardsList(categoryId).then((response) => { setRewardItems(response); setIsLoading(false); setAllData(response); }); }, [categoryId]);

useEffect(() => { let filteredItems = allData;

if (!isAll) {
  filteredItems = filteredItems.filter((x) => {
    return (
      (x.status === 'Active' && isActive) ||
      (x.status === 'Inactive' && isInactive) ||
      (x.status === 'sale' && isSale)
    );
  });
}

if (searchQuery) {
  filteredItems = filteredItems.filter((item) =>
    item.itemName && item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

setRewardItems(filteredItems);

}, [isActive, isInactive, isSale, isAll, searchQuery, allData]);

const handleSearch = (query) => { setSearchQuery(query); };

return ( <main> <nav aria-label="breadcrumb" role="navigation"> <ol className="breadcrumb"> <li className="breadcrumb-item"> <Link to="/">Home</Link> </li> <li className="breadcrumb-item"> <Link to="/category">Reward Categories</Link> </li> </ol>

{categoryId === '2' && (
      <div>
        <Button onClick={() => navigate("selectDates")}>
          Search for Travel between specified dates
        </Button>
      </div>
    )}

    <div style={{ width: "100%", paddingBottom: "10px" }}>
      <SearchBar onSearch={handleSearch} />
    </div>

    <div
      style={{
        paddingTop: '10px',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          onChange={(e) => setSortCriteria(e.target.value)}
          value={sortCriteria}
          style={{ padding: "5px", borderRadius: "5px" }}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Most Expensive">Most Expensive</option>
          <option value="Least Expensive">Least Expensive</option>
          <option value="Most Redeemed">Most Redeemed</option>
          <option value="Least Redeemed">Least Redeemed</option>
        </select>
      </div>
    </div>
  </nav>
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {rewardItems.length > 0 ? (
        <>
          <p>Overall count: {count}</p>
          <div className="cards">
            {rewardItems.map((item) => (
              <div className="cards-item" key={item.id}>
                <RewardsCard
                  isUpdatable={true}
                  reward={item}
                  updateCount={updateCount}
                  showPin="true"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{ width: "100%", height: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div style={{ padding: "50px" }}>
            <p className="fw-bolder">No matching reward items found.</p>
          </div>
        </div>
      )}
    </>
  )}
</main>

); };

export default RewardsSelectionPage;

  

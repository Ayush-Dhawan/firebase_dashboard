import React, { useEffect, useState } from 'react'; import { getRewardsList } from '../../api/RewardsApi'; import { Link, useNavigate, useParams } from 'react-router-dom'; import RewardsCard from './RewardsCard'; import SearchBar from '../common/SearchBar'; import { Button } from 'reactstrap';

const RewardsSelectionPage = () => { const [rewardItems, setRewardItems] = useState([]); const [isLoading, setIsLoading] = useState(false); const { categoryId } = useParams();

const [allData, setAllData] = useState([]); const [searchQuery, setSearchQuery] = useState(''); const [sortCriteria, setSortCriteria] = useState('');

const navigate = useNavigate();

useEffect(() => { setIsLoading(true); getRewardsList(categoryId).then((response) => { setRewardItems(response); setIsLoading(false); setAllData(response); }); }, [categoryId]);

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
  default:
    break;
}

setRewardItems([...filteredItems]);

}, [searchQuery, allData, sortCriteria]);

return ( <main> <nav aria-label="breadcrumb" role="navigation"> <ol className="breadcrumb"> <li className="breadcrumb-item"> <Link to="/">Home</Link> </li> <li className="breadcrumb-item"> <Link to="/category">Reward Categories</Link> </li> </ol>

{categoryId === '2' && (
      <Button onClick={() => navigate("selectDates")}>
        Search for Travel between specified dates
      </Button>
    )}

    <SearchBar onSearch={setSearchQuery} />

    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        style={{ padding: "5px", borderRadius: "5px" }}
        onChange={(e) => setSortCriteria(e.target.value)}
        value={sortCriteria}
      >
        <option value="">None</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Most Expensive">Most Expensive</option>
        <option value="Least Expensive">Least Expensive</option>
      </select>
    </div>
  </nav>

  {isLoading ? (
    <p>Loading...</p>
  ) : rewardItems.length > 0 ? (
    <div className="cards">
      {rewardItems.map((item) => (
        <div className="cards-item" key={item.id}>
          <RewardsCard reward={item} />
        </div>
      ))}
    </div>
  ) : (
    <p>No matching reward items found.</p>
  )}
</main>

); };

export default RewardsSelectionPage;

                

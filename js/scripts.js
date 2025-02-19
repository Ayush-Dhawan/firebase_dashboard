import {useEffect, useState} from 'react';
import {getTop10FulFillments} from '../../api/FulfillmentApi';
import NavBar from '../common/NavBar';


export default function MostRedeemedRewards(){
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    async function getMostRedeemedRewards (){
      const res = await getTop10FulFillments();
      setRewards(res);
      console.log("res: ", res)
    }

    getMostRedeemedRewards();
  }, []);
  return(
    <>
      {/*add select tag here*/}
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {/*<NavBar />*/}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
        {rewards && rewards.map((item, index) => <RewardItemCard reward={item} key={index} /> )}
      </div>
    </div>
    </>
      )
      }

const RewardItemCard = ({reward}) => {
  return (
    <div className="col-md-4" style={{width: '100%'}}>
      <div className="card shadow-sm mb-4">
        <img src={`${process.env.PUBLIC_URL}/images/${reward.img_src}.jpg`} className="card-img-top" alt={reward.itemName} />
        <div className="card-body">
          <h5 className="card-title">{reward.item_name}</h5>
          <p className="card-text">{reward.item_description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Cost:</strong> ${reward.item_cost}
            </li>
            <li className="list-group-item">
              <strong>Times Fulfilled:</strong> {reward.fulfillment_count }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

where there is select tag add a select dropdown with sorty by fullfilments: asc, desc options
create a state which stores them, use .filter method to filter rewards and send the filtered rewards to map method

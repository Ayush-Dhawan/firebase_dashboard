import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {getTransactions} from '../../api/TransactionApi';
import TransactionGrid from './TransactionGrid';
import Placeholder from '../utils/Placeholder';
import {Input} from 'reactstrap';


const TransactionsPage = ({
  customer = {name: 'unknown', points: 0, id: null, username: null},
}) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const setTrans = async () => {
      const data = await getTransactions(customer.id);
      setTransactions(data);
      console.log("trans data: ", data)
    }
    if (transactions.length === 0) {
      setTrans();
    }
  }, [customer.id, transactions.length]);

  useEffect(() => {
    if (startDate && endDate) {
      // Convert startDate and endDate from 'YYYY-MM-DD' to Date objects
      const start = new Date(`${startDate}T00:00:00Z`);
      const end = new Date(`${endDate}T23:59:59Z`);

      if (end < start) {
        // alert("End date cannot be before start date.");
        // setEndDate(""); // Reset invalid end date
        return;
      }

      const filtered = transactions.filter((txn) => {
        // Extract only the date (YYYY-MM-DD) from the transaction timestamp
        const txnDate = new Date(txn.creationDate);
        const txnDateString = txnDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD

        return txnDateString >= startDate && txnDateString <= endDate;
      });

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [startDate, endDate, transactions]);

  useEffect(() => {
    console.log("start date: ", startDate)
    console.log("end date: ", endDate)
  }, [startDate, endDate]);

  const options = {
    width: 500,
    height: 300,
    text: customer.name,
    fontSize: '20'
  }

  return (
    <main>
      <nav aria-label="breadcrumb" role="navigation">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Transaction History</li>
        </ol>
      </nav>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-2 justify-content-center">

            <div className="card">
              <img className="card-img-top" src={`${process.env.PUBLIC_URL}/images/${customer.username}.png`}
                alt={customer.name} onError={(e) => {
                (e.target).src = Placeholder(options);
              }} />
              <div className="card-body">
                <div className="card-content">
                  <div className="card-title text-center">{customer.points.toLocaleString()} points</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="justify-content-center jumbotron-intro mb-4 pb-5 pt-4 pt-5">
              <div className="card w-50 mx-auto mt-3">
                <div className="card-body">
                  <div className="card-content">
                    <div className="card-title text-center"><h1>{customer.name}'s Transaction History</h1></div>
                    <p>See how you've earned your {customer.points.toLocaleString()} points - sort and filter to see your
                      data as needed!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                <span>Credit Card Transaction History</span>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <label className='px-2'>Start: </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    placeholder="Select a start date"
                    defaultValue={new Date()}
                  />
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <label className='px-2'>End: </label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    placeholder="Select a end date"
                    defaultValue={new Date()}
                  />
                </div>
              </div>

              <div className="card-content">
                <TransactionGrid data={filteredTransactions}></TransactionGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default TransactionsPage;


this works great, now time for some refinements, there must be a apply filter button next to end date, on clicking it only should the start and end date state update, also turn that button to clear filter when start and end dates are set

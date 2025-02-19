start date:  2025-02-07 => format in which date is being set in date [picker

    const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const setTrans = async () => {
      const data = await getTransactions(customer.id);
      setTransactions(data);
    }
    if (transactions.length === 0) {
      setTrans();
    }
  }, [customer.id, transactions.length]);

  useEffect(() => {
    console.log("start date: ", startDate)
  }, [startDate]);

make an edge case where it wont let you set an end date before start date, other than that when both start and end date are selected and have a valid value (not undefined), filter transactions to show only data between those 2 dates (including those 2 dats)

category
: 
"Travel"
creationDate
: 
"2020-09-17T18:47:52Z"
creditCharge
: 
1100
customerId
: 
1
id
: 
1
lastUpdateDate
: 
null
multiplier
: 
0.05
pointsEarned
: 
0
productId
: 
null
productName
: 
"Chase Regular"
statusProcessed
: 
"new"

an item in transition data for reference


import { useState, useEffect } from "react";

const TransactionFilter = ({ customer }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const setTrans = async () => {
      const data = await getTransactions(customer.id);
      setTransactions(data);
    };
    if (transactions.length === 0) {
      setTrans();
    }
  }, [customer.id, transactions.length]);

  useEffect(() => {
    console.log("Start Date:", startDate);
  }, [startDate]);

  useEffect(() => {
    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        alert("End date cannot be before start date.");
        setEndDate(undefined);
        return;
      }

      const filtered = transactions.filter((txn) => {
        const txnDate = new Date(txn.creationDate);
        return txnDate >= new Date(startDate) && txnDate <= new Date(endDate);
      });

      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [startDate, endDate, transactions]);

  return (
    <div>
      <input
        type="date"
        value={startDate || ""}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate || ""}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <ul>
        {filteredTransactions.map((txn) => (
          <li key={txn.id}>{txn.productName} - ${txn.creditCharge}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionFilter;

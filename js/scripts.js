import { useState, useEffect } from "react";

const TransactionFilter = ({ customer }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(customer.id);
      setTransactions(data);
    };
    if (transactions.length === 0) {
      fetchTransactions();
    }
  }, [customer.id, transactions.length]);

  useEffect(() => {
    console.log("Start Date:", startDate);
  }, [startDate]);

  useEffect(() => {
    if (startDate && endDate) {
      // Convert startDate and endDate from 'YYYY-MM-DD' to Date objects
      const start = new Date(`${startDate}T00:00:00Z`);
      const end = new Date(`${endDate}T23:59:59Z`);

      if (end < start) {
        alert("End date cannot be before start date.");
        setEndDate(""); // Reset invalid end date
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

  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <ul>
        {filteredTransactions.map((txn) => (
          <li key={txn.id}>
            {txn.productName} - ${txn.creditCharge}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionFilter;

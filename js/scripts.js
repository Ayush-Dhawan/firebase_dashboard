
const handleDownload = () => {
  const formattedData = filteredTransactions.map(txn => ({
    "Customer Name": txn.customer.name,  // Assuming customer.name is available
    "Credit Card Name": txn.productName, // Assuming productName represents the credit card name
    "Category": txn.category,
    "Charge": txn.creditCharge,
    "Points": txn.pointsEarned,
    "Processed Status": txn.statusProcessed ? "Processed" : "Pending",
    "Transaction Date": txn.creationDate
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(data);
  link.download = 'transaction_history.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("Successfully Downloaded", { theme: 'light' });
};
